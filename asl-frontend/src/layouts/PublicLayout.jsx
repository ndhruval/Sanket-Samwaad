import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const PublicLayout = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <Outlet />
    </Box>
  );
};

export default PublicLayout;