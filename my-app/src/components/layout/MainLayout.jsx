import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Navbar from './Navbar';

const MainLayout = ({ children }) => {
  const handleConcierge = () => {
    alert("VIP Concierge notified. A sleep specialist will contact you softly on 01115160947.");
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'transparent' }}>
      <Navbar />
      
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Box component="footer" sx={{ py: 6, px: 3, borderTop: '1px solid rgba(139, 164, 212, 0.1)', textAlign: 'center', bgcolor: 'rgba(8, 12, 22, 0.8)', backdropFilter: 'blur(10px)' }}>
        <Typography variant="overline" sx={{ color: '#8BA4D4', letterSpacing: '0.2em', display: 'block', mb: 3 }}>
          2M SLEEP ARCHITECTURE
        </Typography>
        
        <Button 
          onClick={handleConcierge}
          sx={{ 
            color: '#A7C7E7', 
            border: 'none', 
            fontSize: '0.8rem',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
            '&:hover': { bgcolor: 'transparent', color: '#fff', textDecoration: 'none', boxShadow: 'none' } 
          }}
        >
          CONTACT VIP CONCIERGE
        </Button>

        <Typography variant="body2" sx={{ color: '#4A5568', mt: 4, fontSize: '0.7rem', letterSpacing: '0.1em' }}>
          &copy; {new Date().getFullYear()} 2M ALLOCATIONS. STRICTLY CONFIDENTIAL.
        </Typography>
      </Box>
    </Box>
  );
};

export default MainLayout;