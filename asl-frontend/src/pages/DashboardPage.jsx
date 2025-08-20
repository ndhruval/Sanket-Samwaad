import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Box, Container, Avatar, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import MicIcon from '@mui/icons-material/Mic';
import NoteIcon from '@mui/icons-material/Note';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'linear-gradient(135deg, #fef7f0 0%, #f0f9ff 100%)',
  minHeight: '100vh',
}));

const WelcomeSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
  borderRadius: '24px',
  padding: theme.spacing(6),
  marginBottom: theme.spacing(6),
  color: 'white',
  textAlign: 'center',
  boxShadow: '0 20px 40px rgba(242, 117, 26, 0.3)',
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

const WelcomeTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const WelcomeSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  opacity: 0.9,
  marginBottom: theme.spacing(3),
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(4),
  flexWrap: 'wrap',
  marginBottom: theme.spacing(4),
}));

const StatItem = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  '& .stat-number': {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  '& .stat-label': {
    fontSize: '0.875rem',
    opacity: 0.8,
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '280px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
  }
}));

const CardIconContainer = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
  color: 'white',
  transition: 'all 0.3s ease-in-out',
}));

const CardContentStyled = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'all 0.3s ease-in-out',
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: '#1a1a1a',
}));

const CardDescription = styled(Typography)(({ theme }) => ({
  color: '#666',
  lineHeight: 1.6,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 600,
  marginBottom: theme.spacing(4),
  color: '#1a1a1a',
  textAlign: 'center',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '4px',
    background: 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
    borderRadius: '2px',
  },
}));

function DashboardPage() {
  const user = JSON.parse(localStorage.getItem('user'));

  const dashboardItems = [
    {
      title: 'Learning Hub',
      description: 'Watch video chapters and track your progress in sign language learning.',
      icon: <SchoolIcon sx={{ fontSize: 28 }} />,
      path: '/learn',
      color: '#f2751a',
    },
    {
      title: 'Quizzes',
      description: 'Test your fingerspelling knowledge with interactive quizzes.',
      icon: <QuizIcon sx={{ fontSize: 28 }} />,
      path: '/quizzes',
      color: '#0ea5e9',
    },
    {
      title: 'Text to Sign',
      description: 'Convert typed text into animated sign language videos.',
      icon: <KeyboardIcon sx={{ fontSize: 28 }} />,
      path: '/tools/text-to-sign',
      color: '#22c55e',
    },
    {
      title: 'Speech to Sign',
      description: 'Convert spoken words into sign language videos.',
      icon: <MicIcon sx={{ fontSize: 28 }} />,
      path: '/tools/speech-to-sign',
      color: '#f59e0b',
    },
    {
      title: 'Notes',
      description: 'A simple notepad for communication and learning notes.',
      icon: <NoteIcon sx={{ fontSize: 28 }} />,
      path: '/notes',
      color: '#8b5cf6',
    },
    {
      title: 'Profile',
      description: 'Manage your account settings and profile information.',
      icon: <PersonIcon sx={{ fontSize: 28 }} />,
      path: '/profile',
      color: '#ec4899',
    },
  ];

  return (
    <StyledContainer maxWidth="xl">
      <WelcomeSection>
        <WelcomeTitle variant="h2">
          Welcome back, {user ? user.name : 'Guest'}! 👋
        </WelcomeTitle>
        <WelcomeSubtitle variant="h6">
          Continue your journey in learning sign language and bridging communication gaps
        </WelcomeSubtitle>
        
        <StatsContainer>
          <StatItem>
            <div className="stat-number">12</div>
            <div className="stat-label">Lessons Completed</div>
          </StatItem>
          <StatItem>
            <div className="stat-number">85%</div>
            <div className="stat-label">Quiz Score</div>
          </StatItem>
          <StatItem>
            <div className="stat-number">7</div>
            <div className="stat-label">Day Streak</div>
          </StatItem>
        </StatsContainer>
      </WelcomeSection>

      <SectionTitle variant="h3">
        Explore Your Learning Journey
      </SectionTitle>

      <Box sx={{ p: 3 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Link to={dashboardItems[2].path} style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledCard>
                  <CardContentStyled className="card-content">
                    <CardIconContainer className="card-icon">
                      {dashboardItems[2].icon}
                    </CardIconContainer>
                    
                    <CardTitle variant="h5">
                      {dashboardItems[2].title}
                    </CardTitle>
                    
                    <CardDescription variant="body2">
                      {dashboardItems[2].description}
                    </CardDescription>
                    
                    <Chip
                      label="Get Started"
                      size="small"
                      sx={{
                        mt: 2,
                        background: 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
                        color: 'white',
                        fontWeight: 500,
                      }}
                    />
                  </CardContentStyled>
                </StyledCard>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link to={dashboardItems[3].path} style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledCard>
                  <CardContentStyled className="card-content">
                    <CardIconContainer className="card-icon">
                      {dashboardItems[3].icon}
                    </CardIconContainer>
                    
                    <CardTitle variant="h5">
                      {dashboardItems[3].title}
                    </CardTitle>
                    
                    <CardDescription variant="body2">
                      {dashboardItems[3].description}
                    </CardDescription>
                    
                    <Chip
                      label="Get Started"
                      size="small"
                      sx={{
                        mt: 2,
                        background: 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
                        color: 'white',
                        fontWeight: 500,
                      }}
                    />
                  </CardContentStyled>
                </StyledCard>
              </Link>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Link to={dashboardItems[0].path} style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledCard>
                  <CardContentStyled className="card-content">
                    <CardIconContainer className="card-icon">
                      {dashboardItems[0].icon}
                    </CardIconContainer>
                    
                    <CardTitle variant="h5">
                      {dashboardItems[0].title}
                    </CardTitle>
                    
                    <CardDescription variant="body2">
                      {dashboardItems[0].description}
                    </CardDescription>
                    
                    <Chip
                      label="Get Started"
                      size="small"
                      sx={{
                        mt: 2,
                        background: 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
                        color: 'white',
                        fontWeight: 500,
                      }}
                    />
                  </CardContentStyled>
                </StyledCard>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Ready to start learning?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Choose any section above to begin your sign language journey with Sanket-Samwaad
        </Typography>
      </Box>
    </StyledContainer>
  );
}

export default DashboardPage;