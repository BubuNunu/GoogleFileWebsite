import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
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
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: 'clamp(1.75rem, 4vw, 3rem)',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: 'clamp(1.25rem, 3vw, 2rem)',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: 'clamp(1rem, 2vw, 1.25rem)',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: 'clamp(0.85rem, 1.25vw, 0.95rem)',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          height: '100%',
          width: '100%',
        },
        body: {
          height: '100%',
          width: '100%',
          overflowX: 'hidden',
        },
        '#root': {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          '@media (max-width: 600px)': {
            minHeight: '56px',
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            minHeight: '56px',
            paddingLeft: '16px',
            paddingRight: '16px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
          '@media (max-width: 600px)': {
            fontSize: '0.9rem',
            padding: '8px 16px',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            paddingLeft: '16px',
            paddingRight: '16px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            margin: '0',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            '& .MuiTab-root': {
              fontSize: '0.8rem',
              minWidth: '100px',
              padding: '6px 12px',
            },
          },
        },
      },
    },
  },
});

export default theme; 