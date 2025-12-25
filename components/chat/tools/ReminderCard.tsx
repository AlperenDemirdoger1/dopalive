'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReminderData } from '@/lib/chat/types';
import { Bell, BellOff, Check, Trash2 } from 'lucide-react';

/**
 * ReminderCard Component
 * 
 * ADHD-friendly reminder display:
 * - Clear time indication
 * - Toggle on/off
 * - Visual active state
 */
interface ReminderCardProps {
  data: ReminderData;
  onAction?: (action: string, data: unknown) => void;
}

export function ReminderCard({ data, onAction }: ReminderCardProps) {
  const [isActive, setIsActive] = React.useState(data.isActive);
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  
  const handleToggle = () => {
    const newActive = !isActive;
    setIsActive(newActive);
    onAction?.(newActive ? 'reminder_activate' : 'reminder_deactivate', { 
      id: data.id,
      text: data.text 
    });
  };
  
  const handleConfirm = () => {
    setIsConfirmed(true);
    onAction?.('reminder_created', { 
      id: data.id,
      text: data.text,
      time: data.time 
    });
  };
  
  const handleDelete = () => {
    onAction?.('reminder_delete', { id: data.id });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        variant={isActive ? 'default' : 'glass'}
        className={cn(
          "overflow-hidden transition-all duration-200",
          !isActive && "opacity-60"
        )}
      >
        <div className="flex items-center gap-3 p-4">
          {/* Icon */}
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            isActive ? "bg-primary/10" : "bg-muted"
          )}>
            {isActive ? (
              <Bell className="w-5 h-5 text-primary" />
            ) : (
              <BellOff className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={cn(
              "font-medium text-sm",
              !isActive && "text-muted-foreground"
            )}>
              {data.text}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {data.time || 'Zaman belirtilmedi'}
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-1">
            {!isConfirmed ? (
              <>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleDelete}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleConfirm}
                  leftIcon={Check}
                >
                  Kur
                </Button>
              </>
            ) : (
              <Button
                variant={isActive ? "ghost" : "outline"}
                size="sm"
                onClick={handleToggle}
              >
                {isActive ? 'Kapat' : 'Aç'}
              </Button>
            )}
          </div>
        </div>
        
        {/* Confirmation message */}
        {isConfirmed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="px-4 pb-3"
          >
            <p className="text-xs text-success flex items-center gap-1">
              <Check className="w-3 h-3" />
              Hatırlatıcı kuruldu!
            </p>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}

export type { ReminderCardProps };

