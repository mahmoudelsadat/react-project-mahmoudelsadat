import React, { useState } from 'react';
import { Box, Typography, Button, Container, Card, TextField, Divider } from '@mui/material';
import { auth, googleProvider } from '../../config/firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError("Invalid executive credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      setError("Google Authentication failed.");
    }
  };
  
  const handleMagicLink = () => {
    alert("Magic link sent to " + (email || "your corporate email."));
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="sm">
        <Card sx={{ bgcolor: '#0a0b00', border: '1px solid #D4AF37', p: 6, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ color: '#D4AF37', mb: 1 }}>EXECUTIVE LOGIN</Typography>
          <Typography variant="subtitle2" sx={{ color: '#888', mb: 4, letterSpacing: '0.1em' }}>
            ACCESS YOUR ALLOCATIONS
          </Typography>

          {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

          <form onSubmit={handleEmailLogin}>
            <TextField 
              fullWidth 
              variant="standard" 
              placeholder="Corporate Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 4, input: { color: '#fff', textAlign: 'center', letterSpacing: '0.1em' } }}
            />
            <TextField 
              fullWidth 
              type="password"
              variant="standard" 
              placeholder="Secure Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 5, input: { color: '#fff', textAlign: 'center', letterSpacing: '0.1em' } }}
            />
            <Button type="submit" fullWidth sx={{ bgcolor: '#D4AF37', color: '#060700', py: 1.5, mb: 2, '&:hover': { bgcolor: '#fff' } }}>
              AUTHORIZE ACCESS
            </Button>
            <Button fullWidth onClick={handleMagicLink} sx={{ color: '#888', border: 'none', py: 1, mb: 3, fontSize: '0.8rem' }}>
              REQUEST SECURE MAGIC LINK
            </Button>
          </form>

          <Divider sx={{ bgcolor: '#333', mb: 3 }} />
          <Button fullWidth onClick={handleGoogleLogin} sx={{ color: '#D4AF37', py: 1.5, mb: 3 }}>
            AUTHENTICATE VIA GOOGLE
          </Button>
          <Typography variant="body2" sx={{ color: '#888' }}>
            No profile? <Link to="/register" style={{ color: '#D4AF37', textDecoration: 'none' }}>Initialize an account</Link>.
          </Typography>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;