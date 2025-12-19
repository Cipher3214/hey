import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music, X } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Auto-play attempt on first interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setIsPlaying(true);
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, [hasInteracted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Floating Music Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary glow-crimson transition-all hover:bg-crimson-dark"
      >
        <Music className="h-6 w-6 text-foreground" />
        {isPlaying && (
          <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute inset-0 rounded-full border-2 border-gold opacity-50"
          />
        )}
      </motion.button>

      {/* Music Player Card */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 overflow-hidden rounded-2xl bg-card border border-border shadow-2xl"
          >
            <div className="relative bg-gradient-luxury p-4">
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute right-2 top-2 rounded-full p-1 hover:bg-foreground/10 transition-colors"
              >
                <X className="h-4 w-4 text-foreground" />
              </button>
              <h3 className="font-display text-lg text-foreground">🎵 Our Song</h3>
              <p className="text-sm text-foreground/70">Playing for you, Harshita</p>
            </div>

            <div className="p-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-secondary">
                {isPlaying ? (
                  <iframe
                    ref={iframeRef}
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/gd0twS8xWmY?autoplay=1&loop=1"
                    title="Background Music"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-muted-foreground">Click play to start</p>
                  </div>
                )}
              </div>

              <button
                onClick={togglePlay}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 font-medium text-foreground transition-all hover:bg-crimson-dark"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-5 w-5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    Play Music
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MusicPlayer;
