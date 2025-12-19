import { motion } from 'framer-motion';
import { Flower2, Heart } from 'lucide-react';

const OurGarden = () => {
  // Generate tulip positions
  const tulips = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 90 + 5,
    delay: Math.random() * 2,
    scale: Math.random() * 0.4 + 0.8,
    color: ['#DC2626', '#F472B6', '#FBBF24', '#FB7185'][Math.floor(Math.random() * 4)],
  }));

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 relative overflow-hidden">
      {/* Garden Background Gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(180deg, hsl(120, 40%, 15%) 0%, hsl(0, 0%, 4%) 100%)',
        }}
      />

      {/* Animated Tulips Background */}
      <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden">
        {tulips.map((tulip) => (
          <motion.div
            key={tulip.id}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: tulip.delay, duration: 0.8 }}
            className="absolute"
            style={{ left: `${tulip.x}%`, bottom: 0 }}
          >
            <motion.div
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 3 + tulip.delay, ease: 'easeInOut' }}
              style={{ transform: `scale(${tulip.scale})` }}
            >
              <svg width="40" height="80" viewBox="0 0 40 80">
                {/* Stem */}
                <path
                  d="M20 80 Q18 50 20 30"
                  stroke="#22C55E"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Leaf */}
                <path
                  d="M20 60 Q30 55 35 65 Q25 60 20 60"
                  fill="#16A34A"
                />
                {/* Tulip Petals */}
                <ellipse cx="12" cy="20" rx="8" ry="18" fill={tulip.color} />
                <ellipse cx="28" cy="20" rx="8" ry="18" fill={tulip.color} />
                <ellipse cx="20" cy="15" rx="10" ry="20" fill={tulip.color} />
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="inline-block mb-4"
          >
            <Flower2 className="h-16 w-16 text-tulip-pink" />
          </motion.div>
          <h1 className="font-display text-5xl font-bold text-gold text-shadow-gold md:text-6xl">
            Our Tulip Garden
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A beautiful place where our love blooms 🌷
          </p>
        </motion.div>

        {/* Walking Couple Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative mx-auto max-w-4xl h-80 rounded-3xl border border-border/30 bg-gradient-to-b from-secondary/30 to-transparent backdrop-blur-sm overflow-hidden"
        >
          {/* Path */}
          <svg className="absolute bottom-0 left-0 right-0 h-20 opacity-30">
            <path
              d="M0 60 Q250 30 500 60 Q750 90 1000 60"
              stroke="hsl(var(--gold))"
              strokeWidth="4"
              fill="none"
              strokeDasharray="10 5"
            />
          </svg>

          {/* Animated Couple */}
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: '100vw' }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute bottom-16 flex items-end gap-1"
          >
            {/* Boy Figure */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="relative"
            >
              <svg width="50" height="100" viewBox="0 0 50 100">
                {/* Head */}
                <circle cx="25" cy="15" r="12" fill="#FBBF24" />
                {/* Hair */}
                <ellipse cx="25" cy="8" rx="10" ry="5" fill="#451A03" />
                {/* Body */}
                <rect x="15" y="28" width="20" height="35" rx="5" fill="#1E40AF" />
                {/* Arms */}
                <rect x="5" y="30" width="10" height="25" rx="3" fill="#1E40AF" />
                <rect x="35" y="30" width="10" height="25" rx="3" fill="#1E40AF" />
                {/* Legs */}
                <motion.rect
                  x="15"
                  y="63"
                  width="8"
                  height="30"
                  rx="3"
                  fill="#374151"
                  animate={{ rotate: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  style={{ transformOrigin: '19px 63px' }}
                />
                <motion.rect
                  x="27"
                  y="63"
                  width="8"
                  height="30"
                  rx="3"
                  fill="#374151"
                  animate={{ rotate: [10, -10, 10] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  style={{ transformOrigin: '31px 63px' }}
                />
                {/* Face */}
                <circle cx="21" cy="14" r="2" fill="#451A03" />
                <circle cx="29" cy="14" r="2" fill="#451A03" />
                <path d="M22 20 Q25 23 28 20" stroke="#451A03" strokeWidth="1.5" fill="none" />
              </svg>
            </motion.div>

            {/* Girl Figure */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, delay: 0.25 }}
              className="relative"
            >
              <svg width="50" height="100" viewBox="0 0 50 100">
                {/* Head */}
                <circle cx="25" cy="15" r="12" fill="#FBBF24" />
                {/* Hair */}
                <ellipse cx="25" cy="10" rx="14" ry="10" fill="#451A03" />
                <ellipse cx="15" cy="20" rx="4" ry="15" fill="#451A03" />
                <ellipse cx="35" cy="20" rx="4" ry="15" fill="#451A03" />
                {/* Dress */}
                <path d="M15 28 L10 75 L40 75 L35 28 Z" fill="#DC2626" />
                {/* Arms */}
                <rect x="5" y="30" width="8" height="20" rx="3" fill="#FBBF24" />
                <rect x="37" y="30" width="8" height="20" rx="3" fill="#FBBF24" />
                {/* Legs */}
                <motion.rect
                  x="17"
                  y="70"
                  width="6"
                  height="25"
                  rx="3"
                  fill="#FBBF24"
                  animate={{ rotate: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  style={{ transformOrigin: '20px 70px' }}
                />
                <motion.rect
                  x="27"
                  y="70"
                  width="6"
                  height="25"
                  rx="3"
                  fill="#FBBF24"
                  animate={{ rotate: [8, -8, 8] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  style={{ transformOrigin: '30px 70px' }}
                />
                {/* Face */}
                <circle cx="21" cy="14" r="2" fill="#451A03" />
                <circle cx="29" cy="14" r="2" fill="#451A03" />
                <path d="M22 20 Q25 23 28 20" stroke="#DC2626" strokeWidth="2" fill="none" />
              </svg>
            </motion.div>

            {/* Holding Hands Heart */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2"
            >
              <Heart className="h-6 w-6 text-primary fill-primary" />
            </motion.div>
          </motion.div>

          {/* Garden Text */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
            <p className="font-display text-2xl text-gold">Walking Together</p>
            <p className="text-sm text-muted-foreground">Through our beautiful tulip garden</p>
          </div>
        </motion.div>

        {/* Love Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="mx-auto max-w-2xl rounded-3xl border border-gold/20 bg-card/50 p-8 backdrop-blur-sm">
            <Flower2 className="mx-auto h-10 w-10 text-tulip-pink mb-4" />
            <p className="font-display text-xl text-foreground/90 italic">
              "Like tulips in spring, our love blooms more beautiful with each passing day"
            </p>
            <p className="mt-4 text-gold">— For Harshita, with all my love 🌷</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OurGarden;
