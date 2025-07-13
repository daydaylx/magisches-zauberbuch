import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImmersivePlayPage from '../../components/Game/ImmersivePlayPage';

const PlayPage: React.FC = () => {
  const { sessionId } = useParams();

  useEffect(() => {
    if (!sessionId) {
      console.warn('Kein Session-ID übergeben');
    }
  }, [sessionId]);

  return (
    <div>
      <ImmersivePlayPage sessionId={sessionId || ''} />
    </div>
  );
};

export default PlayPage;
