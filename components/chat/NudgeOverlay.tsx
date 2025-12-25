'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Nudge, ToolType } from '@/lib/chat/types';
import { Button } from '@/components/ui/button';
import { X, Timer, ListTodo, Calendar, Bell, Sparkles } from 'lucide-react';
import { scaleIn } from '@/lib/motion';

/**
 * NudgeOverlay Component
 * 
 * ADHD-friendly proactive nudge display:
 * - Gentle, non-intrusive appearance
 * - Easy to dismiss
 * - One-tap action
 * - Warm, supportive tone
 */
interface NudgeOverlayProps {
  nudge: Nudge | null;
  onDismiss: () => void;
  onAction: (toolType?: ToolType) => void;
  className?: string;
}

// Tool icon mapping
const toolIcons: Record<ToolType, React.ElementType> = {
  pomodoro: Timer,
  task_breakdown: ListTodo,
  daily_plan: Calendar,
  reminder: Bell,
};

export function NudgeOverlay({ 
  nudge, 
  onDismiss, 
  onAction,
  className 
}: NudgeOverlayProps) {
  // Auto-dismiss after 30 seconds
  React.useEffect(() => {
    if (!nudge) return;
    
    const timer = setTimeout(() => {
      onDismiss();
    }, 30000);
    
    return () => clearTimeout(timer);
  }, [nudge, onDismiss]);
  
  const Icon = nudge?.suggestedTool 
    ? toolIcons[nudge.suggestedTool] 
    : Sparkles;
  
  return (
    <AnimatePresence>
      {nudge && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={cn(
            "absolute bottom-[140px] left-4 right-4 z-10",
            className
          )}
        >
          <div className={cn(
            "bg-card border border-primary/20 rounded-2xl",
            "shadow-warm-lg p-4",
            "relative overflow-hidden"
          )}>
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-warm" />
            
            {/* Dismiss button */}
            <button
              onClick={onDismiss}
              className={cn(
                "absolute top-3 right-3 p-1.5 rounded-full",
                "text-muted-foreground hover:text-foreground",
                "hover:bg-muted transition-colors"
              )}
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </button>
            
            {/* Content */}
            <div className="flex items-start gap-3 pr-8">
              {/* Icon */}
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                "bg-primary/10"
              )}>
                <Icon className="w-5 h-5 text-primary" />
              </div>
              
              {/* Message */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  {nudge.message}
                </p>
                
                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onAction(nudge.suggestedTool)}
                  >
                    {getActionLabel(nudge.suggestedTool)}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onDismiss}
                  >
                    Şimdi değil
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Get action button label based on tool type
 */
function getActionLabel(toolType?: ToolType): string {
  switch (toolType) {
    case 'pomodoro':
      return 'Başlat';
    case 'task_breakdown':
      return 'Parçala';
    case 'daily_plan':
      return 'Planla';
    case 'reminder':
      return 'Kur';
    default:
      return 'Tamam';
  }
}

