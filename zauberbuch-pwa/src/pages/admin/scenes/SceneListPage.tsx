import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItemButton, ListItemText } from '@mui/material';
import { getScenes } from '../../../services/sceneService';
import type { Scene } from '../../../types/gameTypes';
import { useNavigate } from 'react-router-dom';

const SceneListPage: React.FC = () => {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScenes = async () => {
      const data = await getScenes();
      setScenes(data);
    };
    fetchScenes();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Szenenliste</Typography>
      <List>
        {scenes.map(scene => (
          <ListItemButton
            key={scene.id}
            onClick={() => navigate(`/admin/scenes/${scene.id}`)}
          >
            <ListItemText
              primary={scene.title}
              secondary={scene.id}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default SceneListPage;
