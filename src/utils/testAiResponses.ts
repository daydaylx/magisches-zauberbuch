import type { GameScene } from '../types/gameTypes';

export const validateSceneStructure = (scene: any): scene is GameScene => {
  return scene &&
    typeof scene.title === 'string' &&
    typeof scene.description === 'string' &&
    Array.isArray(scene.choices);
};

export const simulateAiSceneGeneration = (): GameScene => ({
  id: 'test',
  title: 'Testszene',
  description: 'Dies ist eine automatisch generierte Testsituation.',
  choices: [
    { id: 'a', text: 'Weg A wählen', targetSceneId: 'x' },
    { id: 'b', text: 'Weg B einschlagen', targetSceneId: 'y' }
  ]
});
