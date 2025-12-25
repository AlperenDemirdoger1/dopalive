'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';
import { 
  DashboardLayout, 
  LearningJourneyCard,
  FeaturedEventCard,
  EventMiniCard 
} from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { usePersonalization } from '@/lib/hooks/usePersonalization';
import { MOCK_EVENTS, getPersonalizedEvents, GENERIC_TIPS } from '@/lib/journeys';
import {
  Sparkles,
  Calendar,
  Flame,
  ChevronRight,
  Play,
  ArrowRight,
  Timer,
  Zap,
  Target,
  Bot,
} from 'lucide-react';

/**
 * DopaLive Dashboard Home Page
 * 
 * ADHD-Friendly Design based on reference:
 * - Clean, minimal layout
 * - Personalized greeting with streak
 * - Learning Journey section (quiz CTA or recommendations)
 * - Featured Events section
 */

export default function DashboardPage() {
  const {
    isLoading,
    hasCompletedQuiz,
    archetypeName,
    archetypeEmoji,
    recommendedJourneys,
    dailyTip,
    displayName,
    currentStreak,
    bodyDoublingRecommended,
  } = usePersonalization();

  // Get personalized events
  const events = getPersonalizedEvents(bodyDoublingRecommended);
  const featuredEvent = events.find(e => e.isFeatured) || events[0];
  const sideEvents = events.filter(e => e.id !== featuredEvent?.id).slice(0, 3);

  // Get tip (personalized or generic)
  const tip = dailyTip || GENERIC_TIPS[Math.floor(Date.now() / 86400000) % GENERIC_TIPS.length];

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-muted-foreground">Yükleniyor...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Welcome Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground font-display">
                Hello, {displayName}
              </h1>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                className="text-2xl"
              >
                ✨
              </motion.span>
            </div>
            
            {/* Streak Badge */}
            {currentStreak > 1 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-warm text-white text-sm font-medium shadow-warm-sm"
              >
                <Flame className="w-4 h-4" />
                <span>{currentStreak} gün</span>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Learning Journey Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <LearningJourneyCard
            hasCompletedQuiz={hasCompletedQuiz}
            archetypeName={archetypeName}
            archetypeEmoji={archetypeEmoji}
            recommendedJourneys={recommendedJourneys}
          />
        </motion.section>

        {/* Featured Events Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer(0.1)}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground font-display">
                Featured Events
              </h2>
            </div>
            <Link
              href="/dashboard/events"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              Tümünü gör
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Featured Event (Large Card) */}
            <motion.div variants={staggerItem}>
              {featuredEvent && (
                <FeaturedEventCard event={featuredEvent} className="h-full" />
              )}
            </motion.div>

            {/* Side Events (Mini Cards) */}
            <div className="space-y-3">
              {sideEvents.map((event, index) => (
                <motion.div key={event.id} variants={staggerItem}>
                  <EventMiniCard event={event} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Quick Actions + Tip Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Hızlı Erişim
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/dashboard/focus">
                <Card 
                  variant="interactive" 
                  withHover 
                  className="p-4 flex flex-col items-center gap-2 text-center h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Odak Seansı
                  </span>
                </Card>
              </Link>
              
              <Link href="/dashboard/ai-coach">
                <Card 
                  variant="interactive" 
                  withHover 
                  className="p-4 flex flex-col items-center gap-2 text-center h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-warm flex items-center justify-center shadow-warm-sm">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    AI Koç
                  </span>
                </Card>
              </Link>
            </div>
          </motion.section>

          {/* Daily Tip */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Günün İpucu
            </h3>
            <Card variant="glass" className="p-5 h-[calc(100%-28px)]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Timer className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {tip.highlight ? (
                      <>
                        {tip.text.split(tip.highlight)[0]}
                        <span className="text-primary font-medium">{tip.highlight}</span>
                        {tip.text.split(tip.highlight)[1]}
                      </>
                    ) : (
                      tip.text
                    )}
                  </p>
                  {tip.category && (
                    <span className={cn(
                      "inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium",
                      tip.category === 'strategy' && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                      tip.category === 'mindset' && "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
                      tip.category === 'tool' && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                      tip.category === 'reminder' && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                    )}>
                      {tip.category === 'strategy' && 'Strateji'}
                      {tip.category === 'mindset' && 'Zihniyet'}
                      {tip.category === 'tool' && 'Araç'}
                      {tip.category === 'reminder' && 'Hatırlatma'}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          </motion.section>
        </div>
      </div>
    </DashboardLayout>
  );
}
