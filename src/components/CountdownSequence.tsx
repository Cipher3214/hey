import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface CountdownSequenceProps {
  onComplete: () => void;
}

const CountdownSequence = ({ onComplete }: CountdownSequenceProps) => {
  const [count, setCount] = useState(5);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else if (count === 0) {
      // Trigger confetti explosion
      const duration = 4000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          setShowText(false);
          setTimeout(onComplete, 500);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#DC2626', '#F59E0B', '#FBBF24', '#FDE68A', '#ffffff'],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#DC2626', '#F59E0B', '#FBBF24', '#FDE68A', '#ffffff'],
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [count, onComplete]);

  return (
    <AnimatePresence>
      {showText && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-xl font-display text-muted-foreground md:text-2xl"
          >
            Something special is loading...
          </motion.p>
          
          <motion.div
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {count > 0 ? (
              <span className="font-display text-8xl font-bold text-gold text-shadow-gold md:text-9xl">
                {count}
              </span>
            ) : (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="font-display text-6xl font-bold text-primary text-shadow-crimson md:text-8xl"
              >
                🎉
              </motion.span>
            )}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg text-foreground/70"
          >
            {count > 0 ? `Blow in ${count}...` : 'Happy Birthday!'}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CountdownSequence;
