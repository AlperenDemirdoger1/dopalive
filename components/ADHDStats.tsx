'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ADHDStatsProps {
  position: 'left' | 'right';
}

const leftStats = [
  { value: '6.1M', label: 'Tanılı çocuk', sublabel: 'sadece ABD' },
  { value: '75%', label: 'Destek almıyor', sublabel: 'tedavisiz' },
  { value: '3x', label: 'Okul terki', sublabel: 'daha fazla' },
];

const rightStats = [
  { value: '60%', label: 'Eşlik eden', sublabel: 'anksiyete' },
  { value: '2.5x', label: 'İş kaybı', sublabel: 'verimlilik' },
  { value: '4.4%', label: 'Yetişkin', sublabel: 'prevalans' },
];

const ADHDStats = ({ position }: ADHDStatsProps) => {
  const stats = position === 'left' ? leftStats : rightStats;
  const baseDelay = position === 'left' ? 0.4 : 0.5;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: baseDelay }}
      className={cn(
        "fixed top-1/2 -translate-y-1/2 z-20",
        "flex-col gap-3",
        "hidden lg:flex",
        position === 'left' ? 'left-4 xl:left-8' : 'right-4 xl:right-8'
      )}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: position === 'left' ? -15 : 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: baseDelay + index * 0.08,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={position === 'left' ? 'text-left' : 'text-right'}
        >
          <div className={cn(
            "rounded-lg p-2.5 xl:p-3",
            "bg-white/[0.015] border border-white/[0.03]",
            "min-w-[80px] xl:min-w-[90px]"
          )}>
            <div className="text-gradient text-lg xl:text-xl font-light tracking-tight">
              {stat.value}
            </div>
            <div className="text-white/30 text-[9px] xl:text-[10px] font-light mt-0.5">
              {stat.label}
            </div>
            <div className="text-white/15 text-[8px] font-light">
              {stat.sublabel}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ADHDStats;

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ADHDStatsProps {
  position: 'left' | 'right';
}

const leftStats = [
  { value: '6.1M', label: 'Tanılı çocuk', sublabel: 'sadece ABD' },
  { value: '75%', label: 'Destek almıyor', sublabel: 'tedavisiz' },
  { value: '3x', label: 'Okul terki', sublabel: 'daha fazla' },
];

const rightStats = [
  { value: '60%', label: 'Eşlik eden', sublabel: 'anksiyete' },
  { value: '2.5x', label: 'İş kaybı', sublabel: 'verimlilik' },
  { value: '4.4%', label: 'Yetişkin', sublabel: 'prevalans' },
];

const ADHDStats = ({ position }: ADHDStatsProps) => {
  const stats = position === 'left' ? leftStats : rightStats;
  const baseDelay = position === 'left' ? 0.4 : 0.5;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: baseDelay }}
      className={cn(
        "fixed top-1/2 -translate-y-1/2 z-20",
        "flex-col gap-3",
        "hidden lg:flex",
        position === 'left' ? 'left-4 xl:left-8' : 'right-4 xl:right-8'
      )}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: position === 'left' ? -15 : 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: baseDelay + index * 0.08,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={position === 'left' ? 'text-left' : 'text-right'}
        >
          <div className={cn(
            "rounded-lg p-2.5 xl:p-3",
            "bg-white/[0.015] border border-white/[0.03]",
            "min-w-[80px] xl:min-w-[90px]"
          )}>
            <div className="text-gradient text-lg xl:text-xl font-light tracking-tight">
              {stat.value}
            </div>
            <div className="text-white/30 text-[9px] xl:text-[10px] font-light mt-0.5">
              {stat.label}
            </div>
            <div className="text-white/15 text-[8px] font-light">
              {stat.sublabel}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

