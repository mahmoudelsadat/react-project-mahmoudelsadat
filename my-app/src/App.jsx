import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import { luxuryTheme } from './theme/luxuryTheme';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import PrivateRoute from './components/layout/PrivateRoute';
import Navbar from './components/layout/Navbar';
import './config/i18n';

const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const SleepArchitecture = lazy(() => import('./pages/SleepArchitecture/SleepArchitecture'));
const PaymentGateway = lazy(() => import('./pages/Checkout/PaymentGateway'));

const Loader = () => (
  <Box sx={{ height: '100vh', bgcolor: '#060700', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <CircularProgress sx={{ color: '#D4AF37' }} />
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={luxuryTheme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <Router>
            <Navbar />
            
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<SleepArchitecture />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route 
                  path="/checkout" 
                  element={
                    <PrivateRoute>
                      <PaymentGateway />
                    </PrivateRoute>
                  } 
                />
              </Routes>
            </Suspense>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;