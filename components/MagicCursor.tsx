import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StarParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  velocity: {
    x: number;
    y: number;
  };
  opacity: number;
}

const MagicCursor: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<StarParticle[]>([]);
  const [isMoving, setIsMoving] = useState(false);
  const particleIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const movementTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      setCursorPosition({ x: newX, y: newY });
      
      const distance = Math.sqrt(
        Math.pow(newX - lastPositionRef.current.x, 2) +
        Math.pow(newY - lastPositionRef.current.y, 2)
      );

      if (distance > 5) {
        setIsMoving(true);
        
        const numParticles = Math.min(Math.floor(distance / 10), 3);
        
        for (let i = 0; i < numParticles; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 2 + 1;
          const offsetX = (Math.random() - 0.5) * 20;
          const offsetY = (Math.random() - 0.5) * 20;
          
          const newParticle: StarParticle = {
            id: particleIdRef.current++,
            x: newX + offsetX,
            y: newY + offsetY,
            size: Math.random() * 8 + 4,
            rotation: Math.random() * 360,
            velocity: {
              x: Math.cos(angle) * speed,
              y: Math.sin(angle) * speed + Math.random() * 2,
            },
            opacity: 1,
          };
          
          setParticles(prev => [...prev, newParticle]);
        }
        
        lastPositionRef.current = { x: newX, y: newY };
      }

      if (movementTimeoutRef.current) {
        clearTimeout(movementTimeoutRef.current);
      }
      
      movementTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (movementTimeoutRef.current) {
        clearTimeout(movementTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.velocity.x,
            y: particle.y + particle.velocity.y,
            velocity: {
              x: particle.velocity.x * 0.98,
              y: particle.velocity.y * 0.98 + 0.1,
            },
            opacity: particle.opacity - 0.02,
            rotation: particle.rotation + 5,
          }))
          .filter(particle => particle.opacity > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (particles.length > 100) {
      setParticles(prev => prev.slice(-100));
    }
  }, [particles.length]);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Magic Wand Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
        }}
        animate={{
          x: -20,
          y: -20,
        }}
      >
        <motion.img
          src="/rabdi.png"
          alt="Magic wand"
          className="w-10 h-10 object-contain"
          animate={{
            rotate: isMoving ? [0, 10, -10, 0] : 0,
            scale: isMoving ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Black Star Particles */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: particle.x,
              top: particle.y,
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: particle.opacity,
              scale: particle.opacity,
              rotate: particle.rotation,
            }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <svg
              width={particle.size}
              height={particle.size}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L14.09 8.26L20 10L14.09 11.74L12 18L9.91 11.74L4 10L9.91 8.26L12 2Z"
                fill="#000000"
                stroke="#000000"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 9L19.5 10.5L21 11L19.5 11.5L19 13L18.5 11.5L17 11L18.5 10.5L19 9Z"
                fill="#000000"
                opacity="0.7"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default MagicCursor;









