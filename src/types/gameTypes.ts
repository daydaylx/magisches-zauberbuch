export interface Flag {
  id: string;
  key: string;
  value: boolean;
}

export interface Scene {
  id: string;
  title: string;
  description: string;
  image?: string;
  choices: Choice[];
  conditions?: string[];
}

export interface Choice {
  id: string;
  text: string;
  targetSceneId: string;
  requirements?: string[];
  effects?: Record<string, any>;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  image?: string;
  traits?: string[];
}

export interface PlayerState {
  variables: Record<string, any>;
  histo

cat <<'EOF' > zauberbuch-pwa/src/types/authTypes.ts
export interface SessionUser {
  id: string;
  name: string;
  created_at: string;
}
