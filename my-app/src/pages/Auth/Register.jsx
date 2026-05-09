import React, { useState } from 'react';
import { Box, Typography, Button, Container, Card, TextField, Divider } from '@mui/material';
import { auth, googleProvider } from '../../config/firebase';
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError("Registration failed. Ensure password is 6+ characters.");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      setError("Google Authentication failed.");
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="sm">
        <Card sx={{ bgcolor: '#0a0b00', border: '1px solid #D4AF37', p: 6, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ color: '#D4AF37', mb: 1 }}>{t('auth_init_profile')}</Typography>
          <Typography variant="subtitle2" sx={{ color: '#888', mb: 4, letterSpacing: '0.1em' }}>{t('auth_join_eco')}</Typography>

          {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

          <form onSubmit={handleRegister}>
            <TextField 
              fullWidth 
              variant="standard" 
              placeholder={t('auth_email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 4, input: { color: '#fff', textAlign: 'center', letterSpacing: '0.1em' } }}
            />
            <TextField 
              fullWidth 
              type="password"
              variant="standard" 
              placeholder={t('auth_pass_min')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 5, input: { color: '#fff', textAlign: 'center', letterSpacing: '0.1em' } }}
            />
            <Button type="submit" fullWidth sx={{ bgcolor: '#D4AF37', color: '#060700', py: 1.5, mb: 3, '&:hover': { bgcolor: '#fff' } }}>
              {t('auth_btn_create')}
            </Button>
          </form>

          <Divider sx={{ bgcolor: '#333', mb: 3 }} />
          <Button fullWidth onClick={handleGoogleRegister} sx={{ color: '#D4AF37', py: 1.5, mb: 3 }}>
            {t('auth_btn_google_reg')}
          </Button>
          <Typography variant="body2" sx={{ color: '#888' }}>
            {t('auth_existing')} <Link to="/login" style={{ color: '#D4AF37', textDecoration: 'none' }}>{t('auth_access_portal')}</Link>
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;