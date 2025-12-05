'use client';

import * as React from "react";
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  /** The numeric value to display */
  value: number;
  /** Suffix to append (e.g., "%", "K", "+") */
  suffix?: string;
  /** Prefix to prepend (e.g., "$", "#") */
  prefix?: string;
  /** Main label describing the stat */
  label: string;
  /** Optional secondary label */
  sublabel?: string;
  /** Optional icon */
  icon?: LucideIcon;
  /** Animation duration in seconds */
  duration?: number;
  /** Animation delay in seconds */
  delay?: number;
  /** Visual variant */
  variant?: 'default' | 'highlight' | 'success' | 'coral';
  /** Enable count-up animation */
  animated?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * StatCard Component
 *
 * Displays a statistic with optional animated count-up effect.
 *
 * @example
 * ```tsx
 * <StatCard
 *   value={87}
 *   suffix="%"
 *   label="Completion Rate"
 *   sublabel="of users finish their projects"
 *   variant="highlight"
 *   animated
 * />
 * ```
 */
const StatCard = ({
  value,
  suffix = '',
  prefix = '',
  label,
  sublabel,
  icon: Icon,
  duration = 2,
  delay = 0,
  variant = 'default',
  animated = true,
  className,
}: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!animated || !isInView) return;

    const startTime = Date.now();
    const startDelay = delay * 1000;

    const timer = setTimeout(() => {
      const animate = () => {
        const elapsed = Date.now() - startTime - startDelay;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        
        // Easing function for smooth animation
        const easeOutExpo = 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(easeOutExpo * value);
        
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };

      requestAnimationFrame(animate);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [isInView, value, duration, delay, animated]);

  const variantStyles = {
    default: {
      container: 'bg-white/[0.02] border-white/[0.06]',
      value: 'text-white',
      icon: 'bg-white/[0.03] text-white/40',
    },
    highlight: {
      container: 'bg-[#f5d4a0]/[0.04] border-[#f5d4a0]/[0.12]',
      value: 'text-[#f5d4a0]',
      icon: 'bg-[#f5d4a0]/10 text-[#f5d4a0]/70',
    },
    success: {
      container: 'bg-emerald-500/[0.04] border-emerald-500/[0.12]',
      value: 'text-emerald-400',
      icon: 'bg-emerald-500/10 text-emerald-400/70',
    },
    coral: {
      container: 'bg-[#FF6B6B]/[0.04] border-[#FF6B6B]/[0.12]',
      value: 'text-gradient',
      icon: 'bg-[#FF6B6B]/10 text-[#FF6B6B]/70',
    },
  };

  const styles = variantStyles[variant];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'relative rounded-2xl border p-6',
        'transition-all duration-300',
        'hover:scale-[1.02] hover:border-white/10',
        styles.container,
        className
      )}
    >
      {/* Glow effect for highlight variant */}
      {variant === 'highlight' && (
        <div className="absolute inset-0 -z-10 rounded-2xl bg-[#f5d4a0]/5 blur-xl" />
      )}

      <div className="flex items-start justify-between">
        <div>
          <div className={cn(
            'text-4xl md:text-5xl font-light tracking-tight mb-2',
            styles.value
          )}>
            {prefix}
            {displayValue.toLocaleString()}
            {suffix}
          </div>
          <div className="text-white/60 text-sm font-medium mb-1">{label}</div>
          {sublabel && (
            <div className="text-white/30 text-xs font-light">{sublabel}</div>
          )}
        </div>
        
        {Icon && (
          <div className={cn('p-3 rounded-xl', styles.icon)}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

/**
 * StatCardSimple
 * A minimal stat display without card styling
 */
interface StatCardSimpleProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  animated?: boolean;
  className?: string;
}

const StatCardSimple = ({
  value,
  suffix = '',
  prefix = '',
  label,
  animated = true,
  className,
}: StatCardSimpleProps) => {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!animated || !isInView) return;

    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      
      setDisplayValue(Math.floor(easeOutExpo * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, animated]);

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-white/50">{label}</div>
    </div>
  );
};

/**
 * StatsRow
 * A horizontal row of stats for hero sections
 */
interface StatsRowProps {
  stats: Omit<StatCardSimpleProps, "animated">[];
  animated?: boolean;
  className?: string;
}

const StatsRow = ({ stats, animated = true, className }: StatsRowProps) => {
  return (
    <div className={cn(
      "flex flex-wrap items-center justify-center gap-8 md:gap-12",
      className
    )}>
      {stats.map((stat, index) => (
        <React.Fragment key={stat.label}>
          {index > 0 && (
            <div className="hidden md:block w-px h-12 bg-white/10" />
          )}
          <StatCardSimple {...stat} animated={animated} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default StatCard;
export { StatCard, StatCardSimple, StatsRow };
