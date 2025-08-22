import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Button, 
  Paper,
  Chip,
  LinearProgress,
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import QuizIcon from '@mui/icons-material/Quiz';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

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

const QuizCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
}));

const QuizHeader = styled(Box)(({ theme }) => ({
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

const VideoContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  '& video': {
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    maxWidth: '100%',
    height: 'auto',
  },
}));

const OptionsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: theme.spacing(2),
  padding: theme.spacing(4),
}));

const OptionButton = styled(Button, {
  // This prevents the custom props from being passed to the DOM element
  shouldForwardProp: (prop) => 
    prop !== '$iscorrect' && 
    prop !== '$isselected' && 
    prop !== '$isanswered',
})(({ theme, $iscorrect, $isselected, $isanswered }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
  textTransform: 'none',
  fontSize: '1.1rem',
  padding: theme.spacing(1.5),
  backgroundColor: $isanswered
    ? $isselected
      ? $iscorrect
        ? '#4caf50'  // Green for correct
        : '#f44336'  // Red for incorrect
      : $iscorrect
        ? '#4caf50'  // Green for showing correct answer
        : '#fff'     // White for unselected
    : '#fff',        // White for unanswered
  color: $isanswered
    ? $isselected || $iscorrect
      ? '#fff'
      : '#000'
    : '#000',
  '&:hover': {
    backgroundColor: $isanswered
      ? $isselected
        ? $iscorrect
          ? '#45a049'  // Darker green
          : '#d32f2f'  // Darker red
        : '#f5f5f5'    // Light grey
      : '#f5f5f5'      // Light grey
  }
}));

const FeedbackSection = styled(Box)(({ theme, isCorrect }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  background: isCorrect ? 'rgba(34, 197, 94, 0.05)' : 'rgba(239, 68, 68, 0.05)',
  borderTop: `1px solid ${isCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
}));

const FeedbackIcon = styled(Box)(({ theme, isCorrect }) => ({
  width: 64,
  height: 64,
  borderRadius: '50%',
  background: isCorrect 
    ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
    : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(2),
  color: 'white',
  boxShadow: `0 8px 32px ${isCorrect ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
}));

const NextButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: '16px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  background: 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
  color: 'white',
  boxShadow: '0 8px 32px rgba(242, 117, 26, 0.3)',
  '&:hover': {
    background: 'linear-gradient(135deg, #e35d0f 0%, #bc4510 100%)',
    boxShadow: '0 12px 40px rgba(242, 117, 26, 0.4)',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease-in-out',
}));

const StatsSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(4),
  marginBottom: theme.spacing(4),
  flexWrap: 'wrap',
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  textAlign: 'center',
  background: 'rgba(242, 117, 26, 0.05)',
  borderRadius: '16px',
  border: '1px solid rgba(242, 117, 26, 0.1)',
  minWidth: '120px',
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#f2751a',
  marginBottom: theme.spacing(0.5),
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  color: '#666',
  fontSize: '0.875rem',
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '50vh',
  gap: theme.spacing(3),
}));

const QuestionOptions = ({ options, selectedAnswer, onAnswerClick, correctAnswer, isAnswered }) => (
  <Box sx={{ mt: 4 }}>
    {options.map((option, index) => (
      <OptionButton
        key={index}
        variant="outlined"
        onClick={() => onAnswerClick(option)}
        disabled={isAnswered}
        $iscorrect={correctAnswer === option ? 1 : 0}
        $isselected={selectedAnswer === option ? 1 : 0}
        $isanswered={isAnswered ? 1 : 0}
      >
        {option}
      </OptionButton>
    ))}
  </Box>
);

