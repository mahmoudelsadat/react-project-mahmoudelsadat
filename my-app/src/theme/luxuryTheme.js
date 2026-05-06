import { createTheme } from '@mui/material/styles';

export const luxuryTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#060700', 
      paper: '#0a0b00',
    },
    primary: {
      main: '#D4AF37', 
    },
    text: {
      primary: '#F5F5F5',
      secondary: '#D4AF37',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontWeight: 900,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '0.1em',
    },
    button: {
      letterSpacing: '0.1em',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '1px solid #D4AF37',
          padding: '12px 24px',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: '#D4AF37',
            color: '#060700',
          },
        },
      },
    },
  },
});