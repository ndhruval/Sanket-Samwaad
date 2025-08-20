import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components for beautiful design
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f2751a 0%, #e35d0f 100%)',
  boxShadow: '0 4px 20px rgba(242, 117, 26, 0.3)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  zIndex: theme.zIndex.drawer + 2, // Add this line
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: '16px 24px',
  [theme.breakpoints.down('sm')]: {
    padding: '12px 16px',
  },
}));

const BrandContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flexGrow: 1,
}));

const BrandTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: 'white',
  margin: 0,
  lineHeight: 1.2,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.25rem',
  },
}));

const BrandTagline = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: 'rgba(255, 255, 255, 0.9)',
  margin: 0,
  fontWeight: 400,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  marginRight: '16px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.05)',
  },
  '&:active': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: 'scale(0.95)',
  },
  transition: 'all 0.2s ease-in-out',
}));

// This component receives a function `onMenuClick` from its parent
const Navbar = ({ onMenuClick }) => {
  const handleMenuClick = (event) => {
    event.preventDefault(); // Prevent any default behavior
    console.log('Navbar: Menu button clicked');
    onMenuClick?.();
  };

  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <StyledIconButton
          size="large"
          edge="start"
          aria-label="menu"
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </StyledIconButton>
        
        <BrandContainer>
          <BrandTitle variant="h6" component="div">
            Sanket-Samwaad
          </BrandTitle>
          <BrandTagline variant="body2">
            Bridging Silence with Signs
          </BrandTagline>
        </BrandContainer>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;