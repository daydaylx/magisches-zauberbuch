import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PrivateAdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Admin-Dashboard</Typography>
      <Typography variant="body1" gutterBottom>Was möchtest du tun?</Typography>

      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" onClick={() => navigate('/admin/scenes')}>
          Szenen bearbeiten
        </Button>
        <Button variant="outlined" onClick={() => navigate('/admin/characters')}>
          Charaktere verwalten
        </Button>
        <Button variant="outlined" onClick={() => navigate('/admin/flags')}>
          Spielflags einsehen
        </Button>
      </Box>
    </Box>
  );
};

export default PrivateAdminDashboard;
