import React from 'react';
import { Box, Typography, Container, Card, Grid, Divider, Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const ExecutiveDashboard = () => {
  const { currentUser } = useAuth();
  const { activeProtocols } = useCart();

  const calculateDaysRemaining = (renewalDateStr) => {
    const renewalDate = new Date(renewalDateStr);
    const today = new Date();
    const diffTime = Math.abs(renewalDate - today);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const exportToNotes = async (protocol) => {
    const title = `${protocol.name.toUpperCase()}`;
    let text = `2M SLEEP SANCTUARY\n${title}\n\n`;
    text += `STATUS: ACTIVE\nCYCLE RENEWAL: ${calculateDaysRemaining(protocol.renewalDate)} DAYS\n\n`;
    text += `EVENING RITUAL:\n`;
    protocol.timeline.forEach(item => {
      text += `~ ${item.time}: ${item.action}\n`;
    });
    text += `\nStrictly Confidential.`;

    if (navigator.share) {
      try {
        await navigator.share({ title: title, text: text });
      } catch (err) {
        console.log("Share dismissed", err);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert("Ritual quietly copied to clipboard. You may paste it into your Notes.");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', pt: 10, pb: 12 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ color: '#E2E8F0', mb: 2, fontWeight: 300 }}>
          YOUR SANCTUARY
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#8BA4D4', mb: 8, letterSpacing: '0.1em' }}>
          SECURE PROFILE: {currentUser?.email || "GUEST"}
        </Typography>

        <Grid container spacing={6}>
          <Grid item xs={12} md={5}>
            <Card sx={{ p: 5, height: '100%', bgcolor: 'transparent', border: 'none' }}>
              <Typography variant="overline" sx={{ color: '#8BA4D4', letterSpacing: '0.2em' }}>Biological Telemetry</Typography>
              <Box sx={{ mt: 4, p: 4, bgcolor: 'rgba(17, 24, 39, 0.3)', borderRadius: '24px', border: '1px dashed rgba(139, 164, 212, 0.2)', textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#4A5568', fontStyle: 'italic', lineHeight: 1.8 }}>
                  Telemetry integration resting. Gently sync your Oura ring or Apple Health data when ready to establish baseline metrics.
                </Typography>
              </Box>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Card className="breathing-container" sx={{ p: { xs: 3, md: 5 }, height: '100%' }}>
              <Typography variant="overline" sx={{ color: '#8BA4D4', letterSpacing: '0.2em' }}>Active Rituals</Typography>
              
              {activeProtocols.length === 0 ? (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="body1" sx={{ color: '#4A5568', fontStyle: 'italic' }}>The sanctuary is currently still. No active protocols.</Typography>
                </Box>
              ) : (
                <Box sx={{ mt: 4 }}>
                  {activeProtocols.map((protocol, index) => (
                    <Box key={index} sx={{ mb: 6, p: 4, bgcolor: 'rgba(8, 12, 22, 0.4)', borderRadius: '16px', border: '1px solid rgba(139, 164, 212, 0.1)' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h4" sx={{ color: '#E2E8F0', fontWeight: 300 }}>
                          {protocol.name}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" sx={{ color: '#8BA4D4', mb: 4, letterSpacing: '0.1em' }}>
                        CYCLE RENEWS IN: <span style={{ color: '#F0F4F8' }}>{calculateDaysRemaining(protocol.renewalDate)} DAYS</span>
                      </Typography>

                      <Divider sx={{ borderColor: 'rgba(139, 164, 212, 0.1)', mb: 4 }} />
                      
                      <Box sx={{ mb: 5, borderLeft: '1px solid rgba(139, 164, 212, 0.2)', pl: 3 }}>
                        {protocol.timeline?.map((item, i) => (
                          <Typography key={i} variant="body2" sx={{ color: '#A7C7E7', mb: 2, fontWeight: 300, letterSpacing: '0.05em' }}>
                            <strong style={{ color: '#F0F4F8', marginRight: '12px', fontWeight: 400 }}>{item.time}</strong> 
                            {item.action}
                          </Typography>
                        ))}
                      </Box>

                      <Button 
                        onClick={() => exportToNotes(protocol)}
                        fullWidth 
                        sx={{ bgcolor: 'rgba(167, 199, 231, 0.05)', color: '#A7C7E7', border: 'none', py: 1.5 }}
                      >
                        EXPORT TO NOTES
                      </Button>
                    </Box>
                  ))}
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ExecutiveDashboard;