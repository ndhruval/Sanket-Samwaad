import { useState } from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    console.log('Toggling menu:', !isMenuOpen); // Debug log
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar onMenuClick={handleMenuToggle} />
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8, // Add padding top to account for fixed navbar
          minHeight: '100vh'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;