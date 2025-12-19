import { motion } from 'framer-motion';

const BirthdayCake = () => {
  return (
    <motion.div
      initial={{ scale: 0, rotateY: -180 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ type: 'spring', duration: 1.5, bounce: 0.4 }}
      className="relative mx-auto"
    >
      {/* 3D Cake Container */}
      <div className="relative" style={{ perspective: '1000px' }}>
        <motion.div
          animate={{ rotateY: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="relative"
        >
          {/* Cake SVG */}
          <svg
            viewBox="0 0 200 200"
            className="h-64 w-64 drop-shadow-2xl md:h-80 md:w-80"
          >
            {/* Cake Plate */}
            <ellipse cx="100" cy="180" rx="90" ry="15" fill="#8B4513" opacity="0.8" />
            
            {/* Bottom Layer */}
            <rect x="30" y="130" width="140" height="50" rx="5" fill="#DC2626" />
            <rect x="30" y="130" width="140" height="10" fill="#B91C1C" />
            
            {/* Middle Layer */}
            <rect x="45" y="90" width="110" height="45" rx="5" fill="#EF4444" />
            <rect x="45" y="90" width="110" height="8" fill="#DC2626" />
            
            {/* Top Layer */}
            <rect x="60" y="55" width="80" height="40" rx="5" fill="#F87171" />
            <rect x="60" y="55" width="80" height="6" fill="#EF4444" />
            
            {/* Frosting Drips */}
            <path d="M30 130 Q35 145 40 130 Q50 150 55 130 Q65 148 70 130" fill="#FDE68A" />
            <path d="M130 130 Q135 145 140 130 Q150 150 155 130 Q165 148 170 130" fill="#FDE68A" />
            
            {/* Gold Decorations */}
            <circle cx="50" cy="150" r="4" fill="#FBBF24" />
            <circle cx="100" cy="155" r="4" fill="#FBBF24" />
            <circle cx="150" cy="150" r="4" fill="#FBBF24" />
            
            {/* Candles */}
            {[70, 100, 130].map((x, i) => (
              <g key={i}>
                {/* Candle Body */}
                <rect x={x - 4} y="25" width="8" height="32" fill="#FBBF24" rx="2" />
                {/* Flame */}
                <motion.ellipse
                  cx={x}
                  cy="18"
                  rx="6"
                  ry="10"
                  fill="#FCD34D"
                  animate={{ 
                    scaleY: [1, 1.2, 1],
                    scaleX: [1, 0.9, 1],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 0.5,
                    delay: i * 0.1,
                  }}
                />
                <motion.ellipse
                  cx={x}
                  cy="18"
                  rx="3"
                  ry="6"
                  fill="#FEF3C7"
                  animate={{ 
                    scaleY: [1, 1.3, 1],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 0.4,
                    delay: i * 0.15,
                  }}
                />
              </g>
            ))}
            
            {/* Hearts on Cake */}
            <text x="100" y="115" textAnchor="middle" fontSize="20">💕</text>
          </svg>

          {/* Glow Effect */}
          <div className="absolute inset-0 animate-pulse-glow rounded-full opacity-30" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BirthdayCake;
