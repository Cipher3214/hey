import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import slothCar from '@/assets/sloth-car.gif';
import slothHap from '@/assets/sloth-hap.gif';

const favorites = [
  {
    id: 1,
    title: 'Pani Puri',
    emoji: '🥟',
    description: 'The perfect mix of spice, crunch, and flavor! Just like Harshita brings the perfect mix of joy to my life.',
    color: 'from-orange-500 to-yellow-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    id: 2,
    title: 'Chinese Food',
    emoji: '🍜',
    description: 'Noodles, dumplings, and endless deliciousness! Our favorite comfort food together.',
    color: 'from-red-500 to-orange-500',
    bgColor: 'bg-red-500/10',
  },
  {
    id: 3,
    title: 'Cute Dogs',
    emoji: '🐕',
    description: 'Those adorable puppy eyes that melt her heart! Just like she melts mine every single day.',
    color: 'from-amber-500 to-yellow-400',
    bgColor: 'bg-amber-500/10',
  },
  {
    id: 4,
    title: 'Zootopia',
    emoji: '🦊',
    description: 'Judy and Nick forever! Our favorite movie that we can watch a hundred times.',
    color: 'from-green-500 to-blue-500',
    bgColor: 'bg-green-500/10',
  },
];

const HarshitaFavorites = () => {
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
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block mb-4"
          >
            <Heart className="h-16 w-16 text-primary fill-primary" />
          </motion.div>
          <h1 className="font-display text-5xl font-bold text-gold text-shadow-gold md:text-6xl">
            Harshita's Favorites
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            The things that make her smile 💖
          </p>
        </motion.div>

        {/* Favorites Grid */}
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {favorites.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`group relative rounded-3xl border border-border/50 ${item.bgColor} p-8 backdrop-blur-sm overflow-hidden cursor-pointer transition-all duration-500`}
            >
              {/* Gradient Overlay on Hover */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />
              
              {/* Stars Decoration */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                className="absolute -right-4 -top-4 opacity-20"
              >
                <Star className="h-24 w-24 text-gold" />
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <motion.span 
                  className="text-6xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: index * 0.2 }}
                >
                  {item.emoji}
                </motion.span>
                <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Hover Glow */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                background: `linear-gradient(to right, transparent, hsl(var(--gold)), transparent)`
              }} />
            </motion.div>
          ))}
        </div>

        {/* Zootopia Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20"
        >
          <h2 className="font-display text-3xl font-bold text-center text-gold mb-8">
            Bonus: Our Favorite Sloth! 🦥
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-3xl border border-primary/30 bg-card/50 p-4 backdrop-blur-sm"
            >
              <img
                src={slothCar}
                alt="Flash the Sloth"
                className="h-48 w-auto rounded-2xl"
              />
              <p className="mt-3 text-center font-display text-gold">Flash being Flash 🚗</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-3xl border border-primary/30 bg-card/50 p-4 backdrop-blur-sm"
            >
              <img
                src={slothHap}
                alt="Flash saying Hap"
                className="h-48 w-auto rounded-2xl"
              />
              <p className="mt-3 text-center font-display text-gold">"Hap... py..." 😂</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Special Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 text-center"
        >
          <div className="mx-auto max-w-2xl rounded-3xl border border-gold/20 bg-card/50 p-8 backdrop-blur-sm">
            <p className="font-display text-xl text-foreground/90">
              You know what's my favorite thing in the whole world?
            </p>
            <motion.p 
              className="mt-4 font-display text-3xl text-gold text-shadow-gold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              YOU, Harshita! 💝
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HarshitaFavorites;
