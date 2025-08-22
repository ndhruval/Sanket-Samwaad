import { useState } from 'react';
// FIX: Correctly import the hook from the library
import { useReactMediaRecorder } from 'react-media-recorder';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  CircularProgress, 
  Alert,
  Grid,
  Icon
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import TranslateIcon from '@mui/icons-material/Translate';
import MovieIcon from '@mui/icons-material/Movie';

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(242, 117, 26, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 20px rgba(242, 117, 26, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(242, 117, 26, 0);
  }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  textAlign: 'center',
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

const MainCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: '24px',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const RecordButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== '$isRecording',
})(({ theme, $isRecording }) => ({
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  fontSize: '1.2rem',
  fontWeight: 600,
  margin: '20px auto',
  display: 'flex',
  flexDirection: 'column',
  background: $isRecording 
    ? 'linear-gradient(135deg, #e53935 0%, #b71c1c 100%)' 
    : 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
  color: 'white',
  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  animation: $isRecording ? 'none' : `${pulse} 2s infinite`,
  '&:hover': {
    transform: 'scale(1.05)',
    background: $isRecording 
      ? 'linear-gradient(135deg, #d32f2f 0%, #a31515 100%)' 
      : 'linear-gradient(135deg, #e35d0f 0%, #bc4510 100%)',
  },
  transition: 'all 0.3s ease-in-out',
}));

const ResultBox = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: '16px',
  textAlign: 'left',
  background: theme.palette.background.default,
}));

const HowItWorksSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  background: 'white',
  borderRadius: '24px',
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
}));

const FeatureIcon = styled(Icon)(({ theme }) => ({
  fontSize: '48px',
  color: '#f2751a',
  marginBottom: theme.spacing(2),
}));


const SpeechToSignPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleStop = async (blobUrl, blob) => {
    if (blob.size === 0) {
      setError("Recording was empty. Please try speaking for a moment.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('audio', blob, 'recording.webm');

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }

      const response = await fetch('/api/speech-to-sign', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Failed to process audio.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // FIX: Call the correct hook name
  const { status, startRecording, stopRecording } = useReactMediaRecorder({ 
    video: false, 
    audio: true, 
    onStop: handleStop 
  });

  const isRecording = status === 'recording';

  const handleButtonClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <StyledContainer>
      <HeaderBox>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Speech to Sign Language
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Speak naturally and watch your words transform into sign language animations
        </Typography>
      </HeaderBox>

      <MainCard elevation={0}>
        <Typography variant="h4" sx={{ fontWeight: 500, color: '#f2751a' }}>
          Voice to Signs
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
          Simply speak and watch the magic happen
        </Typography>

        <RecordButton
          onClick={handleButtonClick}
          $isRecording={isRecording}
        >
          {isRecording ? <StopIcon sx={{ fontSize: 40 }} /> : <MicIcon sx={{ fontSize: 40 }} />}
          {isRecording ? 'Stop' : 'Start'}
        </RecordButton>

        {isRecording && (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
            <GraphicEqIcon />
            <Typography sx={{ ml: 1 }}>Recording in progress...</Typography>
          </Box>
        )}

        {isLoading && <CircularProgress sx={{ mt: 2 }} />}
        
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        {result && (
          <ResultBox variant="outlined">
            <Typography variant="h6" gutterBottom>
              <TranslateIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Recognized Text:
            </Typography>
            <Typography paragraph sx={{ fontStyle: 'italic' }}>"{result.recognized_text}"</Typography>
            
            <Typography variant="h6" gutterBottom>
              <MovieIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Generated Video:
            </Typography>
            <video
              key={result.video_url}
              controls
              autoPlay
              playsInline
              style={{ width: '100%', borderRadius: '12px', marginTop: '8px' }}
            >
              <source src={result.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </ResultBox>
        )}
      </MainCard>

      <HowItWorksSection>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
          How It Works
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 5 }}>
          Our advanced speech recognition and AI system converts your voice to sign language.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <FeatureIcon as={MicIcon} />
              <Typography variant="h6" gutterBottom>Speak Naturally</Typography>
              <Typography color="textSecondary">Click record and speak clearly into your microphone.</Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <FeatureIcon as={GraphicEqIcon} />
              <Typography variant="h6" gutterBottom>AI Recognition</Typography>
              <Typography color="textSecondary">Our system accurately transcribes your speech into text.</Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <FeatureIcon as={MovieIcon} />
              <Typography variant="h6" gutterBottom>Instant Conversion</Typography>
              <Typography color="textSecondary">Watch as your words become sign language videos in real-time.</Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </HowItWorksSection>
    </StyledContainer>
  );
};

export default SpeechToSignPage;