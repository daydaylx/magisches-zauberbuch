import type { Scene, Character, Flag } from '../types/gameTypes';

interface ExportData {
  scenes: Scene[];
  characters: Character[];
  flags: Flag[];
}

export const exportGameData = (data: ExportData): string => {
  return JSON.stringify(data, null, 2);
};

export const downloadExport = (filename: string, content: string) => {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
