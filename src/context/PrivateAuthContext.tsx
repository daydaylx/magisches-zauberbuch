import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { supabase } from '../services/supabaseClient';

interface PrivateAuthContextProps {
  playerName: string | null;
  setPlayerName: (name: string) => void;
  isLoading: boolean;
}

const PrivateAuthContext = createContext<PrivateAuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedName = localStorage.getItem('zauberbuchPlayerName');
    if (storedName) {
      setPlayerName(storedName);
    }
    setIsLoading(false);
  }, []);

  const updateName = (name: string) => {
    localStorage.setItem('zauberbuchPlayerName', name);
    setPlayerName(name);
  };

  return (
    <PrivateAuthContext.Provider value={{ playerName, setPlayerName: updateName, isLoading }}>
      {children}
    </PrivateAuthContext.Provider>
  );
};

export const usePrivateAuth = (): PrivateAuthContextProps => {
  const ctx = useContext(PrivateAuthContext);
  if (!ctx) throw new Error('usePrivateAuth must be used within AuthProvider');
  return ctx;
};
