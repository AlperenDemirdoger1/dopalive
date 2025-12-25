'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PomodoroData } from '@/lib/chat/types';
import { formatTime } from '@/lib/chat/utils';
import { Play, Pause, RotateCcw, Coffee, Check } from 'lucide-react';
import { rewardPop } from '@/lib/motion';

/**
 * PomodoroCard Component
 * 
 * ADHD-friendly Pomodoro timer:
 * - Large, clear countdown display
 * - Satisfying completion animation
 * - Break reminders
 * - Single-tap controls
 */
interface PomodoroCardProps {
  data: PomodoroData;
  onAction?: (action: string, data: unknown) => void;
}

export function PomodoroCard({ data, onAction }: PomodoroCardProps) {
  const [status, setStatus] = React.useState<PomodoroData['status']>(data.status);
  const [remainingSeconds, setRemainingSeconds] = React.useState(
    data.remainingSeconds ?? data.duration * 60
  );
  const [isBreak, setIsBreak] = React.useState(false);
  
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  
  const totalSeconds = isBreak 
    ? (data.breakDuration || 5) * 60 
    : data.duration * 60;
  
  const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
  
  // Timer logic
  React.useEffect(() => {
    if (status === 'running' && remainingSeconds > 0) {
      timerRef.current = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            if (!isBreak) {
              // Focus session complete, start break
              setStatus('break');
              setIsBreak(true);
              setRemainingSeconds((data.breakDuration || 5) * 60);
              onAction?.('pomodoro_complete', { task: data.task });
            } else {
              // Break complete
              setStatus('completed');
              onAction?.('break_complete', { task: data.task });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [status, isBreak, data.breakDuration, data.task, onAction, remainingSeconds]);
  
  const handleStart = () => {
    setStatus('running');
    onAction?.('pomodoro_start', { task: data.task, duration: data.duration });
  };
  
  const handlePause = () => {
    setStatus('paused');
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
  
  const handleResume = () => {
    setStatus('running');
  };
  
  const handleReset = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setStatus('ready');
    setIsBreak(false);
    setRemainingSeconds(data.duration * 60);
  };
  
  return (
    <motion.div
      variants={rewardPop}
      initial="initial"
      animate={status === 'completed' ? 'reward' : 'initial'}
    >
      <Card 
        variant={isBreak ? 'reward' : 'focus'} 
        className="overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center gap-2">
            {isBreak ? (
              <Coffee className="w-5 h-5 text-success" />
            ) : (
              <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                <span className="text-white text-xs">🍅</span>
              </div>
            )}
            <div>
              <p className="font-display font-semibold text-foreground text-sm">
                {isBreak ? 'Mola Zamanı!' : `${data.duration} dk Odak`}
              </p>
              <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                {data.task}
              </p>
            </div>
          </div>
          
          {/* Status badge */}
          <StatusBadge status={status} isBreak={isBreak} />
        </div>
        
        {/* Timer display */}
        <div className="px-4 py-6">
          <div className="flex flex-col items-center">
            {/* Circular progress */}
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-border"
                />
                {/* Progress circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className={isBreak ? "text-success" : "text-accent"}
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                  animate={{ 
                    strokeDashoffset: 2 * Math.PI * 45 * (1 - progress / 100) 
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </svg>
              
              {/* Time display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-mono font-bold text-foreground">
                  {formatTime(remainingSeconds)}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="p-4 pt-0">
          <AnimatePresence mode="wait">
            {status === 'ready' && (
              <motion.div
                key="start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button 
                  variant="focus" 
                  className="w-full" 
                  onClick={handleStart}
                  leftIcon={Play}
                >
                  Seansı Başlat
                </Button>
              </motion.div>
            )}
            
            {status === 'running' && (
              <motion.div
                key="running"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-2"
              >
                <Button 
                  variant="secondary" 
                  className="flex-1" 
                  onClick={handlePause}
                  leftIcon={Pause}
                >
                  Duraklat
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleReset}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
            
            {status === 'paused' && (
              <motion.div
                key="paused"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-2"
              >
                <Button 
                  variant="focus" 
                  className="flex-1" 
                  onClick={handleResume}
                  leftIcon={Play}
                >
                  Devam Et
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleReset}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
            
            {status === 'break' && (
              <motion.div
                key="break"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Button 
                  variant="success" 
                  className="w-full" 
                  onClick={handleResume}
                  leftIcon={Coffee}
                >
                  Molanı Başlat
                </Button>
              </motion.div>
            )}
            
            {status === 'completed' && (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2 text-success mb-3">
                  <Check className="w-5 h-5" />
                  <span className="font-semibold">Harika iş!</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleReset}
                  leftIcon={RotateCcw}
                >
                  Yeni Seans
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}

/**
 * Status Badge Component
 */
function StatusBadge({ status, isBreak }: { status: PomodoroData['status']; isBreak: boolean }) {
  const getConfig = () => {
    if (status === 'completed') {
      return { label: 'Tamamlandı', className: 'bg-success/20 text-success' };
    }
    if (isBreak) {
      return { label: 'Mola', className: 'bg-success/20 text-success' };
    }
    switch (status) {
      case 'running':
        return { label: 'Çalışıyor', className: 'bg-accent/20 text-accent' };
      case 'paused':
        return { label: 'Duraklatıldı', className: 'bg-secondary/20 text-secondary-foreground' };
      default:
        return { label: 'Hazır', className: 'bg-muted text-muted-foreground' };
    }
  };
  
  const { label, className } = getConfig();
  
  return (
    <span className={cn(
      "px-2 py-0.5 rounded-full text-xs font-medium",
      className
    )}>
      {label}
    </span>
  );
}

export type { PomodoroCardProps };

