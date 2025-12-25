/**
 * DopaLive Proactive Nudge System
 * 
 * Logic for triggering helpful nudges based on user behavior patterns
 */

import { NudgeType, ToolType } from './types';
import { NUDGE_MESSAGES } from './prompts';

/**
 * Nudge trigger configuration
 */
export interface NudgeTrigger {
  type: NudgeType;
  condition: (context: NudgeContext) => boolean;
  suggestedTool?: ToolType;
  priority: number; // Higher = more important
  cooldown: number; // ms before this nudge can trigger again
}

/**
 * Context for evaluating nudge conditions
 */
export interface NudgeContext {
  lastActivity: Date;
  lastMessage: Date | null;
  messageCount: number;
  activeToolCount: number;
  currentTime: Date;
  completedTasksToday: number;
  pomodorosToday: number;
  isFirstVisit: boolean;
}

/**
 * Default nudge triggers
 */
export const NUDGE_TRIGGERS: NudgeTrigger[] = [
  // Idle for 5 minutes
  {
    type: 'idle_5min',
    condition: (ctx) => {
      const idleTime = Date.now() - ctx.lastActivity.getTime();
      return idleTime >= 5 * 60 * 1000 && ctx.activeToolCount === 0;
    },
    suggestedTool: 'pomodoro',
    priority: 5,
    cooldown: 15 * 60 * 1000, // 15 minutes
  },
  
  // Task seems stuck (mentioned "zor", "yapamıyorum" etc.)
  {
    type: 'task_stuck',
    condition: (_ctx) => {
      // This would be triggered by message analysis
      return false;
    },
    suggestedTool: 'task_breakdown',
    priority: 8,
    cooldown: 10 * 60 * 1000,
  },
  
  // End of work day (5-6 PM)
  {
    type: 'end_of_day',
    condition: (ctx) => {
      const hour = ctx.currentTime.getHours();
      return hour >= 17 && hour < 18 && ctx.completedTasksToday > 0;
    },
    priority: 3,
    cooldown: 24 * 60 * 60 * 1000, // Once per day
  },
  
  // Morning check-in (8-10 AM)
  {
    type: 'morning_checkin',
    condition: (ctx) => {
      const hour = ctx.currentTime.getHours();
      return hour >= 8 && hour < 10 && ctx.messageCount === 0;
    },
    suggestedTool: 'daily_plan',
    priority: 6,
    cooldown: 24 * 60 * 60 * 1000,
  },
  
  // Celebrate after completing multiple tasks
  {
    type: 'celebrate_win',
    condition: (ctx) => {
      return ctx.completedTasksToday >= 3 && ctx.completedTasksToday % 3 === 0;
    },
    priority: 7,
    cooldown: 2 * 60 * 60 * 1000, // 2 hours
  },
];

/**
 * Evaluate which nudge should be shown
 */
export function evaluateNudges(
  context: NudgeContext,
  lastNudgeTimes: Map<NudgeType, Date>
): NudgeTrigger | null {
  const now = Date.now();
  
  // Filter eligible nudges
  const eligibleNudges = NUDGE_TRIGGERS.filter(trigger => {
    // Check cooldown
    const lastTime = lastNudgeTimes.get(trigger.type);
    if (lastTime && now - lastTime.getTime() < trigger.cooldown) {
      return false;
    }
    
    // Check condition
    return trigger.condition(context);
  });
  
  if (eligibleNudges.length === 0) {
    return null;
  }
  
  // Return highest priority nudge
  return eligibleNudges.reduce((highest, current) => 
    current.priority > highest.priority ? current : highest
  );
}

/**
 * Analyze message content for stuck/frustration signals
 */
export function analyzeMessageForFrustration(message: string): boolean {
  const frustrationKeywords = [
    'yapamıyorum',
    'zor',
    'takıldım',
    'anlamıyorum',
    'bıktım',
    'yoruldum',
    'olmadı',
    'başaramadım',
    'çok büyük',
    'nereden başlasam',
  ];
  
  const lowerMessage = message.toLowerCase();
  return frustrationKeywords.some(keyword => lowerMessage.includes(keyword));
}

/**
 * Get nudge message
 */
export function getNudgeMessage(type: NudgeType): string {
  return NUDGE_MESSAGES[type] || 'Yardımcı olmamı ister misin?';
}

/**
 * Format time-based greeting
 */
export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour < 6) return 'İyi geceler! 🌙';
  if (hour < 12) return 'Günaydın! ☀️';
  if (hour < 18) return 'İyi günler! 🌤️';
  if (hour < 22) return 'İyi akşamlar! 🌆';
  return 'İyi geceler! 🌙';
}

/**
 * Calculate optimal break time based on work duration
 */
export function calculateBreakDuration(workMinutes: number): number {
  // Standard Pomodoro: 5 min break for 25 min work
  // Longer sessions get proportionally longer breaks
  if (workMinutes <= 25) return 5;
  if (workMinutes <= 50) return 10;
  if (workMinutes <= 90) return 15;
  return 20;
}

/**
 * Suggest next action based on context
 */
export function suggestNextAction(context: NudgeContext): {
  action: string;
  tool?: ToolType;
} {
  // Morning, no activity yet
  if (context.isFirstVisit || context.messageCount === 0) {
    const hour = new Date().getHours();
    if (hour < 12) {
      return {
        action: 'Gününü planlamak ister misin?',
        tool: 'daily_plan',
      };
    }
  }
  
  // Has active tools
  if (context.activeToolCount > 0) {
    return {
      action: 'Devam edelim mi?',
    };
  }
  
  // Completed tasks today
  if (context.completedTasksToday > 0) {
    return {
      action: 'Harika gidiyorsun! Bir sonraki göreve geçelim mi?',
      tool: 'pomodoro',
    };
  }
  
  // Default
  return {
    action: 'Bir pomodoro seansı başlatalım mı?',
    tool: 'pomodoro',
  };
}

