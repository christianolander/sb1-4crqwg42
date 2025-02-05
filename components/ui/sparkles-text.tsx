'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SparklesTextProps {
  text: string;
  colors: {
    first: string;
    second: string;
  };
  className?: string;
}

export function SparklesText({ text, colors, className }: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prev => {
        // Remove old sparkles
        const filtered = prev.filter(sparkle => sparkle.id > Date.now() - 100);
        
        // Add new sparkle
        return [...filtered, {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100
        }];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          style={{
            position: 'absolute',
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            pointerEvents: 'none'
          }}
        >
          ✨
        </motion.div>
      ))}
      <h1 
        className={cn(
          "relative z-10 font-bold",
          className
        )}
        style={{ color: colors.first }}
      >
        {text}
      </h1>
    </div>
  );
}
