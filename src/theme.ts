import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0a2540',
      light: '#335d85',
      dark: '#001428',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#25b0e8',
      light: '#6be3ff',
      dark: '#0080b6',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f7',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
        },
      },
    },
  },
});

export default theme; 