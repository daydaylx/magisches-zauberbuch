import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper
} from '@mui/material';
import { getSceneById } from '../../../services/sceneService';
import type { Scene } from '../../../types/gameTypes';

const SceneEditorPage: React.FC = () => {
  const { sceneId } = useParams();
  const [scene, setScene] = useState<Scene | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (sceneId) {
      getSceneById(sceneId).then(setScene);
    }
  }, [sceneId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!scene) return;
    setScene({ ...scene, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Hier sollte später ein "updateScene()" Service eingebunden werden
    console.log('Zu speichern:', scene);
    setTimeout(() => setIsSaving(false), 1000);
  };

  if (!scene) return <Typography>Lade Szene...</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Szene bearbeiten</Typography>
      <Paper sx={{ p: 3 }}>
        <TextField
          fullWidth
          label="Titel"
          name="title"
          value={scene.title}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Beschreibung"
          name="description"
          multiline
          rows={6}
          value={scene.description}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Speichere...' : 'Speichern'}
        </Button>
      </Paper>
    </Box>
  );
};

export default SceneEditorPage;
