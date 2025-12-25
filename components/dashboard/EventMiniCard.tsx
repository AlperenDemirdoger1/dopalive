'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FeaturedEvent } from '@/lib/journeys';
import {
  Clock,
  Users,
  Target,
  Video,
  Headphones,
} from 'lucide-react';

/**
 * Event Mini Card - Small card for body doubling sessions
 * 
 * Compact layout showing time, type, and participant count
 */

interface EventMiniCardProps {
  event: FeaturedEvent;
  className?: string;
  index?: number;
}

// Color variants for event type badges
const typeColors: Record<FeaturedEvent['type'], string> = {
  'body-doubling': 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
  'workshop': 'bg-primary/5 border-primary/20',
  'community': 'bg-accent/5 border-accent/20',
  'coaching': 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
};

const typeIconColors: Record<FeaturedEvent['type'], string> = {
  'body-doubling': 'text-amber-600 dark:text-amber-400',
  'workshop': 'text-primary',
  'community': 'text-accent',
  'coaching': 'text-purple-600 dark:text-purple-400',
};

export function EventMiniCard({ event, className, index = 0 }: EventMiniCardProps) {
  const isBodyDoubling = event.type === 'body-doubling';
  
  return (
    <Link href={`/dashboard/events/${event.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={cn(
          "flex items-center gap-4 p-4 rounded-xl",
          "border",
          typeColors[event.type],
          "hover:shadow-md hover:scale-[1.02]",
          "transition-all duration-200 cursor-pointer",
          className
        )}
      >
        {/* Left: Time & Date */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            <Clock className="w-3 h-3" />
            <span>{event.date}, {event.time}</span>
          </div>
          <h4 className="font-medium text-foreground text-sm line-clamp-1">
            {event.duration} min {isBodyDoubling ? 'Body Doubling' : event.title}
          </h4>
        </div>
        
        {/* Right: Icon Badge */}
        <div className={cn(
          "flex flex-col items-center justify-center",
          "w-16 h-16 rounded-xl",
          "bg-white dark:bg-background",
          "border border-border/50",
          "flex-shrink-0"
        )}>
          {isBodyDoubling ? (
            <>
              <Users className={cn("w-5 h-5 mb-1", typeIconColors[event.type])} />
              <span className={cn("text-[10px] font-medium text-center leading-tight", typeIconColors[event.type])}>
                Body
                <br />
                Doubling
              </span>
            </>
          ) : event.type === 'workshop' ? (
            <>
              <Video className={cn("w-5 h-5 mb-1", typeIconColors[event.type])} />
              <span className={cn("text-[10px] font-medium", typeIconColors[event.type])}>
                Workshop
              </span>
            </>
          ) : (
            <>
              <Headphones className={cn("w-5 h-5 mb-1", typeIconColors[event.type])} />
              <span className={cn("text-[10px] font-medium", typeIconColors[event.type])}>
                {event.type}
              </span>
            </>
          )}
        </div>
      </motion.div>
    </Link>
  );
}

export default EventMiniCard;

