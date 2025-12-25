/**
 * DopaLive Chat Types
 * 
 * Type definitions for the ADHD-friendly chat system
 */

// ============================================
// MESSAGE TYPES
// ============================================

export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  toolCard?: ToolCard;
  isStreaming?: boolean;
}

// ============================================
// TOOL TYPES
// ============================================

export type ToolType = 'pomodoro' | 'task_breakdown' | 'daily_plan' | 'reminder';

export interface ToolCard {
  type: ToolType;
  data: PomodoroData | TaskBreakdownData | DailyPlanData | ReminderData;
}

export interface PomodoroData {
  duration: number; // minutes
  task: string;
  breakDuration?: number; // minutes
  status: 'ready' | 'running' | 'paused' | 'completed' | 'break';
  remainingSeconds?: number;
}

export interface TaskBreakdownData {
  taskTitle: string;
  steps: TaskStep[];
}

export interface TaskStep {
  id: string;
  text: string;
  completed: boolean;
  estimatedMinutes?: number;
}

export interface DailyPlanData {
  date: string;
  blocks: TimeBlock[];
}

export interface TimeBlock {
  id: string;
  startTime: string; // "09:00"
  task: string;
  duration: string; // "2s", "30dk"
  type: 'focus' | 'break' | 'meeting' | 'personal';
  completed?: boolean;
}

export interface ReminderData {
  id: string;
  text: string;
  time: string;
  isActive: boolean;
}

// ============================================
// TOOL INSTANCE (Active tools)
// ============================================

export interface ToolInstance {
  id: string;
  type: ToolType;
  data: PomodoroData | TaskBreakdownData | DailyPlanData | ReminderData;
  createdAt: Date;
  isActive: boolean;
}

// ============================================
// PROACTIVE NUDGE TYPES
// ============================================

export type NudgeType = 
  | 'idle_5min'
  | 'task_stuck'
  | 'end_of_day'
  | 'morning_checkin'
  | 'pomodoro_complete'
  | 'celebrate_win';

export interface Nudge {
  id: string;
  type: NudgeType;
  message: string;
  suggestedTool?: ToolType;
  dismissedAt?: Date;
}

// ============================================
// CHAT STATE
// ============================================

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isStreaming: boolean;
  activeTools: ToolInstance[];
  proactiveNudge: Nudge | null;
  isSidebarOpen: boolean;
  lastActivity: Date;
}

export type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'UPDATE_MESSAGE'; payload: { id: string; updates: Partial<Message> } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_STREAMING'; payload: boolean }
  | { type: 'ADD_TOOL'; payload: ToolInstance }
  | { type: 'UPDATE_TOOL'; payload: { id: string; updates: Partial<ToolInstance> } }
  | { type: 'REMOVE_TOOL'; payload: string }
  | { type: 'SET_NUDGE'; payload: Nudge | null }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR'; payload: boolean }
  | { type: 'UPDATE_ACTIVITY' }
  | { type: 'CLEAR_MESSAGES' };

// ============================================
// API TYPES
// ============================================

export interface ChatRequest {
  messages: Pick<Message, 'role' | 'content'>[];
  userId?: string;
}

export interface ChatResponse {
  message: string;
  toolCard?: ToolCard;
}

export interface StreamChunk {
  type: 'text' | 'tool' | 'done' | 'error';
  content?: string;
  toolCard?: ToolCard;
  error?: string;
}

// ============================================
// QUICK ACTIONS
// ============================================

export interface QuickAction {
  id: ToolType;
  label: string;
  icon: string; // Lucide icon name
  prompt: string; // What to send to AI
}

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'pomodoro',
    label: 'Pomodoro',
    icon: 'Timer',
    prompt: 'Bir pomodoro seansı başlatmak istiyorum',
  },
  {
    id: 'task_breakdown',
    label: 'Parçala',
    icon: 'ListTodo',
    prompt: 'Bu görevi daha küçük adımlara ayırmama yardım et',
  },
  {
    id: 'daily_plan',
    label: 'Gün Planı',
    icon: 'Calendar',
    prompt: 'Bugün için bir plan yapmama yardım et',
  },
  {
    id: 'reminder',
    label: 'Hatırlatıcı',
    icon: 'Bell',
    prompt: 'Bir hatırlatıcı kurmak istiyorum',
  },
];

