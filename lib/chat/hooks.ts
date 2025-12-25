'use client';

import * as React from 'react';
import { NudgeType, Nudge, ToolType } from './types';
import { NUDGE_MESSAGES } from './prompts';
import { generateToolId } from './utils';

/**
 * useProactiveNudge Hook
 * 
 * Monitors user activity and triggers helpful nudges
 * when the user might need assistance.
 */
interface UseProactiveNudgeOptions {
  /** Idle time before showing nudge (ms) */
  idleTimeout?: number;
  /** Whether nudges are enabled */
  enabled?: boolean;
  /** Callback when nudge is triggered */
  onNudge?: (nudge: Nudge) => void;
}

export function useProactiveNudge({
  idleTimeout = 5 * 60 * 1000, // 5 minutes
  enabled = true,
  onNudge,
}: UseProactiveNudgeOptions = {}) {
  const [currentNudge, setCurrentNudge] = React.useState<Nudge | null>(null);
  const [lastActivity, setLastActivity] = React.useState<Date>(new Date());
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  
  // Track activity
  const updateActivity = React.useCallback(() => {
    setLastActivity(new Date());
    setCurrentNudge(null);
  }, []);
  
  // Show a specific nudge
  const showNudge = React.useCallback((type: NudgeType, suggestedTool?: ToolType) => {
    const nudge: Nudge = {
      id: generateToolId('nudge' as ToolType),
      type,
      message: NUDGE_MESSAGES[type] || 'Yardımcı olmamı ister misin?',
      suggestedTool,
    };
    
    setCurrentNudge(nudge);
    onNudge?.(nudge);
  }, [onNudge]);
  
  // Dismiss current nudge
  const dismissNudge = React.useCallback(() => {
    if (currentNudge) {
      setCurrentNudge(prev => prev ? { ...prev, dismissedAt: new Date() } : null);
      setCurrentNudge(null);
    }
  }, [currentNudge]);
  
  // Idle detection
  React.useEffect(() => {
    if (!enabled) return;
    
    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Set new timer
    timerRef.current = setTimeout(() => {
      const timeSinceActivity = Date.now() - lastActivity.getTime();
      if (timeSinceActivity >= idleTimeout) {
        showNudge('idle_5min', 'pomodoro');
      }
    }, idleTimeout);
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [enabled, idleTimeout, lastActivity, showNudge]);
  
  // Activity listeners
  React.useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;
    
    const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    
    const handleActivity = () => updateActivity();
    
    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });
    
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [enabled, updateActivity]);
  
  return {
    currentNudge,
    showNudge,
    dismissNudge,
    updateActivity,
    lastActivity,
  };
}

/**
 * useLocalStorage Hook
 * 
 * Persist chat state to localStorage
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  
  const setValue = React.useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue(prev => {
      const newValue = value instanceof Function ? value(prev) : value;
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      }
      
      return newValue;
    });
  }, [key]);
  
  return [storedValue, setValue];
}

/**
 * useDebounce Hook
 * 
 * Debounce a value for search/typing optimization
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

/**
 * usePomodoroTimer Hook
 * 
 * Manages pomodoro timer state
 */
interface UsePomodoroTimerOptions {
  focusDuration?: number; // minutes
  breakDuration?: number; // minutes
  onComplete?: () => void;
  onBreakStart?: () => void;
  onBreakComplete?: () => void;
}

export function usePomodoroTimer({
  focusDuration = 25,
  breakDuration = 5,
  onComplete,
  onBreakStart,
  onBreakComplete,
}: UsePomodoroTimerOptions = {}) {
  const [status, setStatus] = React.useState<'idle' | 'running' | 'paused' | 'break'>('idle');
  const [remainingSeconds, setRemainingSeconds] = React.useState(focusDuration * 60);
  const [isBreak, setIsBreak] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  
  const totalSeconds = isBreak ? breakDuration * 60 : focusDuration * 60;
  const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
  
  const start = React.useCallback(() => {
    setStatus('running');
  }, []);
  
  const pause = React.useCallback(() => {
    setStatus('paused');
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);
  
  const resume = React.useCallback(() => {
    setStatus('running');
  }, []);
  
  const reset = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setStatus('idle');
    setIsBreak(false);
    setRemainingSeconds(focusDuration * 60);
  }, [focusDuration]);
  
  const skipBreak = React.useCallback(() => {
    setIsBreak(false);
    setRemainingSeconds(focusDuration * 60);
    setStatus('idle');
  }, [focusDuration]);
  
  // Timer effect
  React.useEffect(() => {
    if (status === 'running') {
      timerRef.current = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            
            if (!isBreak) {
              // Focus complete, start break
              onComplete?.();
              setIsBreak(true);
              setRemainingSeconds(breakDuration * 60);
              setStatus('break');
              onBreakStart?.();
            } else {
              // Break complete
              onBreakComplete?.();
              setStatus('idle');
              setIsBreak(false);
              setRemainingSeconds(focusDuration * 60);
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
  }, [status, isBreak, breakDuration, focusDuration, onComplete, onBreakStart, onBreakComplete]);
  
  return {
    status,
    remainingSeconds,
    progress,
    isBreak,
    start,
    pause,
    resume,
    reset,
    skipBreak,
  };
}

