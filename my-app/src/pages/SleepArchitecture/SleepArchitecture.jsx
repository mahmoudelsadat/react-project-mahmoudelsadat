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
  
  const [step, setStep] = useState(parseInt(localStorage.getItem('sleepAssessmentStep')) || 0);
  const [protocolReady, setProtocolReady] = useState(localStorage.getItem('protocolReady') === 'true');
  const [protocolData, setProtocolData] = useState(null);
  const [syncingHealth, setSyncingHealth] = useState(false);

  const questions = [
    { id: 1, query: t('sleep_q1'), options: [t('sleep_q1_o1'), t('sleep_q1_o2'), t('sleep_q1_o3')] },
    { id: 2, query: t('sleep_q2'), options: [t('sleep_q2_o1'), t('sleep_q2_o2'), t('sleep_q2_o3')] }
  ];

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'MORNING' : currentHour < 18 ? 'AFTERNOON' : 'EVENING';

  useEffect(() => {
    localStorage.setItem('sleepAssessmentStep', step);
    localStorage.setItem('protocolReady', protocolReady);
    if (protocolReady) {
      axios.get('http://localhost:3001/sleep-protocols?id=SLP-CORT-094')
        .then(res => setProtocolData(res.data[0]))
        .catch(err => console.error("Error fetching vault data", err));
    }
  }, [protocolReady, step]);

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
      if (!isAlreadyAllocated) addAllocation(protocolData);
      navigate('/checkout');
    }
  };

  const syncHealthData = () => {
    setSyncingHealth(true);
    setTimeout(() => {
      setSyncingHealth(false);
      alert("Health metrics integrated softly. Baselines adjusted.");
    }, 2500); // Slower simulated sync to prevent anxiety-inducing fast loaders
  };

  const adjustTimeline = (index) => {
    const newTimeline = [...protocolData.timeline];
    const [hour, minute] = newTimeline[index].time.split(':');
    const nextHour = (parseInt(hour) + 1) % 24;
    newTimeline[index].time = `${nextHour.toString().padStart(2, '0')}:${minute}`;
    setProtocolData({ ...protocolData, timeline: newTimeline });
  };

  // Ultra-slow, fluid transitions
  const fadeTransition = { duration: 1.5, ease: "easeInOut" };

  return (
    <Box sx={{ minHeight: '100vh', py: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <Box className="breathing-container" sx={{ bgcolor: 'rgba(167, 199, 231, 0.03)', borderRadius: '50px', px: 6, py: 2, mb: 4, border: '1px solid rgba(167, 199, 231, 0.1)' }}>
        <Typography variant="h1" sx={{ color: '#E2E8F0', fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 300 }}>
          REST ARCHITECTURE
        </Typography>
      </Box>
      <Typography variant="overline" sx={{ color: '#8BA4D4', mb: 8, letterSpacing: '0.3em', fontWeight: 300 }}>
        A PEACEFUL {greeting}
      </Typography>

      <Container maxWidth="md">
        <AnimatePresence mode="wait">
          {!protocolReady ? (
            <motion.div key="questionnaire" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={fadeTransition}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                <Typography variant="subtitle1" sx={{ color: '#8BA4D4', letterSpacing: '0.2em' }}>
                  {t('assessment')} {step + 1} / {questions.length}
                </Typography>
                <Button onClick={syncHealthData} disabled={syncingHealth} sx={{ fontSize: '0.7rem', py: 0.5, border: '1px solid rgba(139, 164, 212, 0.2)', color: '#8BA4D4' }}>
                  {syncingHealth ? 'GENTLY SYNCING...' : 'SYNC HEALTH DATA'}
                </Button>
              </Box>
              <Typography variant="h3" sx={{ mb: 8, color: '#E2E8F0', lineHeight: 1.4, fontWeight: 300 }}>
                {questions[step].query}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {questions[step].options.map((opt, idx) => (
                  <Button key={idx} onClick={handleAnswer} sx={{ justifyContent: 'flex-start', py: 3, px: 5, fontSize: '1.1rem', fontWeight: 400, color: '#E2E8F0' }}>
                    {opt}
                  </Button>
                ))}
              </Box>
            </motion.div>
          ) : (
            <motion.div key="protocol" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fadeTransition}>
              <Typography variant="h2" gutterBottom align="center" sx={{ color: '#A7C7E7', mb: 6, fontWeight: 300 }}>
                YOUR SANCTUARY PROTOCOL
              </Typography>
              {protocolData && (
                <Card className="breathing-container">
                  <CardContent sx={{ p: { xs: 4, md: 8 } }}>
                    <Typography variant="overline" sx={{ color: '#8BA4D4', letterSpacing: '0.2em' }}>
                      STATUS: {protocolData.status.toUpperCase()}
                    </Typography>
                    <Typography variant="h3" sx={{ my: 3, color: '#E2E8F0' }}>
                      {protocolData.name}
                    </Typography>
                    
                    <Box sx={{ my: 6, borderLeft: '1px solid rgba(167, 199, 231, 0.3)', pl: 4, py: 2 }}>
                      {protocolData.timeline.map((item, i) => (
                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <Typography variant="body1" sx={{ width: '90px', color: '#A7C7E7', letterSpacing: '0.1em' }}>{item.time}</Typography>
                          <Typography variant="body1" sx={{ flexGrow: 1, color: '#F0F4F8', fontWeight: 300 }}>{item.action}</Typography>
                          <Button size="small" onClick={() => adjustTimeline(i)} sx={{ minWidth: 'auto', p: 0.5, fontSize: '0.7rem', color: '#4A5568', border: 'none', '&:hover': { color: '#E2E8F0', boxShadow: 'none' } }}>
                            SHIFT +1H
                          </Button>
                        </Box>
                      ))}
                    </Box>
                    <Button fullWidth onClick={handleReserve} sx={{ mt: 2, bgcolor: 'rgba(167, 199, 231, 0.1)', color: '#A7C7E7', py: 2 }}>
                      {t('nav_checkout')} ($ {protocolData.price?.toLocaleString()})
                    </Button>
                    <Button fullWidth onClick={() => { setProtocolReady(false); setStep(0); }} sx={{ mt: 3, border: 'none', color: '#4A5568', fontSize: '0.8rem', '&:hover': { boxShadow: 'none', bgcolor: 'transparent', color: '#8BA4D4' } }}>
                      RECALIBRATE ASSESSMENT
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