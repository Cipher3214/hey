import { motion } from 'framer-motion';
import { Gamepad2, Sparkles } from 'lucide-react';
import MemoryGame from '@/components/games/MemoryGame';
import BlockGame from '@/components/games/BlockGame';

const GameZone = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block mb-4"
          >
            <Gamepad2 className="h-16 w-16 text-primary" />
          </motion.div>
          <h1 className="font-display text-5xl font-bold text-gold text-shadow-gold md:text-6xl">
            Game Zone
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Play and have fun, birthday girl! 🎮
          </p>
        </motion.div>

        {/* Games Grid */}
        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <MemoryGame />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <BlockGame />
          </motion.div>
        </div>

        {/* Fun Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="mx-auto max-w-2xl rounded-3xl border border-gold/20 bg-card/50 p-8 backdrop-blur-sm">
            <Sparkles className="mx-auto h-10 w-10 text-gold mb-4" />
            <p className="font-display text-xl text-foreground/90">
              Win all the games and you'll get...
            </p>
            <motion.p 
              className="mt-4 font-display text-2xl text-gold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              Extra Birthday Hugs! 🤗💕
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameZone;
