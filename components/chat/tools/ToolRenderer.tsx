'use client';

import * as React from 'react';
import { 
  ToolCard, 
  PomodoroData, 
  TaskBreakdownData, 
  DailyPlanData, 
  ReminderData 
} from '@/lib/chat/types';
import { PomodoroCard } from './PomodoroCard';
import { TaskBreakdownCard } from './TaskBreakdownCard';
import { DailyPlanCard } from './DailyPlanCard';
import { ReminderCard } from './ReminderCard';

/**
 * ToolRenderer Component
 * 
 * Dynamically renders the appropriate tool card based on type.
 * Acts as a factory/router for tool cards.
 */
interface ToolRendererProps {
  toolCard: ToolCard;
  onToolAction?: (action: string, data: unknown) => void;
}

export function ToolRenderer({ toolCard, onToolAction }: ToolRendererProps) {
  switch (toolCard.type) {
    case 'pomodoro':
      return (
        <PomodoroCard 
          data={toolCard.data as PomodoroData} 
          onAction={onToolAction}
        />
      );
    
    case 'task_breakdown':
      return (
        <TaskBreakdownCard 
          data={toolCard.data as TaskBreakdownData} 
          onAction={onToolAction}
        />
      );
    
    case 'daily_plan':
      return (
        <DailyPlanCard 
          data={toolCard.data as DailyPlanData} 
          onAction={onToolAction}
        />
      );
    
    case 'reminder':
      return (
        <ReminderCard 
          data={toolCard.data as ReminderData} 
          onAction={onToolAction}
        />
      );
    
    default:
      return null;
  }
}

