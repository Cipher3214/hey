import { useState } from 'react';
import CountdownSequence from '@/components/CountdownSequence';
import FloatingParticles from '@/components/FloatingParticles';
import MusicPlayer from '@/components/MusicPlayer';
import Navigation from '@/components/Navigation';
import HomePage from '@/pages/HomePage';

const Index = () => {
  const [showCountdown, setShowCountdown] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <>
      {showCountdown && (
        <CountdownSequence onComplete={handleCountdownComplete} />
      )}
      
      {showContent && (
        <>
          <FloatingParticles />
          <Navigation />
          <MusicPlayer />
          <HomePage />
        </>
      )}
    </>
  );
};

export default Index;
