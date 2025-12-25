'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Timer, ListTodo, Calendar, Bell, LucideIcon } from 'lucide-react';
import { QUICK_ACTIONS, ToolType } from '@/lib/chat/types';

/**
 * QuickActions Component
 * 
 * ADHD-friendly tool shortcuts:
 * - One-tap access to common tools
 * - Visual icons for recognition
 * - Horizontal scrollable on mobile
 */
interface QuickActionsProps {
  onAction: (toolType: ToolType, prompt: string) => void;
  disabled?: boolean;
  className?: string;
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Timer,
  ListTodo,
  Calendar,
  Bell,
};

export function QuickActions({ 
  onAction, 
  disabled = false,
  className 
}: QuickActionsProps) {
  return (
    <div className={cn(
      "border-t border-border/50 bg-muted/20",
      className
    )}>
      <div className="flex items-center gap-2 px-4 py-2.5 overflow-x-auto scrollbar-none">
        {QUICK_ACTIONS.map((action) => {
          const Icon = iconMap[action.icon];
          
          return (
            <ToolChip
              key={action.id}
              icon={Icon}
              label={action.label}
              onClick={() => onAction(action.id, action.prompt)}
              disabled={disabled}
            />
          );
        })}
      </div>
    </div>
  );
}

/**
 * ToolChip Component
 * Individual action button
 */
interface ToolChipProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function ToolChip({ icon: Icon, label, onClick, disabled }: ToolChipProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
        "bg-card border border-border",
        "text-xs font-medium text-muted-foreground",
        "hover:border-primary/30 hover:text-foreground hover:bg-primary/5",
        "transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "whitespace-nowrap flex-shrink-0"
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </motion.button>
  );
}

