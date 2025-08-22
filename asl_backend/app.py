# --- All Imports Go Here ---
import os
import re
import time
import random
import subprocess
from datetime import timedelta, datetime

from flask import Flask, request, jsonify, send_from_directory
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.sql.expression import func
from itsdangerous import URLSafeTimedSerializer

# Import necessary API libraries
from googleapiclient.discovery import build
import assemblyai as aai
import imageio_ffmpeg

# --- App and Configuration ---
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'nisthu'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['OUTPUT_FOLDER'] = 'outputs'
app.config['UPLOAD_FOLDER'] = 'uploads'
# Add placeholders for YouTube API - replace with your actual keys
app.config['YOUTUBE_API_KEY'] = 'YOUR_YOUTUBE_API_KEY_HERE'
app.config['PLAYLIST_ID'] = 'YOUR_YOUTUBE_PLAYLIST_ID_HERE'
aai.settings.api_key = "c4b256a029cc4f75aa3cb957842ce756"

# --- Global Initializations ---
db = SQLAlchemy(app)
CORS(app)
jwt = JWTManager(app)
s = URLSafeTimedSerializer(app.config['JWT_SECRET_KEY'])
ffmpeg_executable = imageio_ffmpeg.get_ffmpeg_exe()
SIGN_MAP = {letter: os.path.join('asl_gifs', f"{letter}.gif") for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"}

# --- Database Models ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(80), nullable=True)
    profile_image_url = db.Column(db.String(255), nullable=False, default='default.jpg')

class Word(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(100), unique=True, nullable=False)

class VideoProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    video_youtube_id = db.Column(db.String(255), nullable=False)
    completed_at = db.Column(db.DateTime, default=datetime.utcnow)

# --- Helper Functions ---
def get_youtube_playlist_videos():
    try:
        youtube = build('youtube', 'v3', developerKey=app.config['YOUTUBE_API_KEY'])
        videos = []
        next_page_token = None
        while True:
            request = youtube.playlistItems().list(part='snippet', playlistId=app.config['PLAYLIST_ID'], maxResults=50, pageToken=next_page_token)
            response = request.execute()
            for item in response['items']:
                if 'videoId' in item['snippet']['resourceId']:
                    videos.append({'id': item['snippet']['resourceId']['videoId'], 'title': item['snippet']['title'], 'youtubeId': item['snippet']['resourceId']['videoId']})
            next_page_token = response.get('nextPageToken')
            if not next_page_token: break
        return videos
    except Exception as e:
        print(f"Error fetching YouTube playlist: {e}")
        return []

def create_asl_video(text, sign_map, output_folder):
    DURATION_PER_CLIP = 2.25
    cleaned_text = re.sub(r'[^A-Z\d]', '', text.upper())
    if not cleaned_text: return None, "No valid letters or digits found"
    gif_files = [sign_map.get(char) for char in cleaned_text if sign_map.get(char) and os.path.exists(sign_map.get(char))]
    if not gif_files: return None, "Could not find GIFs for the provided text"
    timestamp = int(time.time())
    output_filename = f"asl_output_{timestamp}.mp4"
    output_path = os.path.join(output_folder, output_filename)
    temp_video_files = []
    for i, gif_file in enumerate(gif_files):
        temp_filename = f"temp_{timestamp}_{i}.mp4"
        convert_command = [ffmpeg_executable, '-i', gif_file, '-an', '-vf', 'scale=480:480:force_original_aspect_ratio=decrease,pad=480:480:(ow-iw)/2:(oh-ih)/2,setsar=1,format=yuv420p', '-r', '25', '-t', str(DURATION_PER_CLIP), '-y', temp_filename]
        subprocess.run(convert_command, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        temp_video_files.append(temp_filename)
    inputs_file_path = f"inputs_{timestamp}.txt"
    with open(inputs_file_path, "w") as f:
        for temp_file in temp_video_files:
            f.write(f"file '{os.path.abspath(temp_file)}'\n")
    concat_command = [ffmpeg_executable, '-f', 'concat', '-safe', '0', '-i', inputs_file_path, '-c', 'copy', '-y', output_path]
    subprocess.run(concat_command, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if os.path.exists(output_path):
        for temp_file in temp_video_files: os.remove(temp_file)
        os.remove(inputs_file_path)
        return output_filename, "Video created successfully"
    else:
        for temp_file in temp_video_files: os.remove(temp_file)
        os.remove(inputs_file_path)
        return None, "Video generation failed"

def seed_database():
    with app.app_context():
        if User.query.count() == 0:
            print("Creating test user...")
            hashed_password = generate_password_hash('password123')
            test_user = User(email='test@example.com', password=hashed_password, name='Test User')
            db.session.add(test_user)
            db.session.commit()
            print("Test user created.")
        if Word.query.count() == 0:
            print("Seeding database with quiz words...")
            word_list = ["HELLO", "WORLD", "PYTHON", "REACT", "FLASK", "LEARN", "SIGN", "LOVE", "WATER", "COMPUTER"]
            for word_text in word_list:
                db.session.add(Word(text=word_text))
            db.session.commit()
            print("Database seeded.")

# --- API Routes ---
@app.route('/api/signup', methods=['POST'])
def signup():
    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')
    if not name or not email or not password:
        return jsonify({'error': 'Missing name, email, or password'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email address already in use'}), 409
    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, name=name)
    if 'profile_pic' in request.files:
        file = request.files['profile_pic']
        if file.filename != '':
            filename = f"user_{datetime.utcnow().timestamp()}_{file.filename}"
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            new_user.profile_image_url = filename
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    if user and check_password_hash(user.password, data.get('password')):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({
            'access_token': access_token, 
            'user': {'id': user.id, 'email': user.email, 'name': user.name, 'profile_image_url': f"/profile_pics/{user.profile_image_url}"}
        }), 200
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
    user = db.session.get(User, current_user_id)
    if not user: return jsonify({'error': 'User not found'}), 404
    return jsonify({'id': user.id, 'email': user.email, 'name': user.name, 'profile_image_url': f"/profile_pics/{user.profile_image_url}"}), 200

@app.route('/api/profile/picture', methods=['POST'])
@jwt_required()
def upload_profile_picture():
    current_user_id = get_jwt_identity()
    user = db.session.get(User, current_user_id)
    if 'profile_pic' not in request.files: return jsonify({"error": "No file part"}), 400
    file = request.files['profile_pic']
    if file.filename == '': return jsonify({"error": "No selected file"}), 400
    if file:
        filename = f"user_{user.id}{os.path.splitext(file.filename)[1]}"
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        user.profile_image_url = filename
        db.session.commit()
        return jsonify({"message": "Profile picture updated", "url": f"/profile_pics/{filename}"}), 200

@app.route('/api/playlist', methods=['GET'])
@jwt_required()
def get_playlist():
    chapters = get_youtube_playlist_videos()
    if not chapters:
        return jsonify({"error": "Could not fetch video playlist from YouTube."}), 500
    return jsonify(chapters)

@app.route('/api/progress', methods=['GET'])
@jwt_required()
def get_progress():
    current_user_id = get_jwt_identity()
    progress_records = VideoProgress.query.filter_by(user_id=current_user_id).all()
    completed_ids = [record.video_youtube_id for record in progress_records]
    total_videos = get_youtube_playlist_videos()
    return jsonify({'completed_video_ids': completed_ids, 'completed_count': len(completed_ids), 'total_count': len(total_videos)})

@app.route('/api/progress', methods=['POST'])
@jwt_required()
def update_progress():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    video_id_to_toggle = data.get('videoId')
    if not video_id_to_toggle: return jsonify({'error': 'Video ID is required'}), 400
    existing_record = VideoProgress.query.filter_by(user_id=current_user_id, video_youtube_id=video_id_to_toggle).first()
    if existing_record:
        db.session.delete(existing_record)
        message = 'Video unmarked as complete'
    else:
        new_progress = VideoProgress(user_id=current_user_id, video_youtube_id=video_id_to_toggle)
        db.session.add(new_progress)
        message = 'Video marked as complete'
    db.session.commit()
    return jsonify({'message': message}), 200

@app.route("/api/text-to-sign", methods=['POST'])
@jwt_required()
def text_to_sign_route():
    data = request.get_json()
    text_to_convert = data.get('text')
    if not text_to_convert: return jsonify({"error": "No text provided"}), 400
    os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)
    video_filename, message = create_asl_video(text_to_convert, SIGN_MAP, app.config['OUTPUT_FOLDER'])
    if not video_filename: return jsonify({"error": message}), 400
    video_url = f"/videos/{video_filename}"
    return jsonify({"status": "success", "video_url": video_url})

@app.route('/api/speech-to-sign', methods=['POST'])
@jwt_required()
def speech_to_sign_route():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
    audio_file = request.files['audio']
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    temp_audio_path = os.path.join(app.config['UPLOAD_FOLDER'], "temp_audio.webm")
    audio_file.save(temp_audio_path)
    try:
        transcriber = aai.Transcriber()
        transcript = transcriber.transcribe(temp_audio_path)
        if transcript.status == aai.TranscriptStatus.error:
            return jsonify({"error": transcript.error}), 500
        recognized_text = transcript.text
    except Exception as e:
        return jsonify({"error": f"Failed to process audio: {e}"}), 500
    finally:
        if os.path.exists(temp_audio_path): os.remove(temp_audio_path)
    os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)
    video_filename, message = create_asl_video(recognized_text, SIGN_MAP, app.config['OUTPUT_FOLDER'])
    if not video_filename: return jsonify({"error": message}), 400
    return jsonify({"status": "success", "recognized_text": recognized_text, "video_url": f"/videos/{video_filename}"})

# --- Quiz API Routes ---
@app.route('/api/quiz/question', methods=['GET'])
@jwt_required()
def get_quiz_question():
    try:
        correct_word_obj = Word.query.order_by(func.random()).first()
        if not correct_word_obj:
            return jsonify({'error': 'No words available for the quiz.'}), 500
        correct_answer = correct_word_obj.text
        incorrect_words = Word.query.filter(Word.text != correct_answer).order_by(func.random()).limit(3).all()
        options = [w.text for w in incorrect_words] + [correct_answer]
        random.shuffle(options)
        video_filename, message = create_asl_video(correct_answer, SIGN_MAP, app.config['OUTPUT_FOLDER'])
        if not video_filename:
            raise IOError(f"Video file generation failed: {message}")
        video_url = f"/videos/{video_filename}"
        question_token = s.dumps(correct_answer, salt='quiz-answer')
        return jsonify({
            'video_url': video_url,
            'options': options,
            'question_id': question_token
        })
    except Exception as e:
        app.logger.error(f"Error generating quiz question: {e}")
        return jsonify({'error': 'Could not generate quiz question. Please try again.'}), 500

@app.route('/api/quiz/verify', methods=['POST'])
@jwt_required()
def verify_quiz_answer():
    data = request.get_json()
    user_answer = data.get('answer')
    question_token = data.get('question_id')
    if not all([user_answer, question_token]):
        return jsonify({'error': 'Missing answer or question ID.'}), 400
    try:
        correct_answer = s.loads(question_token, salt='quiz-answer', max_age=300)
    except Exception:
        return jsonify({'error': 'This question has expired. Please try the next one.'}), 400
    is_correct = (user_answer == correct_answer)
    feedback = "Correct!" if is_correct else f"Incorrect. The correct answer was {correct_answer}"
    return jsonify({
        'correct': is_correct,
        'feedback': feedback,
        'correct_answer': correct_answer
    })

# --- Static File Serving Routes ---
@app.route('/profile_pics/<filename>')
def serve_profile_picture(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/videos/<filename>')
def serve_video(filename):
    return send_from_directory(app.config['OUTPUT_FOLDER'], filename)

# --- Main Execution ---
if __name__ == '__main__':
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    with app.app_context():
        db.create_all()
        seed_database()
    app.run(debug=True)