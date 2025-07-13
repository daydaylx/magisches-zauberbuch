import { supabase } from './supabaseClient';
import type { Flag } from '../types/gameTypes';

export const getAllFlags = async (): Promise<Flag[]> => {
  const { data, error } = await supabase.from('flags').select('*');
  if (error) throw error;
  return data as Flag[];
};

export const updateFlagValue = async (flagId: string, newValue: boolean) => {
  const { error } = await supabase
    .from('flags')
    .update({ value: newValue })
    .eq('id', flagId);
  if (error) throw error;
};