function QuizPage() {
  const navigate = useNavigate();
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [question, setQuestion] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const fetchNextQuestion = async (isRetry = false) => {
    if (!isRetry) {
      setIsLoading(true); // FIX: Was setLoading
      setError(null);
      setQuestion(null);
      setFeedback('');
      setSelectedAnswer('');
      setIsAnswered(false);
      setCorrectAnswer('');
    }
    
    try {
      const token = localStorage.getItem('access_token');
      console.log("DEBUG: Attempting to fetch question with token:", token);
      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }

      const response = await fetch(`/api/quiz/question`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
      });

      if (!response.ok) {
        throw new Error(`Unable to fetch question (${response.status}). Please try again.`);
      }

      const data = await response.json();
      console.log("DEBUG: Question data received:", data);
      setQuestion(data);
      if (!isRetry) {
        setTotalQuestions(prev => prev + 1);
      }
      setRetryCount(0);
    } catch (error) {
      console.error('DEBUG: Error in fetchNextQuestion:', error);
      setError(error.message);
      if (error.message.includes("token")) {
        setTimeout(() => navigate('/login'), 3000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        setError("You must be logged in to take the quiz. Redirecting...");
        setIsLoading(false);
        setTimeout(() => navigate('/login'), 3000);
    } else {
        fetchNextQuestion();
    }
  }, [navigate]);

  const handleAnswerClick = async (option) => {
    if (isAnswered) return;
    
    setSelectedAnswer(option);
    
    try {
      const token = localStorage.getItem('access_token');
      console.log("DEBUG: Verifying answer with token:", token);
      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }

      const response = await fetch(`/api/quiz/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          answer: option,
          question_id: question.question_id
        })
      });

      const data = await response.json();
      console.log("DEBUG: Verification response:", data);
      
      if (response.ok) {
        setCorrectAnswer(data.correct_answer);
        setFeedback(data.feedback);
        setIsAnswered(true);
        if (data.correct) {
          setScore(prev => prev + 1);
        }
      } else {
        setError(data.error || 'Failed to verify answer');
      }
    } catch (error) {
      console.error('DEBUG: Error verifying answer:', error);
      setError('Failed to verify answer. Please try again.');
    }
  };

  const handleNextQuestion = () => {
    fetchNextQuestion();
  };

  return (
    <StyledContainer>
      <HeaderSection>
        <HeaderTitle variant="h1">Welcome to the Quiz</HeaderTitle>
        <HeaderSubtitle variant="subtitle1">
          Test your knowledge and improve your skills. Answer the questions and get instant feedback!
        </HeaderSubtitle>
      </HeaderSection>

      {isLoading ? (
        <LoadingContainer>
          <CircularProgress size={60} thickness={4} />
          <Typography variant="body1" color="textSecondary">
            Loading your quiz question...
          </Typography>
        </LoadingContainer>
      ) : error ? (
        <Alert 
          severity="error" 
          action={
            <Button
              color="inherit"
              size="small"
              onClick={handleNextQuestion}
            >
              Try Again
            </Button>
          }
        >
          {error}
        </Alert>
      ) : (
        <QuizCard>
          <QuizHeader>
            <HeaderIcon>
              <QuizIcon fontSize="large" color="inherit" />
            </HeaderIcon>
            <Typography variant="h5" component="div">
              Question {totalQuestions}
            </Typography>
          </QuizHeader>

          <VideoContainer>
            {question?.video_url && (
              <video 
                key={question.video_url}
                controls 
                autoPlay 
                playsInline
                style={{ width: '100%', maxWidth: '600px', borderRadius: '16px' }}
              >
                <source 
                  src={question.video_url} 
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            )}
          </VideoContainer>

          <OptionsContainer>
            <QuestionOptions
              options={question?.options || []}
              selectedAnswer={selectedAnswer}
              onAnswerClick={handleAnswerClick}
              correctAnswer={correctAnswer}
              isAnswered={isAnswered}
            />
          </OptionsContainer>

          {isAnswered && feedback && (
            <FeedbackSection isCorrect={selectedAnswer === correctAnswer}>
              <FeedbackIcon isCorrect={selectedAnswer === correctAnswer}>
                {selectedAnswer === correctAnswer 
                  ? <CheckCircleIcon sx={{ fontSize: 40 }} /> 
                  : <CancelIcon sx={{ fontSize: 40 }} />}
              </FeedbackIcon>
              <Typography variant="h6" component="div" paragraph>
                {feedback}
              </Typography>
              <NextButton
                variant="contained"
                onClick={handleNextQuestion}
                startIcon={<PlayArrowIcon />}
              >
                Next Question
              </NextButton>
            </FeedbackSection>
          )}
        </QuizCard>
      )}

      <StatsSection>
        <StatCard elevation={0}>
          <StatNumber variant="h6">{score}</StatNumber>
          <StatLabel variant="body2">Correct Answers</StatLabel>
        </StatCard>
        <StatCard elevation={0}>
          <StatNumber variant="h6">{totalQuestions > 0 ? totalQuestions - score - (isAnswered ? 0 : 1) : 0}</StatNumber>
          <StatLabel variant="body2">Incorrect Answers</StatLabel>
        </StatCard>
        <StatCard elevation={0}>
          <StatNumber variant="h6">{totalQuestions}</StatNumber>
          <StatLabel variant="body2">Total Questions</StatLabel>
        </StatCard>
      </StatsSection>
    </StyledContainer>
  );
}

export default QuizPage;