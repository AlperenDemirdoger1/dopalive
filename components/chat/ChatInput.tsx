'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Send, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isEmptyMessage } from '@/lib/chat/utils';

/**
 * ChatInput Component
 * 
 * ADHD-friendly message input:
 * - Auto-expanding textarea (single line by default)
 * - Clear send button
 * - Keyboard shortcuts (Enter to send)
 * - Visual feedback on focus
 */
interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function ChatInput({ 
  onSend, 
  disabled = false,
  placeholder = "Bir şey yaz veya soru sor...",
  className 
}: ChatInputProps) {
  const [value, setValue] = React.useState('');
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  
  const canSend = !disabled && !isEmptyMessage(value);
  
  // Auto-resize textarea
  const adjustHeight = React.useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, []);
  
  React.useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);
  
  const handleSend = () => {
    if (!canSend) return;
    
    onSend(value.trim());
    setValue('');
    
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className={cn(
      "border-t border-border bg-card/50 backdrop-blur-sm",
      className
    )}>
      <div className="p-3">
        <div className={cn(
          "flex items-end gap-2 rounded-xl border border-border bg-background",
          "focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20",
          "transition-all duration-200"
        )}>
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={cn(
              "flex-1 resize-none bg-transparent px-4 py-3",
              "text-sm text-foreground placeholder:text-muted-foreground",
              "focus:outline-none disabled:opacity-50",
              "min-h-[44px] max-h-[120px]"
            )}
            aria-label="Mesaj yaz"
          />
          
          {/* Action buttons */}
          <div className="flex items-center gap-1 pr-2 pb-2">
            {/* Voice input button (placeholder for future) */}
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-foreground"
              disabled
              aria-label="Sesli giriş (yakında)"
            >
              <Mic className="w-4 h-4" />
            </Button>
            
            {/* Send button */}
            <motion.div
              initial={false}
              animate={{ 
                scale: canSend ? 1 : 0.9,
                opacity: canSend ? 1 : 0.5 
              }}
              transition={{ duration: 0.15 }}
            >
              <Button
                variant="primary"
                size="icon-sm"
                onClick={handleSend}
                disabled={!canSend}
                className="rounded-lg"
                aria-label="Mesaj gönder"
              >
                <Send className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Hint text */}
        <p className="text-xs text-muted-foreground mt-2 px-1">
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">Enter</kbd>
          {' '}gönder • {' '}
          <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">Shift + Enter</kbd>
          {' '}yeni satır
        </p>
      </div>
    </div>
  );
}

