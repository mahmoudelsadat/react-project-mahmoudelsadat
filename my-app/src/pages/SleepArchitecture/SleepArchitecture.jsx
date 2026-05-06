import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Card, CardContent } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';

const SleepArchitecture = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addAllocation, vaultItems } = useCart();
  
  const [step, setStep] = useState(0);
  const [protocolReady, setProtocolReady] = useState(false);
  const [protocolData, setProtocolData] = useState(null);

  const questions = [
    { 
      id: 1, 
      query: t('sleep_q1'), 
      options: [t('sleep_q1_o1'), t('sleep_q1_o2'), t('sleep_q1_o3')] 
    },
    { 
      id: 2, 
      query: t('sleep_q2'), 
      options: [t('sleep_q2_o1'), t('sleep_q2_o2'), t('sleep_q2_o3')] 
    }
  ];

  useEffect(() => {
    if (protocolReady) {
      axios.get('http://localhost:3001/sleep-protocols?id=SLP-CORT-094')
        .then(res => setProtocolData(res.data[0]))
        .catch(err => console.error("Error fetching vault data", err));
    }
  }, [protocolReady]);

  const handleAnswer = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setProtocolReady(true);
    }
  };

  const handleReserve = () => {
    if (protocolData) {
      const isAlreadyAllocated = vaultItems.some(item => item.id === protocolData.id);
      
      if (!isAlreadyAllocated) {
        addAllocation(protocolData);
      }
      navigate('/checkout');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <Box sx={{ bgcolor: '#D4AF37', p: 3, mb: 8, boxShadow: '0 0 25px rgba(212, 175, 55, 0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h1" sx={{ color: '#060700', fontSize: '3.5rem', fontWeight: 900 }}>
          2M SLEEP
        </Typography>
      </Box>

      <Container maxWidth="md">
        <AnimatePresence mode="wait">
          {!protocolReady ? (
            <motion.div
              key="questionnaire"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="subtitle1" color="primary" gutterBottom sx={{ letterSpacing: '0.2em' }}>
                {t('assessment')} {step + 1} / {questions.length}
              </Typography>
              <Typography variant="h3" gutterBottom sx={{ mb: 6 }}>
                {questions[step].query}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {questions[step].options.map((opt, idx) => (
                  <Button key={idx} onClick={handleAnswer} sx={{ justifyContent: 'flex-start', py: 2, px: 4, fontSize: '1.1rem' }}>
                    {opt}
                  </Button>
                ))}
              </Box>
            </motion.div>
          ) : (
            <motion.div
              key="protocol"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Typography variant="h2" gutterBottom align="center" sx={{ color: '#D4AF37', mb: 4 }}>
                {t('vault')}
              </Typography>
              
              {protocolData && (
                <Card sx={{ bgcolor: '#0a0b00', border: '1px solid #333', mt: 4 }}>
                  <CardContent sx={{ p: 5 }}>
                    <Typography variant="overline" sx={{ color: '#ff4444', letterSpacing: '0.1em' }}>
                      STATUS: {protocolData.status.toUpperCase()}
                    </Typography>
                    <Typography variant="h4" sx={{ my: 2 }}>
                      {protocolData.name.toUpperCase()}
                    </Typography>
                    
                    <Box sx={{ my: 4, borderLeft: '2px solid #D4AF37', pl: 3, py: 1 }}>
                      {protocolData.timeline.map((item, i) => (
                        <Typography key={i} variant="body1" sx={{ mb: 2 }}>
                          <strong>{item.time}</strong> — {item.action}
                        </Typography>
                      ))}
                    </Box>

                    <Button 
                      fullWidth 
                      onClick={handleReserve}
                      sx={{ mt: 2, bgcolor: '#D4AF37', color: '#060700', py: 1.5, '&:hover': { bgcolor: '#fff', color: '#060700' } }}
                    >
                      {t('nav_checkout')} ($ {protocolData.price?.toLocaleString()})
                    </Button>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default SleepArchitecture;