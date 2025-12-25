'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * TypingIndicator Component
 * 
 * ADHD-friendly "thinking" animation with breathing dots.
 * Uses calming animation that doesn't cause anxiety.
 */
interface TypingIndicatorProps {
  className?: string;
  label?: string;
}

export function TypingIndicator({ 
  className,
  label = 'Dopa düşünüyor...' 
}: TypingIndicatorProps) {
  return (
    <div 
      className={cn(
        "flex items-center gap-3 px-4 py-3",
        className
      )}
      role="status"
      aria-label={label}
    >
      {/* Avatar placeholder */}
      <div className="w-8 h-8 rounded-full bg-gradient-warm flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs font-bold">D</span>
      </div>
      
      {/* Breathing dots */}
      <div className="flex items-center gap-1.5 bg-muted/50 rounded-2xl px-4 py-2.5">
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="w-2 h-2 rounded-full bg-primary/60"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
        <span className="sr-only">{label}</span>
      </div>
    </div>
  );
}

