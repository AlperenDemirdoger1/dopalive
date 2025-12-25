'use client';

import * as React from 'react';
import { 
  ChatState, 
  ChatAction, 
  Message, 
  ToolInstance, 
  Nudge,
  ToolType 
} from './types';
import { createMessage, parseToolFromResponse } from './utils';

/**
 * Initial chat state
 */
const initialState: ChatState = {
  messages: [],
  isLoading: false,
  isStreaming: false,
  activeTools: [],
  proactiveNudge: null,
  isSidebarOpen: true,
  lastActivity: new Date(),
};

/**
 * Chat reducer
 */
function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        lastActivity: new Date(),
      };
    
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg.id === action.payload.id
            ? { ...msg, ...action.payload.updates }
            : msg
        ),
      };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_STREAMING':
      return { ...state, isStreaming: action.payload };
    
    case 'ADD_TOOL':
      return {
        ...state,
        activeTools: [...state.activeTools, action.payload],
      };
    
    case 'UPDATE_TOOL':
      return {
        ...state,
        activeTools: state.activeTools.map(tool =>
          tool.id === action.payload.id
            ? { ...tool, ...action.payload.updates }
            : tool
        ),
      };
    
    case 'REMOVE_TOOL':
      return {
        ...state,
        activeTools: state.activeTools.filter(tool => tool.id !== action.payload),
      };
    
    case 'SET_NUDGE':
      return { ...state, proactiveNudge: action.payload };
    
    case 'TOGGLE_SIDEBAR':
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    
    case 'SET_SIDEBAR':
      return { ...state, isSidebarOpen: action.payload };
    
    case 'UPDATE_ACTIVITY':
      return { ...state, lastActivity: new Date() };
    
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] };
    
    default:
      return state;
  }
}

/**
 * Chat Context
 */
interface ChatContextValue extends ChatState {
  // Actions
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  dismissNudge: () => void;
  
  // Tool actions
  startTool: (type: ToolType, data: unknown) => void;
  updateTool: (id: string, updates: Partial<ToolInstance>) => void;
  removeTool: (id: string) => void;
}

const ChatContext = React.createContext<ChatContextValue | null>(null);

/**
 * Chat Provider Props
 */
interface ChatProviderProps {
  children: React.ReactNode;
  /** API endpoint for chat */
  apiEndpoint?: string;
  /** User ID for context */
  userId?: string;
}

/**
 * Chat Provider Component
 */
export function ChatProvider({ 
  children, 
  apiEndpoint = '/api/chat',
  userId 
}: ChatProviderProps) {
  const [state, dispatch] = React.useReducer(chatReducer, initialState);
  
  /**
   * Send a message and get AI response
   */
  const sendMessage = React.useCallback(async (content: string) => {
    // Add user message
    const userMessage = createMessage('user', content);
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...state.messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
          userId,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Chat request failed');
      }
      
      const data = await response.json();
      
      // Parse tool from response if present
      const { text, toolCard } = parseToolFromResponse(data.message);
      
      // Add assistant message
      const assistantMessage = createMessage('assistant', text, toolCard ?? undefined);
      dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });
      
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = createMessage('system', 'Bir hata oluştu. Lütfen tekrar dene.');
      dispatch({ type: 'ADD_MESSAGE', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [apiEndpoint, state.messages, userId]);
  
  /**
   * Clear all messages
   */
  const clearMessages = React.useCallback(() => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  }, []);
  
  /**
   * Toggle sidebar
   */
  const toggleSidebar = React.useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  }, []);
  
  /**
   * Set sidebar open state
   */
  const setSidebarOpen = React.useCallback((open: boolean) => {
    dispatch({ type: 'SET_SIDEBAR', payload: open });
  }, []);
  
  /**
   * Dismiss current nudge
   */
  const dismissNudge = React.useCallback(() => {
    dispatch({ type: 'SET_NUDGE', payload: null });
  }, []);
  
  /**
   * Start a tool instance
   */
  const startTool = React.useCallback((type: ToolType, data: unknown) => {
    const toolInstance: ToolInstance = {
      id: `${type}_${Date.now()}`,
      type,
      data: data as ToolInstance['data'],
      createdAt: new Date(),
      isActive: true,
    };
    dispatch({ type: 'ADD_TOOL', payload: toolInstance });
  }, []);
  
  /**
   * Update a tool instance
   */
  const updateTool = React.useCallback((id: string, updates: Partial<ToolInstance>) => {
    dispatch({ type: 'UPDATE_TOOL', payload: { id, updates } });
  }, []);
  
  /**
   * Remove a tool instance
   */
  const removeTool = React.useCallback((id: string) => {
    dispatch({ type: 'REMOVE_TOOL', payload: id });
  }, []);
  
  const value: ChatContextValue = {
    ...state,
    sendMessage,
    clearMessages,
    toggleSidebar,
    setSidebarOpen,
    dismissNudge,
    startTool,
    updateTool,
    removeTool,
  };
  
  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

/**
 * Hook to use chat context
 */
export function useChat() {
  const context = React.useContext(ChatContext);
  
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  
  return context;
}

/**
 * Hook for chat messages only
 */
export function useChatMessages() {
  const { messages, isLoading, isStreaming } = useChat();
  return { messages, isLoading, isStreaming };
}

/**
 * Hook for active tools
 */
export function useActiveTools() {
  const { activeTools, startTool, updateTool, removeTool } = useChat();
  return { activeTools, startTool, updateTool, removeTool };
}

/**
 * Hook for sidebar state
 */
export function useChatSidebar() {
  const { isSidebarOpen, toggleSidebar, setSidebarOpen } = useChat();
  return { isSidebarOpen, toggleSidebar, setSidebarOpen };
}

