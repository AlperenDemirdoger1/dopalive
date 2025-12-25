/**
 * DopaLive Chat Library
 * 
 * Barrel export for all chat-related utilities and types
 */

// Types
export * from './types';

// Utilities
export * from './utils';

// Prompts
export * from './prompts';

// Context and hooks
export { ChatProvider, useChat, useChatMessages, useActiveTools, useChatSidebar } from './context';
export { useProactiveNudge, useLocalStorage, useDebounce, usePomodoroTimer } from './hooks';

// Proactive system
export * from './proactive';

