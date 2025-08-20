import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f2751a',    // Orange
      dark: '#e35d0f',    // Dark Orange
    },
    secondary: {
      main: '#ffffff',    // White
      light: '#f5f5f5',   // Light Gray
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    }
  },
  shape: {
    borderRadius: 8
  },
  spacing: 8
});

export default theme;