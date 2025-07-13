import { supabase } from '../client';
import type { Scene } from '../../types/gameTypes';

interface GenerateSceneParams {
  history: any[];
  config: Record<string, any>;
}

export async function generateScene({ history, config }: GenerateSceneParams): Promise<Scene | null> {
  const { data, error } = await supabase.functions.invoke('generate-scene', {
    body: { history, config }
  });

  if (error) {
    console.error('Fehler bei generateScene:', error.message);
    return null;
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Fehler beim Parsen der Szene:', e);
    return null;
  }
}

export async function summarizeHistory(history: any[]): Promise<string | null> {
  const { data, error } = await supabase.functions.invoke('summarize-history', {
    body: { history }
  });

  if (error) {
    console.error('Fehler bei summarizeHistory:', error.message);
    return null;
  }

  try {
    const parsed = JSON.parse(data);
    return parsed.summary;
  } catch (e) {
    console.error('Fehler beim Parsen der Zusammenfassung:', e);
    return null;
  }
}
