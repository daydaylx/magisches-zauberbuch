import { validateSceneStructure } from './testAiResponses';
import type { GameScene } from '../types/gameTypes';

export const parseAndValidateAIResponse = (raw: string): GameScene | null => {
  try {
    const parsed = JSON.parse(raw);
    if (validateSceneStructure(parsed)) {
      return parsed;
    } else {
      console.warn('Ungültiger Szenenaufbau');
      return null;
    }
  } catch (e) {
    console.error('Parsing-Fehler bei AI-Response:', e);
    return null;
  }
};
