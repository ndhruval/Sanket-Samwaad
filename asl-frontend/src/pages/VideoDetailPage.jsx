import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  IconButton,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimerIcon from '@mui/icons-material/Timer';

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

const VideoCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  overflow: 'hidden',
  marginBottom: theme.spacing(4),
}));

const VideoHeader = styled(Box)(({ theme }) => ({
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
  '& iframe': {
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    maxWidth: '100%',
    height: 'auto',
    aspectRatio: '16/9',
  },
}));

const CompletionSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
}));

const CompletionButton = styled(Button)(({ theme, isComplete }) => ({
  padding: theme.spacing(2, 4),
  borderRadius: '16px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  minWidth: '200px',
  background: isComplete 
    ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
    : 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
  color: 'white',
  boxShadow: isComplete 
    ? '0 8px 32px rgba(34, 197, 94, 0.3)'
    : '0 8px 32px rgba(242, 117, 26, 0.3)',
  '&:hover': {
    background: isComplete 
      ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
      : 'linear-gradient(135deg, #e35d0f 0%, #bc4510 100%)',
    boxShadow: isComplete 
      ? '0 12px 40px rgba(34, 197, 94, 0.4)'
      : '0 12px 40px rgba(242, 117, 26, 0.4)',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease-in-out',
  '&:disabled': {
    background: 'rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.38)',
    boxShadow: 'none',
    transform: 'none',
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  borderRadius: '50%',
  minWidth: '48px',
  width: '48px',
  height: '48px',
  background: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.3)',
    transform: 'scale(1.05)',
  },
  transition: 'all 0.2s ease-in-out',
}));

const ProgressCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(3, 0),
  background: 'rgba(242, 117, 26, 0.05)',
  borderRadius: '16px',
  border: '1px solid rgba(242, 117, 26, 0.1)',
  textAlign: 'center',
}));

const StatsSection = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: theme.spacing(3),
  marginTop: theme.spacing(4),
}));

const StatCard = styled(Paper)(({ theme }) => ({
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

const StatIcon = styled(Box)(({ theme }) => ({
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

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#1a1a1a',
  marginBottom: theme.spacing(1),
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

function VideoDetailPage() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const checkProgress = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:5000/api/progress', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.completed_video_ids && data.completed_video_ids.includes(videoId)) {
          setIsComplete(true);
        }
      } catch (error) {
        console.error('Error checking progress:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkProgress();
  }, [videoId, token]);

  const toggleCompletion = async () => {
    setIsUpdating(true);
    try {
      await fetch('http://127.0.0.1:5000/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ videoId: videoId })
      });
      
      setIsComplete(!isComplete);
    } catch (error) {
      console.error('Error updating progress:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <StyledContainer maxWidth="lg">
        <LoadingContainer>
          <CircularProgress size={60} sx={{ color: '#f2751a' }} />
          <Typography variant="h6" color="text.secondary">
            Loading video lesson...
          </Typography>
        </LoadingContainer>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer maxWidth="lg">
      <HeaderSection>
        <HeaderTitle variant="h1">
          Video Lesson
        </HeaderTitle>
        <HeaderSubtitle variant="h6">
          Watch and learn from this comprehensive sign language lesson
        </HeaderSubtitle>
      </HeaderSection>

      <VideoCard>
        <VideoHeader>
          <BackButton
            onClick={() => navigate('/learn')}
            startIcon={<ArrowBackIcon />}
          />
          
          <HeaderIcon>
            <PlayCircleIcon sx={{ fontSize: 40, color: 'white' }} />
          </HeaderIcon>
          
          <Typography variant="h4" fontWeight={600}>
            Lesson Video
          </Typography>
          
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
            Complete this lesson to track your progress
          </Typography>
        </VideoHeader>

        <VideoContainer>
          <iframe 
            width="560" 
            height="315" 
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </VideoContainer>

        <CompletionSection>
          <ProgressCard>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Lesson Progress
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Mark this lesson as complete when you've finished watching
            </Typography>
            
            <CompletionButton
              onClick={toggleCompletion}
              disabled={isUpdating}
              isComplete={isComplete}
              startIcon={
                isUpdating ? (
                  <CircularProgress size={20} color="inherit" />
                ) : isComplete ? (
                  <CheckCircleIcon />
                ) : (
                  <SchoolIcon />
                )
              }
            >
              {isUpdating 
                ? 'Updating...' 
                : isComplete 
                  ? 'Lesson Completed ✓' 
                  : 'Mark as Complete'
              }
            </CompletionButton>
          </ProgressCard>
        </CompletionSection>
      </VideoCard>

      <StatsSection>
        <StatCard>
          <StatIcon>
            <SchoolIcon />
          </StatIcon>
          <StatNumber>1</StatNumber>
          <StatLabel>Current Lesson</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <TrendingUpIcon />
          </StatIcon>
          <StatNumber>{isComplete ? '100%' : '0%'}</StatNumber>
          <StatLabel>Completion Rate</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <TimerIcon />
          </StatIcon>
          <StatNumber>~15 min</StatNumber>
          <StatLabel>Estimated Duration</StatLabel>
        </StatCard>
      </StatsSection>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Ready for the next lesson?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Return to the Learning Hub to continue your journey
        </Typography>
      </Box>
    </StyledContainer>
  );
}

export default VideoDetailPage;