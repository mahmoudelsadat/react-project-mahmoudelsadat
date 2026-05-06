import React from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../config/stripe';
import { Box, Button, Typography, Container, Card, Divider } from '@mui/material';
import { useCart } from '../../context/CartContext'; 


const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { clearVault } = useCart(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      alert(error.message); 
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      alert(`Payment Success: Authorization for $${total.toLocaleString()} sent to processing vault.`);
      clearVault(); 
      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ border: '1px solid #333', p: 3, mb: 4, bgcolor: '#060700' }}>
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#F5F5F5',
              '::placeholder': { color: '#888' },
            },
            invalid: { color: '#ff4444' },
          },
        }}/>
      </Box>
      <Button 
        type="submit" 
        disabled={!stripe || total === 0} 
        fullWidth
        sx={{ bgcolor: '#D4AF37', color: '#060700', py: 2, '&:hover': { bgcolor: '#fff' }, '&:disabled': { bgcolor: '#333', color: '#666' } }}
      >
        AUTHORIZE ${total.toLocaleString()}
      </Button>
    </form>
  );
};



const PaymentGateway = () => {
  const { vaultItems, updateQuantity, removeAllocation } = useCart();

  const calculateTotal = () => {
    return vaultItems.reduce((total, item) => total + ((item.price || 0) * item.quantity), 0);
  };

  const currentTotal = calculateTotal();

  return (
    <Box sx={{ minHeight: '100vh', pt: 12, pb: 12 }}>
      <Container maxWidth="md">
        <Card sx={{ bgcolor: '#0a0b00', border: '1px solid #D4AF37', p: { xs: 3, md: 5 } }}>
          <Typography variant="h2" align="center" sx={{ color: '#D4AF37', mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}>
            ALLOCATION DEPOSIT
          </Typography>
          <Typography variant="overline" display="block" align="center" sx={{ color: '#888', mb: 5, letterSpacing: '0.2em' }}>
            2M EXECUTIVE LONGEVITY VAULT
          </Typography>
          
          
          <Box sx={{ mb: 6, p: { xs: 2, md: 4 }, bgcolor: '#060700', border: '1px solid #333' }}>
            <Typography variant="h6" sx={{ color: '#D4AF37', mb: 4, letterSpacing: '0.1em' }}>
              PENDING ALLOCATIONS
            </Typography>
            
            {vaultItems.length === 0 ? (
              <Typography sx={{ color: '#888', fontStyle: 'italic' }}>No protocols reserved. Return to Architecture.</Typography>
            ) : (
              vaultItems.map((item) => (
                <Box key={item.id} sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" sx={{ color: '#F5F5F5', fontWeight: 600 }}>{item.name}</Typography>
                      <Typography variant="body2" sx={{ color: '#888' }}>Batch ID: {item.id}</Typography>
                    </Box>
                    <Typography variant="h6" sx={{ color: '#D4AF37' }}>
                      ${((item.price || 0) * item.quantity).toLocaleString()}
                    </Typography>
                  </Box>

                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #333', borderRadius: '4px' }}>
                      <Button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        sx={{ color: '#888', minWidth: '40px', p: 1, '&:hover': { color: '#D4AF37' } }}
                      >
                        -
                      </Button>
                      <Typography sx={{ color: '#F5F5F5', width: '40px', textAlign: 'center', fontWeight: 600 }}>
                        {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
                      </Typography>
                      <Button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        sx={{ color: '#888', minWidth: '40px', p: 1, '&:hover': { color: '#D4AF37' } }}
                      >
                        +
                      </Button>
                    </Box>
                    
                    <Button 
                      size="small"
                      onClick={() => removeAllocation(item.id)}
                      sx={{ color: '#ff4444', fontSize: '0.75rem', '&:hover': { bgcolor: 'rgba(255, 68, 68, 0.1)' } }}
                    >
                      REMOVE
                    </Button>
                  </Box>
                  <Divider sx={{ mt: 3, borderColor: '#222' }} />
                </Box>
              ))
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800 }}>TOTAL</Typography>
              <Typography variant="h4" sx={{ color: '#D4AF37', fontWeight: 800 }}>
                ${currentTotal.toLocaleString()}
              </Typography>
            </Box>
          </Box>

          
          <Elements stripe={stripePromise}>
            <CheckoutForm total={currentTotal} />
          </Elements>
          
        </Card>
      </Container>
    </Box>
  );
};

export default PaymentGateway;