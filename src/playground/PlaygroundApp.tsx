import React from 'react';
import SceneView from '../components/game/SceneView';
import { ThemeProvider } from '@mui/material/styles';
import immersiveTheme from '../theme/immersiveTheme';

const dummyScene = {
  id: 'sandbox',
  title: 'Sandbox-Szene',
  description: 'Dies ist eine Testszene im Playground.',
  choices: [
    { id: 'a', text: 'Test A', targetSceneId: 'x' },
    { id: 'b', text: 'Test B', targetSceneId: 'y' }
  ]
};

const PlaygroundApp = () => (
  <ThemeProvider theme={immersiveTheme}>
    <SceneView scene={dummyScene} />
  </ThemeProvider>
);

export default PlaygroundApp;
