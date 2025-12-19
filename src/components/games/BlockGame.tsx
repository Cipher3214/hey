import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const GRID_WIDTH = 10;
const GRID_HEIGHT = 15;
const INITIAL_SPEED = 800;

interface Block {
  x: number;
  y: number;
  width: number;
  color: string;
}

const colors = [
  'hsl(348, 83%, 47%)', // crimson
  'hsl(45, 93%, 58%)',  // gold
  'hsl(340, 82%, 65%)', // tulip pink
  'hsl(0, 75%, 55%)',   // tulip red
  'hsl(280, 70%, 50%)', // purple
];

const BlockGame = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [currentBlock, setCurrentBlock] = useState<Block | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState(1);

  const createNewBlock = useCallback((prevBlock?: Block) => {
    const width = prevBlock 
      ? Math.max(1, prevBlock.width - Math.floor(Math.random() * 2))
      : 4;
    
    return {
      x: 0,
      y: prevBlock ? prevBlock.y - 1 : GRID_HEIGHT - 1,
      width,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  }, []);

  const startGame = () => {
    setBlocks([]);
    setCurrentBlock(createNewBlock());
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setDirection(1);
  };

  // Move block horizontally
  useEffect(() => {
    if (!isPlaying || !currentBlock || gameOver) return;

    const speed = Math.max(200, INITIAL_SPEED - score * 20);
    const interval = setInterval(() => {
      setCurrentBlock(prev => {
        if (!prev) return prev;
        
        let newX = prev.x + direction;
        let newDirection = direction;

        if (newX + prev.width > GRID_WIDTH) {
          newX = GRID_WIDTH - prev.width;
          newDirection = -1;
        } else if (newX < 0) {
          newX = 0;
          newDirection = 1;
        }

        setDirection(newDirection);
        return { ...prev, x: newX };
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, currentBlock, direction, gameOver, score]);

  const dropBlock = useCallback(() => {
    if (!currentBlock || gameOver) return;

    const lastBlock = blocks[blocks.length - 1];
    
    if (blocks.length === 0) {
      // First block - always lands
      setBlocks([currentBlock]);
      setScore(s => s + 1);
      setCurrentBlock(createNewBlock(currentBlock));
    } else if (lastBlock) {
      // Check overlap
      const overlapStart = Math.max(currentBlock.x, lastBlock.x);
      const overlapEnd = Math.min(
        currentBlock.x + currentBlock.width,
        lastBlock.x + lastBlock.width
      );
      const overlap = overlapEnd - overlapStart;

      if (overlap <= 0) {
        // Game over - no overlap
        setGameOver(true);
        setIsPlaying(false);
      } else {
        // Successful stack
        const newBlock = {
          ...currentBlock,
          x: overlapStart,
          width: overlap,
        };
        
        setBlocks(prev => [...prev, newBlock]);
        setScore(s => s + 1);

        if (score >= 14) {
          // Win condition
          setGameOver(true);
          setIsPlaying(false);
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#DC2626', '#FBBF24', '#F472B6'],
          });
        } else {
          setCurrentBlock(createNewBlock(newBlock));
        }
      }
    }
  }, [currentBlock, blocks, gameOver, score, createNewBlock]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && isPlaying) {
        e.preventDefault();
        dropBlock();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, dropBlock]);

  return (
    <div className="rounded-3xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-xl text-gold">Stack Tower</h3>
          <p className="text-sm text-muted-foreground">Score: {score}</p>
        </div>
        <button
          onClick={startGame}
          className="btn-tulip text-sm px-4 py-2"
        >
          {isPlaying ? 'Restart' : 'Start Game'}
        </button>
      </div>

      {/* Game Grid */}
      <div 
        className="relative mx-auto rounded-lg border border-border bg-background/50 overflow-hidden"
        style={{ 
          width: GRID_WIDTH * 28 + 4,
          height: GRID_HEIGHT * 28 + 4,
        }}
        onClick={() => isPlaying && dropBlock()}
      >
        {/* Placed Blocks */}
        {blocks.map((block, index) => (
          <motion.div
            key={index}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute rounded"
            style={{
              left: block.x * 28 + 2,
              bottom: (GRID_HEIGHT - 1 - block.y) * 28 + 2,
              width: block.width * 28,
              height: 26,
              backgroundColor: block.color,
              boxShadow: `0 0 10px ${block.color}`,
            }}
          />
        ))}

        {/* Current Block */}
        {currentBlock && !gameOver && (
          <motion.div
            className="absolute rounded"
            style={{
              left: currentBlock.x * 28 + 2,
              bottom: (GRID_HEIGHT - 1 - currentBlock.y) * 28 + 2,
              width: currentBlock.width * 28,
              height: 26,
              backgroundColor: currentBlock.color,
              boxShadow: `0 0 15px ${currentBlock.color}`,
            }}
          />
        )}

        {/* Instructions Overlay */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="text-center p-4">
              <p className="font-display text-lg text-gold">Stack Tower</p>
              <p className="text-sm text-muted-foreground mt-2">
                Click or press Space to drop blocks!
              </p>
            </div>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90">
            <div className="text-center p-4">
              {score >= 15 ? (
                <>
                  <p className="font-display text-2xl text-gold text-shadow-gold">
                    🎉 Amazing, Harshita! 🎉
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    You're a champion!
                  </p>
                </>
              ) : (
                <>
                  <p className="font-display text-xl text-primary">Game Over</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Score: {score}
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4">
        {isPlaying ? 'Tap or press Space to drop!' : 'Press Start to play'}
      </p>
    </div>
  );
};

export default BlockGame;
