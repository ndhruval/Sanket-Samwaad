import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  LinearProgress, 
  Chip, 
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

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

const ProgressCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  marginBottom: theme.spacing(4),
  overflow: 'hidden',
}));

const ProgressHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
  color: 'white',
  padding: theme.spacing(4),
  textAlign: 'center',
}));

const ProgressTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  marginBottom: theme.spacing(2),
}));

const ProgressStats = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(3),
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
    opacity: 0.9,
  },
}));

const ProgressBarContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: '12px',
  borderRadius: '6px',
  backgroundColor: 'rgba(242, 117, 26, 0.2)',
  '& .MuiLinearProgress-bar': {
    borderRadius: '6px',
    background: 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
  },
}));

const ChaptersCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const ChapterListItem = styled(ListItem)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  borderRadius: '16px',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(242, 117, 26, 0.05)',
    transform: 'translateX(8px)',
  },
}));

const ChapterButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '16px',
  padding: theme.spacing(2, 3),
  '&:hover': {
    backgroundColor: 'rgba(242, 117, 26, 0.1)',
  },
}));

const ChapterIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 48,
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
    color: '#f2751a',
  },
}));

const ChapterText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontSize: '1.1rem',
    fontWeight: 500,
    color: '#1a1a1a',
  },
  '& .MuiTypography-body2': {
    color: '#666',
    fontSize: '0.9rem',
  },
}));

const CompletionChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
  color: 'white',
  fontWeight: 600,
  '& .MuiChip-icon': {
    color: 'white',
  },
}));

const EmptyState = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(8),
  color: '#666',
}));

function LearningHubPage() {
  const [chapters, setChapters] = useState([]);
  const [progress, setProgress] = useState({
    completed_video_ids: [],
    completed_count: 0,
    total_count: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch the list of chapters
        const chaptersResponse = await fetch('http://127.0.0.1:5000/api/playlist', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const chaptersData = await chaptersResponse.json();
        setChapters(chaptersData);

        // Fetch the user's progress
        const progressResponse = await fetch('http://127.0.0.1:5000/api/progress', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const progressData = await progressResponse.json();
        setProgress(progressData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Calculate the percentage
  const percentage = progress.total_count > 0 
    ? Math.round((progress.completed_count / progress.total_count) * 100)
    : 0;

  if (isLoading) {
    return (
      <StyledContainer maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Typography>Loading your learning journey...</Typography>
        </Box>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer maxWidth="lg">
      <HeaderSection>
        <HeaderTitle variant="h1">
          Learning Hub
        </HeaderTitle>
        <HeaderSubtitle variant="h6">
          Master sign language through our comprehensive video lessons and track your progress
        </HeaderSubtitle>
      </HeaderSection>

      <ProgressCard>
        <ProgressHeader>
          <ProgressTitle>
            Your Learning Progress
          </ProgressTitle>
          <ProgressStats>
            <StatItem>
              <div className="stat-number">{progress.completed_count}</div>
              <div className="stat-label">Videos Completed</div>
            </StatItem>
            <StatItem>
              <div className="stat-number">{progress.total_count}</div>
              <div className="stat-label">Total Videos</div>
            </StatItem>
            <StatItem>
              <div className="stat-number">{percentage}%</div>
              <div className="stat-label">Overall Progress</div>
            </StatItem>
          </ProgressStats>
        </ProgressHeader>
        
        <ProgressBarContainer>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" color="text.secondary">
              Progress Bar
            </Typography>
            <Typography variant="h6" fontWeight={600} color="primary">
              {percentage}% Complete
            </Typography>
          </Box>
          <StyledLinearProgress variant="determinate" value={percentage} />
        </ProgressBarContainer>
      </ProgressCard>

      <ChaptersCard>
        <Box sx={{ p: 3, borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h5" fontWeight={600} color="#1a1a1a">
            Available Lessons
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Click on any lesson to start learning
          </Typography>
        </Box>

        {chapters.length > 0 ? (
          <List sx={{ p: 2 }}>
            {chapters.map((chapter, index) => {
              const isCompleted = progress.completed_video_ids.includes(chapter.youtubeId);
              
              return (
                <ChapterListItem key={chapter.id} disablePadding>
                  <ChapterButton
                    component={Link}
                    to={`/learn/${chapter.youtubeId}`}
                    sx={{ width: '100%' }}
                  >
                    <ChapterIcon>
                      {isCompleted ? <CheckCircleIcon /> : <PlayCircleIcon />}
                    </ChapterIcon>
                    
                    <ChapterText
                      primary={chapter.title}
                      secondary={`Lesson ${index + 1} • ${isCompleted ? 'Completed' : 'Not Started'}`}
                    />
                    
                    {isCompleted && (
                      <CompletionChip
                        icon={<CheckCircleIcon />}
                        label="Completed"
                        size="small"
                      />
                    )}
                  </ChapterButton>
                </ChapterListItem>
              );
            })}
          </List>
        ) : (
          <EmptyState>
            <VideoLibraryIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No lessons available yet
            </Typography>
            <Typography variant="body2">
              Check back soon for new learning content!
            </Typography>
          </EmptyState>
        )}
      </ChaptersCard>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Ready to continue learning?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select any lesson above to begin your sign language journey
        </Typography>
      </Box>
    </StyledContainer>
  );
}

export default LearningHubPage;