import React, { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../config/stripe';
import { Box, Button, Typography, Container, Card, Divider, Stepper, Step, StepLabel } from '@mui/material';
import { useCart } from '../../context/CartContext'; 
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { activateVault } = useCart(); 
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      alert(error.message); 
    } else {
      // Activate protocols and navigate to luxury success page
      activateVault(); 
      navigate('/success');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ border: '1px solid #333', p: 3, mb: 4, bgcolor: '#060700' }}>
        <CardElement options={{
          style: {
            base: { fontSize: '16px', color: '#F5F5F5', '::placeholder': { color: '#888' } },
            invalid: { color: '#ff4444' },
          },
        }}/>
      </Box>
      <Button type="submit" disabled={!stripe || total === 0} fullWidth sx={{ bgcolor: '#D4AF37', color: '#060700', py: 2, '&:hover': { bgcolor: '#fff' }, '&:disabled': { bgcolor: '#333', color: '#666' } }}>
        AUTHORIZE ${total.toLocaleString()}
      </Button>
    </form>
  );
};

const steps = ['Verify Allocations', 'Secure Authorization'];

const PaymentGateway = () => {
  const { vaultItems, updateQuantity, removeAllocation } = useCart();
  const [activeStep, setActiveStep] = useState(0);

  const calculateTotal = () => vaultItems.reduce((total, item) => total + ((item.price || 0) * item.quantity), 0);
  const currentTotal = calculateTotal();

  return (
    <Box sx={{ minHeight: '100vh', pt: 8, pb: 12 }}>
      <Container maxWidth="md">
        <Stepper activeStep={activeStep} sx={{ mb: 6, '& .MuiStepLabel-label': { color: '#888' }, '& .MuiStepLabel-label.Mui-active': { color: '#D4AF37' }, '& .MuiStepIcon-root.Mui-active': { color: '#D4AF37' } }}>
          {steps.map((label) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
        <Card sx={{ bgcolor: '#0a0b00', border: '1px solid #D4AF37', p: { xs: 3, md: 5 } }}>
          {activeStep === 0 && (
            <Box sx={{ animation: 'fadeIn 0.5s' }}>
              <Typography variant="h4" sx={{ color: '#D4AF37', mb: 4, letterSpacing: '0.1em', textAlign: 'center' }}>
                PENDING ALLOCATIONS
              </Typography>
              {vaultItems.length === 0 ? (
                <Typography sx={{ color: '#888', fontStyle: 'italic', textAlign: 'center' }}>No protocols reserved. Return to Architecture.</Typography>
              ) : (
                vaultItems.map((item) => (
                  <Box key={item.id} sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ color: '#F5F5F5', fontWeight: 600 }}>{item.name}</Typography>
                        <Typography variant="body2" sx={{ color: '#888' }}>Batch ID: {item.id}</Typography>
                      </Box>
                      <Typography variant="h6" sx={{ color: '#D4AF37' }}>${((item.price || 0) * item.quantity).toLocaleString()}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #333', borderRadius: '4px' }}>
                        <Button onClick={() => updateQuantity(item.id, item.quantity - 1)} sx={{ color: '#888', minWidth: '40px', p: 1 }}>-</Button>
                        <Typography sx={{ color: '#F5F5F5', width: '40px', textAlign: 'center', fontWeight: 600 }}>{item.quantity < 10 ? `0${item.quantity}` : item.quantity}</Typography>
                        <Button onClick={() => updateQuantity(item.id, item.quantity + 1)} sx={{ color: '#888', minWidth: '40px', p: 1 }}>+</Button>
                      </Box>
                      <Button size="small" onClick={() => removeAllocation(item.id)} sx={{ color: '#ff4444', fontSize: '0.75rem' }}>REMOVE</Button>
                    </Box>
                    <Divider sx={{ mt: 3, borderColor: '#222' }} />
                  </Box>
                ))
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800 }}>TOTAL</Typography>
                <Typography variant="h4" sx={{ color: '#D4AF37', fontWeight: 800 }}>${currentTotal.toLocaleString()}</Typography>
              </Box>
              <Button fullWidth onClick={() => setActiveStep(1)} disabled={vaultItems.length === 0} sx={{ mt: 4, bgcolor: '#D4AF37', color: '#060700', py: 2, '&:hover': { bgcolor: '#fff' } }}>
                PROCEED TO AUTHORIZATION
              </Button>
            </Box>
          )}

          {activeStep === 1 && (
            <Box sx={{ animation: 'fadeIn 0.5s' }}>
              <Button onClick={() => setActiveStep(0)} sx={{ color: '#888', mb: 4, border: 'none' }}>
                ← BACK TO VAULT
              </Button>
              <Elements stripe={stripePromise}>
                <CheckoutForm total={currentTotal} />
              </Elements>
            </Box>
          )}
        </Card>
      </Container>
    </Box>
  );
};

export default PaymentGateway;