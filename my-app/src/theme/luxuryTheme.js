import { createTheme } from '@mui/material/styles';

export const luxuryTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#080C16', // Deep, calming night sky
      paper: '#111827', // Soft translucent dark blue
    },
    primary: {
      main: '#A7C7E7', // Soft moonlight blue
    },
    text: {
      primary: '#F0F4F8', // Soft off-white to reduce eye strain
      secondary: '#8BA4D4', // Muted lavender-blue
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Arial", sans-serif',
    h1: {
      fontWeight: 300,
      letterSpacing: '0.1em',
      color: '#E2E8F0',
    },
    h2: {
      fontWeight: 300,
      letterSpacing: '0.08em',
      color: '#A7C7E7',
    },
    h3: {
      fontWeight: 400,
      letterSpacing: '0.05em',
    },
    h4: {
      fontWeight: 400,
    },
    button: {
      letterSpacing: '0.1em',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px', // Soft, pill-shaped buttons
          border: '1px solid rgba(167, 199, 231, 0.3)',
          padding: '12px 32px',
          backgroundColor: 'transparent',
          transition: 'all 0.5s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(167, 199, 231, 0.1)',
            borderColor: '#A7C7E7',
            boxShadow: '0 0 20px rgba(167, 199, 231, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '24px', // Softened card edges
          backgroundImage: 'none',
          backgroundColor: 'rgba(17, 24, 39, 0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(139, 164, 212, 0.1)',
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&:after': {
            borderBottomColor: '#A7C7E7 !important',
          },
        },
      },
    },
  },
});