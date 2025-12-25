'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PanelRightClose, PanelRightOpen, MoreVertical, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * ChatHeader Component
 * 
 * ADHD-friendly chat header:
 * - Coach avatar with status indicator
 * - Collapse/expand toggle
 * - Clear chat option
 */
interface ChatHeaderProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onClearChat?: () => void;
  className?: string;
}

export function ChatHeader({ 
  isCollapsed, 
  onToggleCollapse,
  onClearChat,
  className 
}: ChatHeaderProps) {
  const [showMenu, setShowMenu] = React.useState(false);
  
  return (
    <div className={cn(
      "flex items-center justify-between px-4 py-3",
      "border-b border-border bg-card/80 backdrop-blur-sm",
      className
    )}>
      {/* Coach info */}
      <div className="flex items-center gap-3">
        {/* Avatar with status */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-warm flex items-center justify-center shadow-warm-sm">
            <span className="text-white font-bold font-display">D</span>
          </div>
          
          {/* Online status indicator */}
          <motion.div
            className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success border-2 border-card"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        
        {/* Name and status */}
        <div className="flex flex-col">
          <h2 className="font-display font-semibold text-foreground text-sm">
            Dopa
          </h2>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
            DEHB Koçun
          </p>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-1">
        {/* Menu button */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setShowMenu(!showMenu)}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Menü"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
          
          {/* Dropdown menu */}
          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowMenu(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                className={cn(
                  "absolute right-0 top-full mt-1 z-50",
                  "bg-card border border-border rounded-lg shadow-lg",
                  "py-1 min-w-[140px]"
                )}
              >
                <button
                  onClick={() => {
                    onClearChat?.();
                    setShowMenu(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2",
                    "text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/5",
                    "transition-colors"
                  )}
                >
                  <Trash2 className="w-4 h-4" />
                  Sohbeti temizle
                </button>
              </motion.div>
            </>
          )}
        </div>
        
        {/* Collapse toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggleCollapse}
          className="text-muted-foreground hover:text-foreground"
          aria-label={isCollapsed ? "Sohbeti aç" : "Sohbeti kapat"}
        >
          {isCollapsed ? (
            <PanelRightOpen className="w-4 h-4" />
          ) : (
            <PanelRightClose className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

