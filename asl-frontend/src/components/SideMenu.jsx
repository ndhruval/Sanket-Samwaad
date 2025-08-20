import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Avatar, 
  Typography, 
  Divider, 
  Button,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import MicIcon from '@mui/icons-material/Mic';
import NoteIcon from '@mui/icons-material/Note';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

const BACKEND_URL = 'http://127.0.0.1:5000';

// Styled components
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
    background: theme.palette.primary.dark,
    border: 'none',
    boxShadow: '4px 0 20px rgba(0, 0, 0, 0.3)',
  },
}));

const ProfileSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 3),
  textAlign: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)', // Changed from theme.palette.neutral.light
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  margin: '0 auto',
  marginBottom: theme.spacing(2),
  border: `3px solid ${theme.palette.secondary.main}`,
  boxShadow: `0 8px 32px ${theme.palette.secondary.main}20`,
}));

const ProfileName = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontWeight: 600,
  fontSize: '1.1rem',
  marginBottom: theme.spacing(1),
}));

const ProfileEmail = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '0.875rem',
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: theme.spacing(0.5, 2),
  borderRadius: '12px',
  color: 'rgba(255, 255, 255, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(242, 117, 26, 0.1)',
    color: 'white',
    '& .MuiListItemIcon-root': {
      color: '#f2751a',
    },
  },
  '&.active': {
    backgroundColor: 'rgba(242, 117, 26, 0.2)',
    color: 'white',
    '& .MuiListItemIcon-root': {
      color: '#f2751a',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '4px',
      background: 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
      borderRadius: '0 2px 2px 0',
    },
  },
  transition: 'all 0.2s ease-in-out',
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.6)',
  minWidth: 40,
  transition: 'color 0.2s ease-in-out',
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontWeight: 500,
    fontSize: '0.95rem',
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: '12px',
  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  color: 'white',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: '0 4px 16px rgba(239, 68, 68, 0.3)',
  '&:hover': {
    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)',
    transform: 'translateY(-1px)',
  },
  transition: 'all 0.2s ease-in-out',
}));

const BrandSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2),
  textAlign: 'center',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}));

const BrandTitle = styled(Typography)(({ theme }) => ({
  color: '#f2751a',
  fontWeight: 700,
  fontSize: '1.2rem',
  marginBottom: theme.spacing(0.5),
}));

const BrandTagline = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '0.75rem',
  fontStyle: 'italic',
}));

const ProgressSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  margin: theme.spacing(2, 2, 0, 2),
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '12px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

const ProgressTitle = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '0.875rem',
  fontWeight: 500,
  marginBottom: theme.spacing(1),
}));

const ProgressBar = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '6px',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
  marginBottom: theme.spacing(1),
}));

const ProgressFill = styled(Box)(({ theme }) => ({
  height: '100%',
  background: 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
  borderRadius: '3px',
  transition: 'width 0.3s ease-in-out',
}));

const ProgressText = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '0.75rem',
  textAlign: 'right',
}));

const SideMenu = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage or your auth context
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Text to Sign', icon: <TextFieldsIcon />, path: '/tools/text-to-sign' },
    { text: 'Speech to Sign', icon: <RecordVoiceOverIcon />, path: '/tools/speech-to-sign' },
    { text: 'Learning Hub', icon: <SchoolIcon />, path: '/learn' },
    { text: 'Notes', icon: <NoteIcon />, path: '/notes' },  // Changed from NotesIcon to NoteIcon
    { text: 'Quizzes', icon: <QuizIcon />, path: '/quizzes' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    // Perform logout logic, then redirect to login or home
    localStorage.removeItem('user');
    navigate('/login');
    onClose();
  };

  return (
    <StyledDrawer
      variant="temporary"
      anchor="left"
      open={isOpen}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
    >
      <BrandSection>
        <BrandTitle>Sanket-Samwaad</BrandTitle>
        <BrandTagline>Bridging Silence with Signs</BrandTagline>
      </BrandSection>

      {user && (
        <ProfileSection>
          <Link to="/profile" style={{ textDecoration: 'none' }} onClick={onClose}>
            <ProfileAvatar
              src={user.profile_image_url ? `${BACKEND_URL}${user.profile_image_url}` : undefined}
              alt={user.name}
            >
              {!user.profile_image_url && <PersonIcon />}
            </ProfileAvatar>
            <ProfileName>{user.name}</ProfileName>
            <ProfileEmail>{user.email}</ProfileEmail>
          </Link>
        </ProfileSection>
      )}

      <ProgressSection>
        <ProgressTitle>Learning Progress</ProgressTitle>
        <ProgressBar>
          <ProgressFill sx={{ width: '65%' }} />
        </ProgressBar>
        <ProgressText>65% Complete</ProgressText>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip 
            label="12 Lessons" 
            size="small" 
            sx={{ 
              background: 'rgba(242, 117, 26, 0.2)', 
              color: '#f2751a',
              fontSize: '0.7rem'
            }} 
          />
          <Chip 
            label="85% Score" 
            size="small" 
            sx={{ 
              background: 'rgba(34, 197, 94, 0.2)', 
              color: '#22c55e',
              fontSize: '0.7rem'
            }} 
          />
        </Box>
      </ProgressSection>

      <List sx={{ flexGrow: 1, mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <StyledListItemButton
              component={NavLink}
              to={item.path}
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={onClose}
            >
              <StyledListItemIcon>{item.icon}</StyledListItemIcon>
              <StyledListItemText primary={item.text} />
            </StyledListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', mx: 2 }} />

      <LogoutButton
        fullWidth
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        Sign Out
      </LogoutButton>
    </StyledDrawer>
  );
};

export default SideMenu;