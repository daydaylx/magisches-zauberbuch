import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import type { GameScene, PlayerState } from '../types/gameTypes';

interface LocalSession {
  sessionId: string;
  currentScene: GameScene;
  currentFullChoices: any[];
  playerState: PlayerState;
  timestamp: number;
}

interface OfflineContextProps {
  isOffline: boolean;
  localSession: LocalSession | null;
  saveCurrentSessionLocal: (data: LocalSession) => void;
}

const STORAGE_KEY = 'zauberbuchLocalSession';

const OfflineContext = createContext<OfflineContextProps | undefined>(undefined);

export const OfflineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [localSession, setLocalSession] = useState<LocalSession | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setLocalSession(JSON.parse(saved));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const saveCurrentSessionLocal = (data: LocalSession) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setLocalSession(data);
  };

  return (
    <OfflineContext.Provider
      value={{ isOffline, localSession, saveCurrentSessionLocal }}
    >
      {children}
    </OfflineContext.Provider>
  );
};

export const useOffline = (): OfflineContextProps => {
  const ctx = useContext(OfflineContext);
  if (!ctx) throw new Error('useOffline must be used within OfflineProvider');
  return ctx;
};
