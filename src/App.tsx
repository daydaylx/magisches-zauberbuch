import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { usePrivateAuth } from './context/PrivateAuthContext';

// Lazy Load Pages
const PrivateLandingPage = React.lazy(() => import('./pages/PrivateLandingPage'));
const PrivateAdminDashboard = React.lazy(() => import('./pages/admin/PrivateAdminDashboard'));
const PrivateGameInterface = React.lazy(() => import('./components/Game/PrivateGameInterface'));

const LoadingFallback: React.FC = () => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }}>
    <CircularProgress sx={{ color: 'white', mb: 2 }} />
    <Typography sx={{ color: 'white' }}>Lade...</Typography>
  </Box>
);

function App() {
  const { isLoading } = usePrivateAuth();

  if (isLoading) {
    return <LoadingFallback />;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<PrivateLandingPage />} />
        <Route path="/admin" element={<PrivateAdminDashboard />} />
        <Route path="/play/session/:sessionId" element={<PrivateGameInterface />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
