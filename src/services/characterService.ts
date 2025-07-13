import { supabase } from './supabaseClient';
import type { Character } from '../types/gameTypes';

export const getCharacters = async (): Promise<Character[]> => {
  const { data, error } = await supabase.from('characters').select('*');
  if (error) throw error;
  return data as Character[];
};

export const getCharacterById = async (id: string): Promise<Character | null> => {
  const { data, error } = await supabase.from('characters').select('*').eq('id', id).single();
  if (error) {
    console.error(error);
    return null;
  }
  return data as Character;
};
