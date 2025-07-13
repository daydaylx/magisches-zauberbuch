import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { getSceneById } from '../../services/sceneService';
import type { Scene } from '../../types/gameTypes';

interface ImmersivePlayPageProps {
  sessionId: string;
}

const ImmersivePlayPage: React.FC<ImmersivePlayPageProps> = ({ sessionId }) => {
  const [scene, setScene] = useState<Scene | null>(null);

  useEffect(() => {
    // Beispielhafter Start mit fester Scene ID – später dynamisch via Session-Logik ersetzen
    const loadInitialScene = async () => {
      const startScene = await getSceneById('intro');
      setScene(startScene);
    };
    loadInitialScene();
  }, []);

  if (!scene) {
    return <Typography>Lade Szene...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h4" gutterBottom>{scene.title}</Typography>
        <Typography>{scene.description}</Typography>
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {scene.choices.map((choice) => (
          <Button key={choice.id} variant="outlined" fullWidth>
            {choice.text}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default ImmersivePlayPage;
