import { supabase } from './supabaseClient';

export const getGlobalSettings = async (): Promise<Record<string, any>> => {
  const { data, error } = await supabase.from('settings').select('*');
  if (error) throw error;
  const result: Record<string, any> = {};
  data?.forEach((entry: any) => {
    result[entry.key] = entry.value;
  });
  return result;
};
