import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import SideMenu from '../components/SideMenu';

const AuthenticatedLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleMenuToggle = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      position: 'relative' // Add this
    }}>
      <Navbar onMenuClick={handleMenuToggle} />
      <SideMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        sx={{ position: 'absolute' }} // Add this
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          backgroundColor: '#f5f5f5',
          marginLeft: isMenuOpen ? '280px' : 0, // Add transition
          transition: 'margin 0.3s ease-in-out'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

// Example login function in your login page/component
const handleLogin = async (credentials) => {
  try {
    const response = await fetch('your-api-endpoint/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};

export default AuthenticatedLayout;