'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Journey } from '@/lib/journeys';
import {
  GraduationCap,
  ChevronRight,
  Play,
  Sparkles,
  Target,
  Brain,
  Rocket,
  Zap,
  Clock,
  Timer,
  Heart,
  Shield,
  Home,
  Users,
  Link as LinkIcon,
  Sun,
  Battery,
  Flame,
  CheckCircle,
} from 'lucide-react';

/**
 * Learning Journey Card Component
 * 
 * Shows either:
 * 1. Quiz CTA - if user hasn't completed the quiz
 * 2. Recommended Journeys - based on user's archetype
 * 3. Active Journey Progress - if user has an active journey
 */

// Icon mapping for journey cards
const iconMap: Record<string, React.ElementType> = {
  Target,
  Brain,
  Shield,
  Rocket,
  Zap,
  CheckCircle,
  Clock,
  Timer,
  Heart,
  Home,
  Users,
  Link: LinkIcon,
  Sun,
  Battery,
  Flame,
};

interface LearningJourneyCardProps {
  /** Whether user has completed the quiz */
  hasCompletedQuiz: boolean;
  /** User's archetype name (if quiz completed) */
  archetypeName?: string | null;
  /** User's archetype emoji (if quiz completed) */
  archetypeEmoji?: string | null;
  /** Recommended journeys based on archetype */
  recommendedJourneys?: Journey[];
  /** Active journey (if any) */
  activeJourney?: {
    journey: Journey;
    progress: number;
    currentDay: number;
  } | null;
}

export function LearningJourneyCard({
  hasCompletedQuiz,
  archetypeName,
  archetypeEmoji,
  recommendedJourneys = [],
  activeJourney,
}: LearningJourneyCardProps) {
  // Show Quiz CTA if quiz not completed
  if (!hasCompletedQuiz) {
    return <QuizCTACard />;
  }

  // Show active journey progress if exists
  if (activeJourney) {
    return (
      <ActiveJourneyCard
        journey={activeJourney.journey}
        progress={activeJourney.progress}
        currentDay={activeJourney.currentDay}
      />
    );
  }

  // Show recommended journeys
  return (
    <RecommendedJourneysCard
      archetypeName={archetypeName}
      archetypeEmoji={archetypeEmoji}
      journeys={recommendedJourneys}
    />
  );
}

/**
 * Quiz CTA Card - Shown when user hasn't completed the quiz
 */
function QuizCTACard() {
  return (
    <Card variant="default" className="overflow-hidden">
      <div className="flex flex-col md:flex-row items-stretch">
        {/* Content */}
        <div className="flex-1 p-6 md:p-8">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>Take the quiz</span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4 font-display">
            Which journey should you begin next?
          </h3>
          
          <p className="text-muted-foreground text-sm mb-6 max-w-md">
            Dopamin profilini keşfet ve sana özel öğrenme yolculuğunu bul. 
            5 dakikalık quiz ile DEHB arketipini öğren.
          </p>
          
          <Link href="/start">
            <Button variant="primary" size="lg" rightIcon={ChevronRight}>
              Find a journey
            </Button>
          </Link>
        </div>
        
        {/* Illustration */}
        <div className="relative w-full md:w-[280px] h-[200px] md:h-auto bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center overflow-hidden">
          {/* Abstract shapes */}
          <div className="absolute inset-0">
            {/* Flag/Goal illustration using CSS */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* Pole */}
              <div className="absolute w-3 h-32 bg-primary/80 rounded-full left-0 bottom-0" />
              {/* Flag */}
              <div className="absolute left-3 top-0 w-20 h-14 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-r-lg shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Target className="w-6 h-6 text-amber-700/60" />
                </div>
              </div>
              {/* Hand holding */}
              <div className="absolute -right-8 bottom-4 w-12 h-16 bg-gradient-to-t from-amber-200 to-amber-100 rounded-t-full" />
            </div>
            
            {/* Decorative stars */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-6 right-8"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-8 left-8"
            >
              <Sparkles className="w-4 h-4 text-primary/60" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute top-12 left-12"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
            </motion.div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/**
 * Active Journey Progress Card
 */
interface ActiveJourneyCardProps {
  journey: Journey;
  progress: number;
  currentDay: number;
}

function ActiveJourneyCard({ journey, progress, currentDay }: ActiveJourneyCardProps) {
  const Icon = iconMap[journey.icon] || Target;
  
  return (
    <Card variant="interactive" withHover className="p-6">
      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
        <GraduationCap className="w-4 h-4" />
        <span>Continue Learning</span>
      </div>
      
      <div className="flex items-center gap-5">
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0",
          `bg-gradient-to-br ${journey.gradient}`
        )}>
          <Icon className="w-8 h-8 text-white/90" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
            {journey.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Gün {currentDay}: {journey.subtitle}
          </p>
          
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full bg-primary rounded-full"
              />
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              {progress}%
            </span>
          </div>
        </div>
        
        <Link href={`/dashboard/learn/${journey.id}`}>
          <Button variant="primary" size="md" rightIcon={Play}>
            Devam
          </Button>
        </Link>
      </div>
    </Card>
  );
}

/**
 * Recommended Journeys Card (after quiz completion)
 */
interface RecommendedJourneysCardProps {
  archetypeName?: string | null;
  archetypeEmoji?: string | null;
  journeys: Journey[];
}

function RecommendedJourneysCard({ 
  archetypeName, 
  archetypeEmoji,
  journeys 
}: RecommendedJourneysCardProps) {
  // Show only top 3 journeys
  const topJourneys = journeys.slice(0, 3);
  
  return (
    <Card variant="default" className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <GraduationCap className="w-4 h-4" />
          <span>Learning Journey</span>
        </div>
        
        {archetypeName && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <span>{archetypeEmoji}</span>
            <span>{archetypeName}</span>
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-4 font-display">
        Sana Özel Yolculuklar
      </h3>
      
      <div className="space-y-3">
        {topJourneys.map((journey, index) => {
          const Icon = iconMap[journey.icon] || Target;
          
          return (
            <Link
              key={journey.id}
              href={`/dashboard/learn/${journey.id}`}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-xl",
                  "border border-transparent",
                  "hover:bg-muted/50 hover:border-border",
                  "transition-all duration-200 cursor-pointer group"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                  `bg-gradient-to-br ${journey.gradient}`
                )}>
                  <Icon className="w-6 h-6 text-white/90" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm mb-0.5 line-clamp-1 group-hover:text-primary transition-colors">
                    {journey.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {journey.duration} gün · {journey.minutesPerDay} dk/gün
                  </p>
                </div>
                
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.div>
            </Link>
          );
        })}
      </div>
      
      <Link
        href="/dashboard/learn"
        className="block mt-4 text-center text-sm text-primary hover:underline"
      >
        Tüm yolculukları gör
      </Link>
    </Card>
  );
}

export default LearningJourneyCard;

