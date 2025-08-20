import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Avatar, 
  Button, 
  TextField, 
  Alert, 
  Divider,
  Chip,
  IconButton,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

const ProfileCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  marginBottom: theme.spacing(4),
  overflow: 'hidden',
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
  color: 'white',
  padding: theme.spacing(6),
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
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.3,
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  border: '4px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  zIndex: 1,
}));

const ProfileName = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: theme.spacing(1),
  position: 'relative',
  zIndex: 1,
}));

const ProfileEmail = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  opacity: 0.9,
  position: 'relative',
  zIndex: 1,
}));

const StatsSection = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: theme.spacing(3),
  padding: theme.spacing(4),
}));

const StatCard = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  background: 'rgba(242, 117, 26, 0.05)',
  borderRadius: '16px',
  border: '1px solid rgba(242, 117, 26, 0.1)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(242, 117, 26, 0.15)',
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

const UploadSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
}));

const UploadTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  color: '#1a1a1a',
  marginBottom: theme.spacing(3),
  textAlign: 'center',
}));

const FileUploadContainer = styled(Box)(({ theme }) => ({
  border: '2px dashed rgba(242, 117, 26, 0.3)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: 'rgba(242, 117, 26, 0.05)',
  marginBottom: theme.spacing(3),
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: 'rgba(242, 117, 26, 0.6)',
    backgroundColor: 'rgba(242, 117, 26, 0.1)',
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
}));

const HiddenInput = styled('input')({
  display: 'none',
});

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [token]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file first.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('profile_pic', selectedFile);

    try {
      const response = await fetch(`${BACKEND_URL}/api/profile/picture`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Profile picture updated successfully!');
        setUser(prevUser => ({...prevUser, profile_image_url: data.url}));
        setSelectedFile(null);
      } else {
        setMessage(`Upload failed: ${data.error}`);
      }
    } catch (error) {
      setMessage('Upload failed: Could not connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <StyledContainer maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Typography>Loading profile...</Typography>
        </Box>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer maxWidth="lg">
      <HeaderSection>
        <HeaderTitle variant="h1">
          Your Profile
        </HeaderTitle>
        <HeaderSubtitle variant="h6">
          Manage your account settings and profile information
        </HeaderSubtitle>
      </HeaderSection>

      <ProfileCard>
        <ProfileHeader>
          <ProfileAvatar
            src={user.profile_image_url ? `${BACKEND_URL}${user.profile_image_url}` : undefined}
            alt={user.name}
          >
            {!user.profile_image_url && <PersonIcon sx={{ fontSize: 60 }} />}
          </ProfileAvatar>
          <ProfileName>{user.name}</ProfileName>
          <ProfileEmail>{user.email}</ProfileEmail>
        </ProfileHeader>

        <StatsSection>
          <StatCard>
            <StatIcon>
              <SchoolIcon />
            </StatIcon>
            <StatNumber>12</StatNumber>
            <StatLabel>Lessons Completed</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatIcon>
              <TrendingUpIcon />
            </StatIcon>
            <StatNumber>85%</StatNumber>
            <StatLabel>Quiz Score</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatIcon>
              <CalendarTodayIcon />
            </StatIcon>
            <StatNumber>7</StatNumber>
            <StatLabel>Day Streak</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatIcon>
              <PersonIcon />
            </StatIcon>
            <StatNumber>Member</StatNumber>
            <StatLabel>Account Status</StatLabel>
          </StatCard>
        </StatsSection>

        <UploadSection>
          <UploadTitle>
            Update Profile Picture
          </UploadTitle>
          
          <FileUploadContainer>
            <HiddenInput
              accept="image/*"
              id="profile-pic-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="profile-pic-upload" style={{ cursor: 'pointer' }}>
              <CloudUploadIcon sx={{ fontSize: 48, color: 'rgba(242, 117, 26, 0.6)', mb: 2 }} />
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {selectedFile ? `Selected: ${selectedFile.name}` : 'Click to upload a new profile picture'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Supported formats: JPG, PNG, GIF (Max 5MB)
              </Typography>
            </label>
          </FileUploadContainer>

          {message && (
            <Alert 
              severity={message.includes('successfully') ? 'success' : 'error'} 
              sx={{ mb: 3, borderRadius: '12px' }}
            >
              {message}
            </Alert>
          )}

          <Box sx={{ textAlign: 'center' }}>
            <StyledButton
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
              startIcon={isLoading ? <CameraAltIcon /> : <EditIcon />}
            >
              {isLoading ? 'Uploading...' : 'Update Profile Picture'}
            </StyledButton>
          </Box>
        </UploadSection>
      </ProfileCard>
    </StyledContainer>
  );
}

export default ProfilePage;