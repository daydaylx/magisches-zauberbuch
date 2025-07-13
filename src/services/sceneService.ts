import { supabase } from './supabaseClient';
import type { Scene } from '../types/gameTypes';

export const getScenes = async (): Promise<Scene[]> => {
  const { data, error } = await supabase.from('scenes').select('*');
  if (error) throw error;
  return data as Scene[];
};

export const getSceneById = async (id: string): Promise<Scene | null> => {
  const { data, error } = await supabase.from('scenes').select('*').eq('id', id).single();
  if (error) {
    console.error(error);
    return null;
  }
  return data as Scene;
};
