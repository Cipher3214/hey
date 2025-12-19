import { useState } from 'react';
import { motion } from 'framer-motion';
import BirthdayCake from '@/components/BirthdayCake';
import zootoopiaCake from '@/assets/zootopia-cake.gif';
import zootoopiaCar from '@/assets/zootopia-car.gif';
import minionsBday from '@/assets/minions-bday.gif';

const HomePage = () => {
  const [showLetter, setShowLetter] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-hero pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', bounce: 0.4 }}
            className="mb-4 font-display text-5xl font-bold text-gold text-shadow-gold md:text-7xl"
          >
            Happy Birthday
          </motion.h1>
          <motion.h2
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring', bounce: 0.4 }}
            className="mb-8 font-display text-4xl font-bold text-primary md:text-6xl"
          >
            Harshita! 🎂
          </motion.h2>
        </motion.div>

        {/* Cake Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="my-12"
        >
          <BirthdayCake />
        </motion.div>

        {/* Zootopia Characters */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 my-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="text-center"
          >
            <img
              src={zootoopiaCake}
              alt="Judy and Nick with birthday cake"
              className="h-40 w-auto rounded-2xl border-4 border-gold/30 shadow-lg md:h-52"
            />
            <p className="mt-2 font-display text-sm text-gold">Nick & Judy wish you!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: 'spring' }}
            className="rounded-2xl border border-primary/30 bg-card/50 p-6 text-center backdrop-blur-sm"
          >
            <p className="font-display text-2xl text-gold md:text-3xl">
              🎈 Happy Birthday Banner 🎈
            </p>
            <p className="mt-2 text-muted-foreground">from your favorite Zootopia crew!</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.5 }}
            className="text-center"
          >
            <img
              src={zootoopiaCar}
              alt="Judy and Nick in car"
              className="h-40 w-auto rounded-2xl border-4 border-gold/30 shadow-lg md:h-52"
            />
            <p className="mt-2 font-display text-sm text-gold">Ready for adventure!</p>
          </motion.div>
        </motion.div>

        {/* Love Letter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <motion.button
            onClick={() => setShowLetter(!showLetter)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-tulip mx-auto flex items-center gap-2"
          >
            <span>💌</span>
            {showLetter ? 'Close Letter' : 'Read My Letter to You'}
          </motion.button>

          {showLetter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 rounded-3xl border border-gold/30 bg-card/80 p-8 backdrop-blur-sm"
            >
              <div className="relative">
                <span className="absolute -left-2 -top-4 font-display text-6xl text-gold/20">"</span>
                <p className="relative z-10 font-display text-lg leading-relaxed text-foreground/90 md:text-xl">
                  To my dearest Harshita,
                </p>
                <p className="mt-4 text-foreground/80 leading-relaxed">
                  Happy Birthday to the girl who turned my world into a garden of tulips. Just like the perfect mix of spice in a plate of Pani Puri, you bring so much flavor and excitement to my life. Whether we are walking side-by-side or just laughing at Zootopia for the hundredth time, every moment with you is my favorite adventure. You are my best friend, my partner in crime, and my greatest blessing. I love you more than words can say.
                </p>
                <p className="mt-6 font-display text-xl text-gold">
                  Forever Yours ❤️
                </p>
                <span className="absolute -bottom-2 -right-2 font-display text-6xl text-gold/20">"</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Minions Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-16 text-center"
        >
          <img
            src={minionsBday}
            alt="Minions Birthday"
            className="mx-auto h-48 w-auto rounded-2xl border-4 border-primary/30"
          />
          <p className="mt-4 text-muted-foreground">The Minions are celebrating too! 🎉</p>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
