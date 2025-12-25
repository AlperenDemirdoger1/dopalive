'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FeaturedEvent } from '@/lib/journeys';
import {
  Calendar,
  Clock,
  Users,
  ChevronRight,
  Play,
  Video,
  Mic,
} from 'lucide-react';

/**
 * Featured Event Card - Large card for highlighted events
 * 
 * Shows workshop, community events with full details
 */

interface FeaturedEventCardProps {
  event: FeaturedEvent;
  className?: string;
}

export function FeaturedEventCard({ event, className }: FeaturedEventCardProps) {
  const isBodyDoubling = event.type === 'body-doubling';
  const isWorkshop = event.type === 'workshop';
  
  return (
    <Card 
      variant="interactive" 
      withHover 
      className={cn("overflow-hidden h-full", className)}
    >
      {/* Image/Gradient Header */}
      <div className={cn(
        "relative h-48 md:h-56 overflow-hidden",
        event.imageUrl 
          ? "bg-cover bg-center" 
          : "bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800"
      )} style={event.imageUrl ? { backgroundImage: `url(${event.imageUrl})` } : {}}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        {/* Event Type Badge */}
        <div className="absolute top-4 left-4">
          <div className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm",
            isWorkshop && "bg-primary/20 text-primary border border-primary/30",
            isBodyDoubling && "bg-amber-500/20 text-amber-600 border border-amber-500/30",
            event.type === 'community' && "bg-accent/20 text-accent border border-accent/30",
            event.type === 'coaching' && "bg-purple-500/20 text-purple-600 border border-purple-500/30"
          )}>
            {isWorkshop && 'Workshop'}
            {isBodyDoubling && 'Body Doubling'}
            {event.type === 'community' && 'Topluluk'}
            {event.type === 'coaching' && 'Koçluk'}
          </div>
        </div>
        
        {/* Live indicator (if applicable) */}
        {event.date === 'Bugün' && (
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/90 text-white text-xs font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Bugün
          </motion.div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-foreground text-lg mb-2 line-clamp-2 font-display">
          {event.title}
        </h3>
        
        {event.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {event.description}
          </p>
        )}
        
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
          {event.participants !== undefined && (
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>{event.participants} katılımcı</span>
            </div>
          )}
        </div>
        
        {/* Host (if workshop/coaching) */}
        {event.host && (
          <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-muted/50">
            <div className="w-8 h-8 rounded-full bg-gradient-warm flex items-center justify-center text-white text-xs font-semibold">
              {event.host.charAt(0)}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Sunucu</p>
              <p className="text-sm font-medium text-foreground">{event.host}</p>
            </div>
          </div>
        )}
        
        {/* Action Button */}
        <Link href={`/dashboard/events/${event.id}`}>
          <Button variant="primary" className="w-full" rightIcon={ChevronRight}>
            {isBodyDoubling ? 'Katıl' : 'Detaylar'}
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export default FeaturedEventCard;

