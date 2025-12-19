import { useEffect, useState } from 'react';

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    size: number;
    delay: number;
    duration: number;
    color: string;
  }>>([]);

  useEffect(() => {
    const colors = [
      'hsl(348, 83%, 47%)', // crimson
      'hsl(45, 93%, 58%)',  // gold
      'hsl(340, 82%, 65%)', // tulip pink
      'hsl(0, 75%, 55%)',   // tulip red
    ];

    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 6 + 2,
      delay: Math.random() * 15,
      duration: Math.random() * 10 + 15,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setParticles(newParticles);
  }, []);

  return (
    <div className="particles-container">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
