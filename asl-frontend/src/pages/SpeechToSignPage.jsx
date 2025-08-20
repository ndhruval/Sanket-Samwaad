import { useState, useRef } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Button, 
  Paper,
  Chip,
  CircularProgress,
  Alert,
  Fade
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

const BACKEND_URL = 'http://127.0.0.1:5000';

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'linear-gradient(135deg, #fef7f0 0%, #f0f9ff 100%)',
  minHeight: '100vh',
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: 700,
  color: '#1a1a1a',
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  color: '#666',
  maxWidth: '600px',
  margin: '0 auto',
  lineHeight: 1.6,
}));

const MainCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
}));

const CardHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
  color: 'white',
  padding: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M30 15c8.284 0 15 6.716 15 15s-6.716 15-15 15c-8.284 0-15-6.716-15-15s6.716-15 15-15zm0 2c-7.18 0-13 5.82-13 13s5.82 13 13 13 13-5.82 13-13-5.82-13-13-13z"/%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.3,
  },
}));

const HeaderIcon = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
}));

const RecordingSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(6),
}));

const RecordButton = styled(Button)(({ theme, isRecording }) => ({
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  background: isRecording 
    ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    : 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
  color: 'white',
  boxShadow: isRecording 
    ? '0 8px 32px rgba(239, 68, 68, 0.4)'
    : '0 8px 32px rgba(242, 117, 26, 0.3)',
  '&:hover': {
    background: isRecording 
      ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
      : 'linear-gradient(135deg, #e35d0f 0%, #bc4510 100%)',
    transform: 'scale(1.05)',
    boxShadow: isRecording 
      ? '0 12px 40px rgba(239, 68, 68, 0.5)'
      : '0 12px 40px rgba(242, 117, 26, 0.4)',
  },
  transition: 'all 0.3s ease-in-out',
  '&:disabled': {
    background: 'rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.38)',
    boxShadow: 'none',
    transform: 'none',
  },
}));

const RecordingIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
  padding: theme.spacing(2, 4),
  background: 'rgba(239, 68, 68, 0.1)',
  borderRadius: '20px',
  border: '1px solid rgba(239, 68, 68, 0.2)',
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': { opacity: 1 },
    '50%': { opacity: 0.7 },
    '100%': { opacity: 1 },
  },
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  background: 'rgba(242, 117, 26, 0.05)',
  borderRadius: '16px',
  border: '1px solid rgba(242, 117, 26, 0.1)',
  marginTop: theme.spacing(3),
  '& video': {
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    maxWidth: '100%',
    height: 'auto',
  },
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginTop: theme.spacing(3),
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  borderRadius: '12px',
  fontSize: '0.9rem',
  fontWeight: 500,
  textTransform: 'none',
  background: 'white',
  color: '#f2751a',
  border: '2px solid #f2751a',
  '&:hover': {
    background: 'rgba(242, 117, 26, 0.05)',
    transform: 'translateY(-1px)',
  },
  transition: 'all 0.2s ease-in-out',
}));

const RecognizedTextCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3, 0),
  background: 'rgba(34, 197, 94, 0.05)',
  borderRadius: '16px',
  border: '1px solid rgba(34, 197, 94, 0.2)',
  textAlign: 'center',
}));

const FeaturesSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  textAlign: 'center',
}));

const FeatureGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(3),
  marginTop: theme.spacing(4),
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(2),
  color: 'white',
}));

function SpeechToSignPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [recognizedText, setRecognizedText] = useState('');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        sendAudioToServer(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setError('');
      setVideoUrl('');
      setRecognizedText('');
    } catch (err) {
      setError('Microphone access was denied. Please allow access in your browser settings.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendAudioToServer = async (audioBlob) => {
    setIsLoading(true);
    const token = localStorage.getItem('accessToken');

    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/speech-to-sign', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setRecognizedText(data.recognized_text);
        const fullVideoUrl = `${BACKEND_URL}${data.video_url}`;
        setVideoUrl(fullVideoUrl);
      } else {
        setError(data.error || 'Failed to process audio.');
      }
    } catch (err) {
      setError('Could not connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(recognizedText);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownloadVideo = () => {
    if (videoUrl) {
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = `speech-to-sign-${recognizedText.toLowerCase().replace(/\s+/g, '-')}.mp4`;
      a.click();
    }
  };

  return (
    <StyledContainer maxWidth="lg">
      <HeaderSection>
        <HeaderTitle variant="h1">
          Speech to Sign Language
        </HeaderTitle>
        <HeaderSubtitle variant="h6">
          Speak naturally and watch your words transform into sign language animations
        </HeaderSubtitle>
      </HeaderSection>

      <MainCard>
        <CardHeader>
          <HeaderIcon>
            <MicIcon sx={{ fontSize: 40, color: 'white' }} />
          </HeaderIcon>
          <Typography variant="h4" fontWeight={600}>
            Voice to Signs
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
            Simply speak and watch the magic happen
          </Typography>
        </CardHeader>

        <CardContent>
          <RecordingSection>
            <RecordButton
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isLoading}
              isRecording={isRecording}
              startIcon={
                isRecording ? (
                  <MicOffIcon sx={{ fontSize: 32 }} />
                ) : (
                  <MicIcon sx={{ fontSize: 32 }} />
                )
              }
            >
              {isRecording ? 'Stop' : 'Start'}
            </RecordButton>

            {isRecording && (
              <Fade in={isRecording}>
                <RecordingIndicator>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: '#ef4444',
                      animation: 'pulse 1s infinite',
                    }}
                  />
                  <Typography variant="h6" color="#ef4444" fontWeight={600}>
                    Recording...
                  </Typography>
                </RecordingIndicator>
              </Fade>
            )}

            {isLoading && (
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <CircularProgress size={40} sx={{ color: '#f2751a', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Processing your speech...
                </Typography>
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mt: 3, borderRadius: '12px' }}>
                {error}
              </Alert>
            )}

            {recognizedText && (
              <RecognizedTextCard>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Speech Recognized
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  "{recognizedText}"
                </Typography>
                <SecondaryButton
                  onClick={handleCopyText}
                  startIcon={<ContentCopyIcon />}
                >
                  Copy Text
                </SecondaryButton>
              </RecognizedTextCard>
            )}

            {videoUrl && (
              <VideoContainer>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  Your Sign Language Video
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Watch how "{recognizedText}" is signed in ASL
                </Typography>
                
                <video key={videoUrl} width="480" controls autoPlay>
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <ActionButtons>
                  <SecondaryButton
                    onClick={handleDownloadVideo}
                    startIcon={<DownloadIcon />}
                  >
                    Download Video
                  </SecondaryButton>
                </ActionButtons>
              </VideoContainer>
            )}
          </RecordingSection>
        </CardContent>
      </MainCard>

      <FeaturesSection>
        <Typography variant="h4" fontWeight={600} color="#1a1a1a" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Our advanced speech recognition and AI system converts your voice to sign language
        </Typography>
        
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>
              <MicIcon />
            </FeatureIcon>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Speak Naturally
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click record and speak clearly into your microphone
            </Typography>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <RecordVoiceOverIcon />
            </FeatureIcon>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              AI Recognition
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Our system accurately transcribes your speech
            </Typography>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <AutoFixHighIcon />
            </FeatureIcon>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Instant Conversion
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Watch as your words become sign language animations
            </Typography>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>
    </StyledContainer>
  );
}

export default SpeechToSignPage;