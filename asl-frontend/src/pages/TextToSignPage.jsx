import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Paper,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

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

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1.1rem',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(242, 117, 26, 0.1)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: '2px',
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(242, 117, 26, 0.3)',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#f2751a',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
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
  '&:disabled': {
    background: 'rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.38)',
    boxShadow: 'none',
    transform: 'none',
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

function TextToSignPage() {
  const [text, setText] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setVideoUrl('');

    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch('/api/text-to-sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Failed to generate video.');
      } else {
        setVideoUrl(data.video_url);
      }
    } catch (err) {
      setError('Could not connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownloadVideo = () => {
    if (videoUrl) {
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = `sign-language-${text.toLowerCase().replace(/\s+/g, '-')}.mp4`;
      a.click();
    }
  };

  return (
    <StyledContainer maxWidth="lg">
      <HeaderSection>
        <HeaderTitle variant="h1">
          Text to Sign Language
        </HeaderTitle>
        <HeaderSubtitle variant="h6">
          Type a word or phrase to see it spelled out in American Sign Language
        </HeaderSubtitle>
      </HeaderSection>

      <MainCard>
        <CardHeader>
          <HeaderIcon>
            <KeyboardIcon sx={{ fontSize: 40, color: 'white' }} />
          </HeaderIcon>
          <Typography variant="h4" fontWeight={600}>
            Convert Text to Signs
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
            Watch as your text transforms into animated sign language
          </Typography>
        </CardHeader>

        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label="Enter your text here"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a word, phrase, or sentence..."
              variant="outlined"
              required
              helperText="Enter any text you want to convert to sign language"
            />

            <Box sx={{ textAlign: 'center' }}>
              <StyledButton
                type="submit"
                disabled={isLoading || !text.trim()}
                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <AutoFixHighIcon />}
              >
                {isLoading ? 'Generating Video...' : 'Generate Sign Language Video'}
              </StyledButton>
            </Box>
          </form>

          {error && (
            <Alert severity="error" sx={{ mt: 3, borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          {videoUrl && (
            <VideoContainer>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Your Sign Language Video
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Watch how "{text}" is signed in ASL
              </Typography>
              
              <video key={videoUrl} width="480" controls autoPlay>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <ActionButtons>
                <SecondaryButton
                  onClick={handleCopyText}
                  startIcon={<ContentCopyIcon />}
                >
                  Copy Text
                </SecondaryButton>
                
                <SecondaryButton
                  onClick={handleDownloadVideo}
                  startIcon={<DownloadIcon />}
                >
                  Download Video
                </SecondaryButton>
              </ActionButtons>
            </VideoContainer>
          )}
        </CardContent>
      </MainCard>

      <FeaturesSection>
        <Typography variant="h4" fontWeight={600} color="#1a1a1a" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Our advanced system converts your text into accurate sign language animations
        </Typography>
        
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>
              <KeyboardIcon />
            </FeatureIcon>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Type Your Text
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter any word, phrase, or sentence you want to convert
            </Typography>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <AutoFixHighIcon />
            </FeatureIcon>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              AI Processing
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Our system analyzes and converts text to sign language
            </Typography>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <PlayArrowIcon />
            </FeatureIcon>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Watch & Learn
            </Typography>
            <Typography variant="body2" color="text.secondary">
              View the animated sign language video instantly
            </Typography>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>
    </StyledContainer>
  );
}

export default TextToSignPage;