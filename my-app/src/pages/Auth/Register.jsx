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
      navigate('/');
    } catch (err) {
      setError("Registration failed. Ensure password is 6+ characters.");
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err) {
      setError("Google Authentication failed.");
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="sm">
        <Card sx={{ bgcolor: '#0a0b00', border: '1px solid #D4AF37', p: 6, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ color: '#D4AF37', mb: 1 }}>
            {t('auth_init_profile')}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: '#888', mb: 4, letterSpacing: '0.1em' }}>
            {t('auth_join_eco')}
          </Typography>

          {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

          <form onSubmit={handleRegister}>
            <TextField 
              fullWidth 
              variant="outlined" 
              placeholder={t('auth_email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3, input: { color: '#fff' }, fieldset: { borderColor: '#333' } }}
            />
            <TextField 
              fullWidth 
              type="password"
              variant="outlined" 
              placeholder={t('auth_pass_min')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 4, input: { color: '#fff' }, fieldset: { borderColor: '#333' } }}
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