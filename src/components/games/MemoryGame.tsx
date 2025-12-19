import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower2, Dog, Rabbit, Cat } from 'lucide-react';
import confetti from 'canvas-confetti';

const icons = [
  { id: 'tulip', icon: Flower2, color: 'text-tulip-pink' },
  { id: 'dog', icon: Dog, color: 'text-amber-400' },
  { id: 'rabbit', icon: Rabbit, color: 'text-gray-300' },
  { id: 'cat', icon: Cat, color: 'text-orange-400' },
  { id: 'tulip2', icon: Flower2, color: 'text-primary' },
  { id: 'dog2', icon: Dog, color: 'text-yellow-500' },
  { id: 'rabbit2', icon: Rabbit, color: 'text-pink-300' },
  { id: 'cat2', icon: Cat, color: 'text-amber-300' },
];

interface Card {
  id: number;
  iconId: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const initializeGame = () => {
    const gameCards: Card[] = [];
    const shuffledIcons = [...icons, ...icons].sort(() => Math.random() - 0.5);
    
    shuffledIcons.forEach((item, index) => {
      gameCards.push({
        id: index,
        iconId: item.id,
        icon: item.icon,
        color: item.color,
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setIsWon(false);
    setIsLocked(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (cardId: number) => {
    if (isLocked) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves(m => m + 1);

      const [first, second] = newFlipped;
      const firstCard = newCards.find(c => c.id === first);
      const secondCard = newCards.find(c => c.id === second);

      if (firstCard && secondCard && firstCard.iconId === secondCard.iconId) {
        // Match found!
        setTimeout(() => {
          const matchedCards = newCards.map(c =>
            c.id === first || c.id === second ? { ...c, isMatched: true } : c
          );
          setCards(matchedCards);
          setFlippedCards([]);
          setIsLocked(false);

          // Check for win
          if (matchedCards.every(c => c.isMatched)) {
            setIsWon(true);
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#DC2626', '#FBBF24', '#F472B6'],
            });
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(newCards.map(c =>
            c.id === first || c.id === second ? { ...c, isFlipped: false } : c
          ));
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="rounded-3xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-xl text-gold">Memory Match</h3>
          <p className="text-sm text-muted-foreground">Moves: {moves}</p>
        </div>
        <button
          onClick={initializeGame}
          className="btn-tulip text-sm px-4 py-2"
        >
          New Game
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`aspect-square rounded-xl border-2 transition-all duration-300 ${
              card.isFlipped || card.isMatched
                ? 'border-gold bg-secondary'
                : 'border-border bg-muted hover:border-primary/50'
            } ${card.isMatched ? 'opacity-60' : ''}`}
          >
            <AnimatePresence mode="wait">
              {(card.isFlipped || card.isMatched) && (
                <motion.div
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 90, opacity: 0 }}
                  className="flex h-full items-center justify-center"
                >
                  <card.icon className={`h-8 w-8 ${card.color}`} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      {/* Win Message */}
      <AnimatePresence>
        {isWon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="font-display text-2xl text-gold text-shadow-gold">
              🎉 You Won, Harshita! 🎉
            </p>
            <p className="mt-2 text-muted-foreground">
              Completed in {moves} moves!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryGame;
