import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { luxuryTheme } from './theme/luxuryTheme';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import PrivateRoute from './components/layout/PrivateRoute';
import MainLayout from './components/layout/MainLayout';
import './config/i18n';

const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const SleepArchitecture = lazy(() => import('./pages/SleepArchitecture/SleepArchitecture'));
const PaymentGateway = lazy(() => import('./pages/Checkout/PaymentGateway'));
const PaymentSuccess = lazy(() => import('./pages/Checkout/PaymentSuccess'));
const ExecutiveDashboard = lazy(() => import('./pages/Dashboard/ExecutiveDashboard'));

// Soft, heavenly breathing orb loader
const Loader = () => (
  <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <motion.div
      animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.85, 1.15, 0.85] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(167,199,231,0.9) 0%, rgba(167,199,231,0) 70%)',
        boxShadow: '0 0 40px rgba(167,199,231,0.6)'
      }}
    />
  </Box>
);

const NotFound = () => (
  <Box sx={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
    <Box sx={{ color: '#8BA4D4', fontSize: '3rem', mb: 3 }}>☁️</Box>
    <Box component="h1" sx={{ color: '#E2E8F0', fontFamily: '"Playfair Display", serif', fontWeight: 300 }}>SANCTUARY RESTRICTED</Box>
    <Box component="p" sx={{ color: '#8BA4D4', letterSpacing: '0.1em' }}>This space is currently silent.</Box>
  </Box>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  // We use very long, soft transition durations (1.2s) to enforce a sense of calm
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }}><SleepArchitecture /></motion.div>} />
        <Route path="/login" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }}><Login /></motion.div>} />
        <Route path="/register" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }}><Register /></motion.div>} />
        <Route path="/checkout" element={<PrivateRoute><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }}><PaymentGateway /></motion.div></PrivateRoute>} />
        <Route path="/success" element={<PrivateRoute><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}><PaymentSuccess /></motion.div></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }}><ExecutiveDashboard /></motion.div></PrivateRoute>} />
        <Route path="*" element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }}><NotFound /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider theme={luxuryTheme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <Router>
            <MainLayout>
              <Suspense fallback={<Loader />}>
                <AnimatedRoutes />
              </Suspense>
            </MainLayout>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;