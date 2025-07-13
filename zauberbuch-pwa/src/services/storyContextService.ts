import type { PlayerState } from '../types/gameTypes';

export const buildStoryContext = (
  playerState: PlayerState,
  includeChoices: boolean = true
): string => {
  let context = `🧍 Spielerzustand:\n`;

  for (const [key, value] of Object.entries(playerState.variables || {})) {
    context += `- ${key}: ${value}\n`;
  }

  if (includeChoices && playerState.history?.length) {
    context += `\n📜 Gewählte Entscheidungen:\n`;
    playerState.history.forEach((entry, index) => {
      context += `${index + 1}. ${entry.choiceText}\n`;
    });
  }

  return context.trim();
};
