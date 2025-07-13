import React from 'react';
import SceneView from '../components/game/SceneView';
import type { Scene } from '../types/gameTypes';

const exampleScene: Scene = {
  id: 'intro',
  title: 'Ein dunkler Wald',
  description: 'Du stehst vor einem alten Pfad. Zwei Wege führen in die Dunkelheit.',
  choices: [
    { id: '1', text: 'Links gehen', targetSceneId: 'left' },
    { id: '2', text: 'Rechts gehen', targetSceneId: 'right' }
  ]
};

export default {
  title: 'Spiel/SceneView',
  component: SceneView
};

export const BeispielSzene = () => <SceneView scene={exampleScene} />;
