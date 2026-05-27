import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
    error: { main: '#d32f2f' },
    success: { main: '#2e7d32' },
    warning: { main: '#ed6c02' },
    background: { default: '#f5f5f5' },
  },
  typography: {
    fontFamily: '"Roboto", "Noto Sans SC", sans-serif',
  },
});

export default theme;
