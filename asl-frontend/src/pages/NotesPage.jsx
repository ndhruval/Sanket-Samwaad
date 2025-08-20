import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  IconButton,
  Paper,
  Chip,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import NoteIcon from '@mui/icons-material/Note';
import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveIcon from '@mui/icons-material/Save';
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

const NotesCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  overflow: 'hidden',
}));

const NotesHeader = styled(Box)(({ theme }) => ({
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
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1.1rem',
    lineHeight: 1.6,
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

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginTop: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: '16px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  minWidth: '140px',
  transition: 'all 0.3s ease-in-out',
}));

const PrimaryButton = styled(StyledButton)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
  color: 'white',
  boxShadow: '0 8px 32px rgba(242, 117, 26, 0.3)',
  '&:hover': {
    background: 'linear-gradient(135deg, #e35d0f 0%, #bc4510 100%)',
    boxShadow: '0 12px 40px rgba(242, 117, 26, 0.4)',
    transform: 'translateY(-2px)',
  },
}));

const SecondaryButton = styled(StyledButton)(({ theme }) => ({
  background: 'white',
  color: '#f2751a',
  border: '2px solid #f2751a',
  '&:hover': {
    background: 'rgba(242, 117, 26, 0.05)',
    transform: 'translateY(-2px)',
  },
}));

const DangerButton = styled(StyledButton)(({ theme }) => ({
  background: 'white',
  color: '#ef4444',
  border: '2px solid #ef4444',
  '&:hover': {
    background: 'rgba(239, 68, 68, 0.05)',
    transform: 'translateY(-2px)',
  },
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

function NotesPage() {
  const [note, setNote] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const handleNoteChange = (e) => {
    const text = e.target.value;
    setNote(text);
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    setCharCount(text.length);
  };

  const handleClear = () => {
    setNote('');
    setWordCount(0);
    setCharCount(0);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(note);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSave = () => {
    // You could implement local storage or backend saving here
    const blob = new Blob([note], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'communication-note.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <StyledContainer maxWidth="lg">
      <HeaderSection>
        <HeaderTitle variant="h1">
          Communication Notes
        </HeaderTitle>
        <HeaderSubtitle variant="h6">
          Type your message below to show it to someone. Perfect for communication in various settings.
        </HeaderSubtitle>
      </HeaderSection>

      <NotesCard>
        <NotesHeader>
          <HeaderIcon>
            <NoteIcon sx={{ fontSize: 40, color: 'white' }} />
          </HeaderIcon>
          <Typography variant="h4" fontWeight={600}>
            Your Message
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
            Type your thoughts, questions, or any message you want to share
          </Typography>
        </NotesHeader>

        <CardContent sx={{ p: 4 }}>
          <StatsSection>
            <StatCard>
              <StatNumber>{wordCount}</StatNumber>
              <StatLabel>Words</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{charCount}</StatNumber>
              <StatLabel>Characters</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{Math.ceil(charCount / 5)}</StatNumber>
              <StatLabel>Reading Time (min)</StatLabel>
            </StatCard>
          </StatsSection>

          <StyledTextField
            fullWidth
            multiline
            rows={12}
            value={note}
            onChange={handleNoteChange}
            placeholder="Start typing your message here... You can write anything you want to communicate - questions, thoughts, instructions, or just a friendly note."
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <ActionButtons>
            <PrimaryButton
              onClick={handleSave}
              startIcon={<SaveIcon />}
              disabled={!note.trim()}
            >
              Save Note
            </PrimaryButton>
            
            <SecondaryButton
              onClick={handleCopy}
              startIcon={<ContentCopyIcon />}
              disabled={!note.trim()}
            >
              Copy Text
            </SecondaryButton>
            
            <DangerButton
              onClick={handleClear}
              startIcon={<ClearIcon />}
              disabled={!note.trim()}
            >
              Clear All
            </DangerButton>
          </ActionButtons>
        </CardContent>
      </NotesCard>

      <FeaturesSection>
        <Typography variant="h4" fontWeight={600} color="#1a1a1a" gutterBottom>
          Why Use Communication Notes?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Perfect for various communication scenarios and learning environments
        </Typography>
        
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>
              <NoteIcon />
            </FeatureIcon>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Easy Communication
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quickly type and display messages for easy reading and understanding
            </Typography>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <AutoFixHighIcon />
            </FeatureIcon>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Learning Tool
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Practice writing and improve your communication skills
            </Typography>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <ContentCopyIcon />
            </FeatureIcon>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Share & Save
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Copy text to clipboard or save notes for future reference
            </Typography>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>
    </StyledContainer>
  );
}

export default NotesPage;