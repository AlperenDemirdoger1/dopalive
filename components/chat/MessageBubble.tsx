'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp } from '@/lib/motion';
import { Message } from '@/lib/chat/types';
import { formatMessageTime, truncateMessage } from '@/lib/chat/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * MessageBubble Component
 * 
 * ADHD-friendly message display:
 * - Short paragraphs with "show more" for long content
 * - Color-coded by role
 * - Timestamp on hover
 * - Smooth entrance animation
 */
interface MessageBubbleProps {
  message: Message;
  className?: string;
}

export function MessageBubble({ message, className }: MessageBubbleProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { truncated, isTruncated, fullContent } = truncateMessage(message.content);
  
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  
  const displayContent = isExpanded ? fullContent : truncated;
  
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className={cn(
        "group flex gap-3 px-4 py-2",
        isUser && "flex-row-reverse",
        className
      )}
    >
      {/* Avatar */}
      {!isUser && (
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          isSystem 
            ? "bg-accent/20 text-accent" 
            : "bg-gradient-warm"
        )}>
          <span className="text-white text-xs font-bold">
            {isSystem ? 'S' : 'D'}
          </span>
        </div>
      )}
      
      {/* Message content */}
      <div className={cn(
        "flex flex-col max-w-[80%]",
        isUser && "items-end"
      )}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isUser && "bg-accent text-white rounded-br-md",
            !isUser && !isSystem && "bg-muted/50 text-foreground rounded-bl-md",
            isSystem && "bg-primary/10 text-primary border border-primary/20 rounded-bl-md"
          )}
        >
          {/* Render content with line breaks preserved */}
          <div className="whitespace-pre-wrap break-words">
            {displayContent}
          </div>
          
          {/* Show more/less button */}
          {isTruncated && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                "flex items-center gap-1 mt-2 text-xs font-medium",
                "opacity-70 hover:opacity-100 transition-opacity",
                isUser ? "text-white/80" : "text-muted-foreground"
              )}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3 h-3" />
                  Daha az göster
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3" />
                  Devamını göster
                </>
              )}
            </button>
          )}
        </div>
        
        {/* Timestamp - visible on hover */}
        <span className={cn(
          "text-xs text-muted-foreground mt-1 px-1",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        )}>
          {formatMessageTime(message.timestamp)}
        </span>
      </div>
      
      {/* User avatar placeholder */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
          <span className="text-accent text-xs font-bold">S</span>
        </div>
      )}
    </motion.div>
  );
}

