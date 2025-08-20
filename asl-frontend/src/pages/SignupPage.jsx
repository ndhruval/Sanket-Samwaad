import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Container, Paper, TextField, Button, Typography, Alert, CircularProgress, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #fef7f0 0%, #f0f9ff 100%)',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '450px',
  width: '100%',
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4),
    margin: theme.spacing(2),
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(242, 117, 26, 0.3)',
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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

const FileUploadContainer = styled(Box)(({ theme }) => ({
  border: '2px dashed rgba(242, 117, 26, 0.3)',
  borderRadius: '16px',
  padding: theme.spacing(3),
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
  width: '100%',
  padding: theme.spacing(1.5),
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
  marginTop: theme.spacing(2),
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: '#f2751a',
  textDecoration: 'none',
  fontWeight: 500,
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const DividerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  margin: theme.spacing(3, 0),
  '&::before, &::after': {
    content: '""',
    flex: 1,
    height: '1px',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
}));

const DividerText = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color: 'rgba(0, 0, 0, 0.5)',
  fontSize: '0.875rem',
}));

const ProfilePreview = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: 'rgba(242, 117, 26, 0.1)',
  borderRadius: '12px',
  border: '1px solid rgba(242, 117, 26, 0.2)',
}));

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (profilePic) {
      formData.append('profile_pic', profilePic);
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/signup', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Account created successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(`Signup failed: ${data.error}`);
      }
    } catch (error) {
      setMessage('Signup failed: Could not connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <StyledContainer maxWidth="sm">
      <StyledPaper elevation={3}>
        <LogoContainer>
          <PersonAddIcon sx={{ fontSize: 40, color: 'white' }} />
        </LogoContainer>
        
        <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#1a1a1a' }}>
          Join Sanket-Samwaad
        </Typography>
        
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Start your journey to learn sign language and bridge communication gaps
        </Typography>

        <StyledForm onSubmit={handleSubmit}>
          <StyledTextField
            fullWidth
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: 'rgba(0, 0, 0, 0.4)' }} />
                </InputAdornment>
              ),
            }}
          />
          
          <StyledTextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: 'rgba(0, 0, 0, 0.4)' }} />
                </InputAdornment>
              ),
            }}
          />
          
          <StyledTextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: 'rgba(0, 0, 0, 0.4)' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    sx={{ color: 'rgba(0, 0, 0, 0.4)' }}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <StyledTextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: 'rgba(0, 0, 0, 0.4)' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleToggleConfirmPasswordVisibility}
                    edge="end"
                    sx={{ color: 'rgba(0, 0, 0, 0.4)' }}
                  >
                    {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FileUploadContainer>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="profile-pic-upload"
            />
            <label htmlFor="profile-pic-upload" style={{ cursor: 'pointer' }}>
              <CloudUploadIcon sx={{ fontSize: 48, color: 'rgba(242, 117, 26, 0.6)', mb: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {profilePic ? 'Profile picture selected' : 'Click to upload profile picture (optional)'}
              </Typography>
              {profilePic && (
                <Typography variant="caption" color="primary">
                  {profilePic.name}
                </Typography>
              )}
            </label>
          </FileUploadContainer>

          {profilePic && (
            <ProfilePreview>
              <Avatar
                src={URL.createObjectURL(profilePic)}
                sx={{ width: 48, height: 48 }}
              />
              <Box>
                <Typography variant="body2" fontWeight={500}>
                  Profile Preview
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {profilePic.name}
                </Typography>
              </Box>
            </ProfilePreview>
          )}

          {message && (
            <Alert 
              severity={message.includes('successfully') ? 'success' : 'error'} 
              sx={{ mb: 2, borderRadius: '12px' }}
            >
              {message}
            </Alert>
          )}

          <StyledButton
            type="submit"
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </StyledButton>
        </StyledForm>

        <DividerContainer>
          <DividerText variant="body2">Already have an account?</DividerText>
        </DividerContainer>

        <Typography variant="body2" align="center">
          Sign in to your existing account{' '}
          <StyledLink to="/login">
            here
          </StyledLink>
        </Typography>
      </StyledPaper>
    </StyledContainer>
  );
}

export default SignupPage;