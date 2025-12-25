'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { staggerContainer } from '@/lib/motion';
import { Message } from '@/lib/chat/types';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { ToolRenderer } from './tools/ToolRenderer';

/**
 * MessageList Component
 * 
 * ADHD-friendly scrollable message container:
 * - Auto-scrolls to new messages
 * - Staggered entrance animations
 * - Inline tool card rendering
 * - Smooth scroll behavior
 */
interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
  className?: string;
}

export function MessageList({ 
  messages, 
  isLoading = false,
  className 
}: MessageListProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom on new messages
  React.useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);
  
  // Welcome message if no messages
  const showWelcome = messages.length === 0 && !isLoading;
  
  return (
    <div 
      ref={scrollRef}
      className={cn(
        "flex-1 overflow-y-auto overflow-x-hidden",
        "scroll-smooth scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
        className
      )}
    >
      <div className="py-4 min-h-full flex flex-col">
        {/* Welcome message */}
        {showWelcome && <WelcomeMessage />}
        
        {/* Messages */}
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <React.Fragment key={message.id}>
                <MessageBubble message={message} />
                
                {/* Render tool card if present */}
                {message.toolCard && (
                  <div className="px-4 py-2">
                    <ToolRenderer toolCard={message.toolCard} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Typing indicator */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Scroll anchor */}
        <div ref={bottomRef} className="h-1" />
      </div>
    </div>
  );
}

/**
 * Welcome Message Component
 * Shown when chat is empty
 */
function WelcomeMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center"
    >
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full bg-gradient-warm flex items-center justify-center mb-4 shadow-warm-md">
        <span className="text-white text-2xl font-bold font-display">D</span>
      </div>
      
      {/* Welcome text */}
      <h3 className="text-lg font-display font-semibold text-foreground mb-2">
        Merhaba! Ben Dopa 👋
      </h3>
      <p className="text-muted-foreground text-sm max-w-[280px] leading-relaxed">
        DEHB koçun olarak yanındayım. Odaklanmana, görevlerini parçalamana 
        ve gününü planlamana yardımcı olabilirim.
      </p>
      
      {/* Suggestions */}
      <div className="mt-6 space-y-2 w-full max-w-[280px]">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-3">
          Şunlarla başlayabilirsin:
        </p>
        <SuggestionChip text="🍅 Pomodoro başlat" />
        <SuggestionChip text="📋 Bir görevi parçala" />
        <SuggestionChip text="📅 Günümü planla" />
      </div>
    </motion.div>
  );
}

/**
 * Suggestion Chip Component
 */
function SuggestionChip({ text }: { text: string }) {
  return (
    <div className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border/50 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors cursor-pointer">
      {text}
    </div>
  );
}

