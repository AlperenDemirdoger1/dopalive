'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DailyPlanData, TimeBlock as TimeBlockType } from '@/lib/chat/types';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { Calendar, Clock, Coffee, Users, Briefcase, Check } from 'lucide-react';

/**
 * DailyPlanCard Component
 * 
 * ADHD-friendly daily planning:
 * - Visual time blocks
 * - Color-coded activity types
 * - Easy to scan structure
 */
interface DailyPlanCardProps {
  data: DailyPlanData;
  onAction?: (action: string, data: unknown) => void;
}

export function DailyPlanCard({ data, onAction }: DailyPlanCardProps) {
  const [blocks, setBlocks] = React.useState<TimeBlockType[]>(data.blocks);
  
  const completedCount = blocks.filter(b => b.completed).length;
  const progress = blocks.length > 0 ? (completedCount / blocks.length) * 100 : 0;
  
  const handleToggleBlock = (blockId: string) => {
    setBlocks(prev => prev.map(block => {
      if (block.id === blockId) {
        const newCompleted = !block.completed;
        if (newCompleted) {
          onAction?.('block_complete', { blockId, task: block.task });
        }
        return { ...block, completed: newCompleted };
      }
      return block;
    }));
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };
  
  return (
    <Card variant="default" className="overflow-hidden">
      {/* Header */}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Gün Planı</p>
              <CardTitle className="text-base">
                {formatDate(data.date)}
              </CardTitle>
            </div>
          </div>
          
          {/* Progress */}
          <div className="text-right">
            <span className="text-sm font-semibold text-foreground">
              {completedCount}/{blocks.length}
            </span>
            <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden mt-1">
              <motion.div
                className="h-full bg-gradient-warm rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      
      {/* Time blocks */}
      <CardContent>
        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {blocks.map((block) => (
            <TimeBlockItem
              key={block.id}
              block={block}
              onToggle={() => handleToggleBlock(block.id)}
            />
          ))}
        </motion.div>
        
        {blocks.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            Henüz plan yok. Gününü planlamak ister misin?
          </p>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * TimeBlockItem Component
 */
interface TimeBlockItemProps {
  block: TimeBlockType;
  onToggle: () => void;
}

const typeConfig: Record<TimeBlockType['type'], { 
  icon: React.ElementType; 
  color: string;
  bgColor: string;
}> = {
  focus: { 
    icon: Briefcase, 
    color: 'text-accent',
    bgColor: 'bg-accent/10'
  },
  break: { 
    icon: Coffee, 
    color: 'text-success',
    bgColor: 'bg-success/10'
  },
  meeting: { 
    icon: Users, 
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  personal: { 
    icon: Clock, 
    color: 'text-secondary-foreground',
    bgColor: 'bg-secondary/20'
  },
};

function TimeBlockItem({ block, onToggle }: TimeBlockItemProps) {
  const config = typeConfig[block.type];
  const Icon = config.icon;
  
  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border transition-all duration-200",
        block.completed 
          ? "bg-muted/30 border-border/50 opacity-60" 
          : "bg-card border-border hover:border-primary/30"
      )}
    >
      {/* Time */}
      <div className="flex-shrink-0 w-14 text-center">
        <span className="text-sm font-mono font-semibold text-foreground">
          {block.startTime}
        </span>
      </div>
      
      {/* Divider */}
      <div className={cn(
        "w-1 h-10 rounded-full",
        config.bgColor
      )} />
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Icon className={cn("w-4 h-4", config.color)} />
          <span className={cn(
            "text-sm font-medium truncate",
            block.completed && "line-through text-muted-foreground"
          )}>
            {block.task}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{block.duration}</span>
      </div>
      
      {/* Checkbox */}
      <button
        onClick={onToggle}
        className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center",
          "transition-all duration-200",
          block.completed 
            ? "bg-success border-success" 
            : "border-border hover:border-primary"
        )}
      >
        {block.completed && <Check className="w-3.5 h-3.5 text-white" />}
      </button>
    </motion.div>
  );
}

export type { DailyPlanCardProps };

