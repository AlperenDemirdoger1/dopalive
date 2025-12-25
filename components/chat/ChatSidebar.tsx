'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Message, ToolType } from '@/lib/chat/types';
import { createMessage } from '@/lib/chat/utils';
import { useProactiveNudge } from '@/lib/chat/hooks';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { QuickActions } from './QuickActions';
import { ChatInput } from './ChatInput';
import { NudgeOverlay } from './NudgeOverlay';

/**
 * ChatSidebar Component
 * 
 * Main chat container for the dashboard.
 * ADHD-friendly design with:
 * - Clear visual hierarchy
 * - Quick action shortcuts
 * - Smooth animations
 * - Proactive nudges
 */
interface ChatSidebarProps {
  className?: string;
  /** Default collapsed state (legacy - now controlled by parent) */
  defaultCollapsed?: boolean;
  /** Callback when message is sent */
  onSendMessage?: (message: string) => Promise<string | null>;
  /** Callback when close button is clicked */
  onClose?: () => void;
}

export function ChatSidebar({ 
  className,
  onSendMessage,
  onClose
}: ChatSidebarProps) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  
  // Proactive nudge system
  const { currentNudge, dismissNudge, updateActivity } = useProactiveNudge({
    idleTimeout: 5 * 60 * 1000, // 5 minutes
    enabled: true,
  });
  
  const handleSend = async (content: string) => {
    // Update activity to reset nudge timer
    updateActivity();
    
    // Add user message
    const userMessage = createMessage('user', content);
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Call API if provided
      if (onSendMessage) {
        const response = await onSendMessage(content);
        if (response) {
          const assistantMessage = createMessage('assistant', response);
          setMessages(prev => [...prev, assistantMessage]);
        }
      } else {
        // Demo response for testing
        await new Promise(resolve => setTimeout(resolve, 1000));
        const demoResponse = getDemoResponse(content);
        const assistantMessage = createMessage('assistant', demoResponse);
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = createMessage('system', 'Bir hata oluştu. Lütfen tekrar dene.');
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleQuickAction = (toolType: ToolType, prompt: string) => {
    dismissNudge();
    handleSend(prompt);
  };
  
  const handleNudgeAction = (toolType?: ToolType) => {
    dismissNudge();
    if (toolType) {
      const prompts: Record<ToolType, string> = {
        pomodoro: 'Bir pomodoro seansı başlatalım',
        task_breakdown: 'Görevimi parçalamama yardım et',
        daily_plan: 'Bugün için plan yapalım',
        reminder: 'Bir hatırlatıcı kuralım',
      };
      handleSend(prompts[toolType]);
    }
  };
  
  const handleClearChat = () => {
    setMessages([]);
  };
  
  return (
    <aside
      className={cn(
        "w-[380px] h-full bg-card border-l border-border",
        "flex flex-col",
        "shadow-xl",
        className
      )}
    >
      {/* Header */}
      <ChatHeader
        isCollapsed={false}
        onToggleCollapse={onClose || (() => {})}
        onClearChat={handleClearChat}
      />
      
      {/* Messages */}
      <MessageList
        messages={messages}
        isLoading={isLoading}
        className="flex-1"
      />
      
      {/* Quick Actions */}
      <QuickActions
        onAction={handleQuickAction}
        disabled={isLoading}
      />
      
      {/* Proactive Nudge */}
      <NudgeOverlay
        nudge={currentNudge}
        onDismiss={dismissNudge}
        onAction={handleNudgeAction}
      />
      
      {/* Input */}
      <ChatInput
        onSend={handleSend}
        disabled={isLoading}
      />
    </aside>
  );
}

/**
 * Demo response generator for testing without API
 */
function getDemoResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('pomodoro') || lowerInput.includes('odak')) {
    return `Harika! 🍅 Bir pomodoro seansı başlatalım.

• 25 dakika derin çalışma
• 5 dakika mola
• Sonra tekrar!

Hangi görev üzerinde çalışmak istiyorsun?`;
  }
  
  if (lowerInput.includes('parçala') || lowerInput.includes('breakdown') || lowerInput.includes('adım')) {
    return `Tabii! Görevi parçalayalım. 📋

Hangi görevi küçük adımlara bölmek istiyorsun?`;
  }
  
  if (lowerInput.includes('plan') || lowerInput.includes('gün')) {
    return `Gününü planlayalım! 📅

• Önce bugün en önemli 3 şeyi belirleyelim
• Sonra bunları zaman bloklarına yerleştirelim

Bugün mutlaka yapman gereken şeyler neler?`;
  }
  
  if (lowerInput.includes('hatırlatıcı') || lowerInput.includes('reminder')) {
    return `Hatırlatıcı kuralım! 🔔

Ne hakkında hatırlatmamı istersin ve ne zaman?`;
  }
  
  return `Anladım! 👋

• Sana nasıl yardımcı olabilirim?
• Pomodoro başlatabilir, görevlerini parçalayabilir veya gününü planlayabiliriz.

Ne yapmak istersin?`;
}

