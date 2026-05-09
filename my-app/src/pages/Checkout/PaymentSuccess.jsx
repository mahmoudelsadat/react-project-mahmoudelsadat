import React from 'react';
import { Box, Typography, Button, Container, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="sm">
        <Card sx={{ bgcolor: '#0a0b00', border: '1px solid #D4AF37', p: 6, textAlign: 'center' }}>
          <Box sx={{ color: '#D4AF37', fontSize: '4rem', mb: 2 }}>✓</Box>
          <Typography variant="h2" sx={{ color: '#D4AF37', mb: 2 }}>
            AUTHORIZATION COMPLETE
          </Typography>
          <Typography variant="body1" sx={{ color: '#F5F5F5', mb: 4, lineHeight: 1.8 }}>
            Your transaction was successful. The protocol has been allocated to your profile and a secure invoice has been dispatched to your corporate email.
          </Typography>
          
          <Button 
            fullWidth 
            onClick={() => navigate('/dashboard')}
            sx={{ bgcolor: '#D4AF37', color: '#060700', py: 2, '&:hover': { bgcolor: '#fff' } }}
          >
            PROCEED TO EXECUTIVE DASHBOARD
          </Button>
        </Card>
      </Container>
    </Box>
  );
};

export default PaymentSuccess;