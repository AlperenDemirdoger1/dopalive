/**
 * DopaLive Chat Utilities
 * 
 * Helper functions for message parsing, tool detection, and formatting
 */

import { ToolCard, ToolType, Message } from './types';

// ============================================
// ID GENERATION
// ============================================

/**
 * Generate a unique message ID
 */
export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate a unique tool instance ID
 */
export function generateToolId(type: ToolType): string {
  return `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================
// TOOL DETECTION
// ============================================

/**
 * Parse AI response for tool JSON
 * Returns the tool card if found, null otherwise
 */
export function parseToolFromResponse(response: string): { 
  text: string; 
  toolCard: ToolCard | null 
} {
  // Look for JSON tool pattern in the response
  const toolPattern = /\{"tool":\s*"(\w+)",\s*"params":\s*(\{[^}]+\})\}/;
  const match = response.match(toolPattern);
  
  if (!match) {
    return { text: response, toolCard: null };
  }
  
  try {
    const toolType = match[1] as ToolType;
    const params = JSON.parse(match[2]);
    
    // Remove the JSON from the text
    const text = response.replace(toolPattern, '').trim();
    
    // Create tool card based on type
    const toolCard = createToolCard(toolType, params);
    
    return { text, toolCard };
  } catch {
    return { text: response, toolCard: null };
  }
}

/**
 * Create a tool card from type and params
 */
function createToolCard(type: ToolType, params: Record<string, unknown>): ToolCard {
  switch (type) {
    case 'pomodoro':
      return {
        type: 'pomodoro',
        data: {
          duration: (params.duration as number) || 25,
          task: (params.task as string) || 'Odak seansı',
          breakDuration: (params.breakDuration as number) || 5,
          status: 'ready',
        },
      };
    
    case 'task_breakdown':
      return {
        type: 'task_breakdown',
        data: {
          taskTitle: (params.task as string) || 'Görev',
          steps: ((params.steps as string[]) || []).map((step, i) => ({
            id: `step_${i}`,
            text: step,
            completed: false,
          })),
        },
      };
    
    case 'daily_plan':
      return {
        type: 'daily_plan',
        data: {
          date: new Date().toISOString().split('T')[0],
          blocks: ((params.blocks as Array<{ time: string; task: string; duration: string; type?: string }>) || []).map((block, i) => ({
            id: `block_${i}`,
            startTime: block.time,
            task: block.task,
            duration: block.duration,
            type: (block.type as 'focus' | 'break' | 'meeting' | 'personal') || 'focus',
          })),
        },
      };
    
    case 'reminder':
      return {
        type: 'reminder',
        data: {
          id: generateToolId('reminder'),
          text: (params.text as string) || 'Hatırlatıcı',
          time: (params.time as string) || '',
          isActive: true,
        },
      };
  }
}

// ============================================
// MESSAGE FORMATTING
// ============================================

/**
 * Format message content for display
 * Handles markdown-like syntax for ADHD-friendly display
 */
export function formatMessageContent(content: string): string {
  // Keep it simple - just clean up extra whitespace
  return content.trim().replace(/\n{3,}/g, '\n\n');
}

/**
 * Truncate long messages with "show more" support
 */
export function truncateMessage(content: string, maxLines: number = 3): {
  truncated: string;
  isTruncated: boolean;
  fullContent: string;
} {
  const lines = content.split('\n');
  
  if (lines.length <= maxLines) {
    return {
      truncated: content,
      isTruncated: false,
      fullContent: content,
    };
  }
  
  return {
    truncated: lines.slice(0, maxLines).join('\n') + '...',
    isTruncated: true,
    fullContent: content,
  };
}

// ============================================
// TIME FORMATTING
// ============================================

/**
 * Format timestamp for display
 */
export function formatMessageTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // Less than a minute
  if (diff < 60000) {
    return 'Şimdi';
  }
  
  // Less than an hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes} dk önce`;
  }
  
  // Today
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  }
  
  // Yesterday
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Dün ' + date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  }
  
  // Older
  return date.toLocaleDateString('tr-TR', { 
    day: 'numeric', 
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format seconds to MM:SS display
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// ============================================
// VALIDATION
// ============================================

/**
 * Check if a message is empty or just whitespace
 */
export function isEmptyMessage(content: string): boolean {
  return !content || content.trim().length === 0;
}

/**
 * Create a new message object
 */
export function createMessage(
  role: Message['role'],
  content: string,
  toolCard?: ToolCard
): Message {
  return {
    id: generateMessageId(),
    role,
    content,
    timestamp: new Date(),
    toolCard,
  };
}

