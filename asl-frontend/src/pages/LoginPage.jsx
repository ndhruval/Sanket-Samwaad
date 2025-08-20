// src/pages/LoginPage.jsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Container, Paper, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

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
  maxWidth: '400px',
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

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('Token:', localStorage.getItem('token'));
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage(`Login failed: ${data.error}`);
      }
    } catch (error) {
      setMessage('Login failed: Could not connect to the server.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledContainer maxWidth="sm">
      <StyledPaper elevation={3}>
        <LogoContainer>
          <LockOutlinedIcon sx={{ fontSize: 40, color: 'white' }} />
        </LogoContainer>
        
        <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#1a1a1a' }}>
          Welcome Back
        </Typography>
        
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Sign in to continue your journey with Sanket-Samwaad
        </Typography>

        <StyledForm onSubmit={handleSubmit}>
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

          {message && (
            <Alert 
              severity={message.includes('successful') ? 'success' : 'error'} 
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
            {isLoading ? 'Signing In...' : 'Sign In'}
          </StyledButton>
        </StyledForm>

        <DividerContainer>
          <DividerText variant="body2">New to Sanket-Samwaad?</DividerText>
        </DividerContainer>

        <Typography variant="body2" align="center">
          Don't have an account?{' '}
          <StyledLink to="/signup">
            Create one now
          </StyledLink>
        </Typography>
      </StyledPaper>
    </StyledContainer>
  );
}

export default LoginPage;