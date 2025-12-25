'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';
import { DashboardLayout } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Search,
  Clock,
  ChevronRight,
  ChevronLeft,
  Wallet,
  Home,
  Users,
  Heart,
  Briefcase,
  Handshake,
  Activity,
  GraduationCap,
  Award,
  MessageCircle,
  Play,
  BookOpen,
  Target,
  Brain,
  Sparkles,
  Timer,
  Zap,
  Focus,
  Calendar,
} from 'lucide-react';

/**
 * DopaLive Learn Page
 * 
 * ADHD-Friendly Design:
 * - Clear visual sections
 * - Horizontal scroll for journeys (reduces overwhelm)
 * - Icon-based navigation for quick scanning
 * - Minimal cognitive load
 */

// Journey data
interface Journey {
  id: string;
  title: string;
  duration: string;
  image: string;
  color: string;
  icon: React.ElementType;
}

const journeys: Journey[] = [
  {
    id: '1',
    title: 'Evden Çalışma ve DEHB',
    duration: '8 gün',
    image: '/journeys/remote-work.jpg',
    color: 'from-orange-400 to-amber-500',
    icon: Home,
  },
  {
    id: '2',
    title: 'Biyopsikososyal DEHB Yönetimi',
    duration: '6 gün',
    image: '/journeys/biopsychosocial.jpg',
    color: 'from-rose-400 to-orange-400',
    icon: Brain,
  },
  {
    id: '3',
    title: 'Ebeveyn Tükenmişliği Önleme',
    duration: '7 gün',
    image: '/journeys/parenting.jpg',
    color: 'from-amber-400 to-yellow-500',
    icon: Heart,
  },
  {
    id: '4',
    title: 'Dijital Çağda Anlamlı Bağlantılar',
    duration: '6 gün',
    image: '/journeys/connections.jpg',
    color: 'from-orange-500 to-red-400',
    icon: MessageCircle,
  },
  {
    id: '5',
    title: 'Zaman Körlüğünü Yönetme',
    duration: '5 gün',
    image: '/journeys/time.jpg',
    color: 'from-yellow-400 to-orange-400',
    icon: Timer,
  },
  {
    id: '6',
    title: 'Hyperfocus\'u Avantaja Çevir',
    duration: '4 gün',
    image: '/journeys/hyperfocus.jpg',
    color: 'from-orange-400 to-rose-500',
    icon: Focus,
  },
];

// Theme data
interface Theme {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
}

const themes: Theme[] = [
  { id: '1', title: 'Finanslarını yönet', icon: Wallet, color: 'text-emerald-500' },
  { id: '2', title: 'Evini düzenle', icon: Home, color: 'text-blue-500' },
  { id: '3', title: 'DEHB ile ebeveynlik', icon: Users, color: 'text-purple-500' },
  { id: '4', title: 'Öz bakımına öncelik ver', icon: Heart, color: 'text-rose-500' },
  { id: '5', title: 'Kariyerini geliştir', icon: Briefcase, color: 'text-amber-500' },
  { id: '6', title: 'İlişkilerini güçlendir', icon: Handshake, color: 'text-pink-500' },
  { id: '7', title: 'Sağlığını iyileştir', icon: Activity, color: 'text-green-500' },
  { id: '8', title: 'Okulda başarılı ol', icon: GraduationCap, color: 'text-indigo-500' },
  { id: '9', title: 'Liderlik becerilerini geliştir', icon: Award, color: 'text-orange-500' },
  { id: '10', title: 'Bağlantılarını derinleştir', icon: MessageCircle, color: 'text-cyan-500' },
];

// Quick actions
const quickActions = [
  { label: 'Yolculuk bul', icon: Search },
];

export default function LearnPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <DashboardLayout
      title="Öğren"
      headerAction={
        <Button variant="ghost" size="sm" leftIcon={Search}>
          Yolculuk bul
        </Button>
      }
    >
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Themed Journeys Section */}
        <section>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-foreground font-display mb-1">
                Tematik Yolculuklar
              </h2>
              <p className="text-sm text-muted-foreground">
                Adım adım ilerle, alışkanlık kazan
              </p>
            </div>
            
            {/* Scroll Controls */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={cn(
                  "w-9 h-9 rounded-full border border-border flex items-center justify-center transition-all",
                  canScrollLeft
                    ? "bg-card hover:bg-muted text-foreground"
                    : "bg-muted/50 text-muted-foreground cursor-not-allowed"
                )}
                aria-label="Sola kaydır"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={cn(
                  "w-9 h-9 rounded-full border border-border flex items-center justify-center transition-all",
                  canScrollRight
                    ? "bg-card hover:bg-muted text-foreground"
                    : "bg-muted/50 text-muted-foreground cursor-not-allowed"
                )}
                aria-label="Sağa kaydır"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Journey Cards - Horizontal Scroll */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 md:-mx-8 md:px-8 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {journeys.map((journey, index) => (
              <JourneyCard key={journey.id} journey={journey} index={index} />
            ))}
            
            {/* See More Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: journeys.length * 0.08 }}
              className="flex-shrink-0"
            >
              <Link
                href="/dashboard/learn/journeys"
                className={cn(
                  "flex flex-col items-center justify-center",
                  "w-[180px] h-[240px] rounded-2xl",
                  "bg-muted/50 border-2 border-dashed border-border",
                  "hover:border-primary/30 hover:bg-muted transition-all duration-300",
                  "group"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center mb-3 group-hover:border-primary/30 transition-colors">
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  Daha fazla gör
                </span>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Explore Themes Section */}
        <section>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-6"
          >
            <h2 className="text-xl font-semibold text-foreground font-display mb-1">
              Temaları Keşfet
            </h2>
            <p className="text-sm text-muted-foreground">
              İhtiyacına göre öğrenme yolculuğu seç
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.05)}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            {themes.map((theme) => (
              <ThemeCard key={theme.id} theme={theme} />
            ))}
          </motion.div>
        </section>

        {/* Quick Start Section */}
        <section>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card variant="warm" className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1 font-display">
                    Nereden başlayacağını bilmiyor musun?
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Kısa bir test ile sana en uygun öğrenme yolculuğunu önerelim. 
                    Beyninin nasıl çalıştığını anla, doğru stratejiyi bul.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Button variant="primary" size="lg" rightIcon={ChevronRight}>
                    Keşfet
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Recently Viewed / Continue Learning */}
        <section>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-6"
          >
            <h2 className="text-xl font-semibold text-foreground font-display mb-1">
              Devam Et
            </h2>
            <p className="text-sm text-muted-foreground">
              Kaldığın yerden devam et
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            <ContinueCard
              title="Evden Çalışma ve DEHB"
              progress={45}
              currentLesson="Gün 4: Çalışma Ortamını Optimize Et"
              icon={Home}
            />
            <ContinueCard
              title="Zaman Körlüğünü Yönetme"
              progress={20}
              currentLesson="Gün 2: Zaman Farkındalığı Teknikleri"
              icon={Timer}
            />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

/**
 * Journey Card Component
 */
interface JourneyCardProps {
  journey: Journey;
  index: number;
}

const JourneyCard = ({ journey, index }: JourneyCardProps) => {
  const Icon = journey.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, ease: [0.25, 0.8, 0.25, 1] }}
      className="flex-shrink-0"
    >
      <Link
        href={`/dashboard/learn/journey/${journey.id}`}
        className="block w-[200px] group"
      >
        {/* Image Container */}
        <div className={cn(
          "relative h-[140px] rounded-2xl mb-3 overflow-hidden",
          "bg-gradient-to-br",
          journey.color
        )}>
          {/* Decorative Elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-16 h-16 text-white/30" />
          </div>
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          
          {/* Play button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <Play className="w-5 h-5 text-foreground ml-0.5" />
            </div>
          </div>
        </div>

        {/* Content */}
        <h3 className="font-medium text-foreground text-sm leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {journey.title}
        </h3>
        
        <div className="flex items-center gap-2 text-muted-foreground text-xs">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Yolculuk</span>
          <span className="text-border">•</span>
          <span>{journey.duration}</span>
        </div>
      </Link>
    </motion.div>
  );
};

/**
 * Theme Card Component
 */
interface ThemeCardProps {
  theme: Theme;
}

const ThemeCard = ({ theme }: ThemeCardProps) => {
  const Icon = theme.icon;

  return (
    <motion.div variants={staggerItem}>
      <Link
        href={`/dashboard/learn/theme/${theme.id}`}
        className={cn(
          "block p-4 rounded-xl",
          "bg-card border border-border",
          "hover:border-primary/30 hover:shadow-warm-sm transition-all duration-300",
          "group"
        )}
      >
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
          "bg-muted group-hover:bg-primary/10 transition-colors"
        )}>
          <Icon className={cn("w-5 h-5 transition-colors", theme.color, "group-hover:text-primary")} />
        </div>
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {theme.title}
        </span>
      </Link>
    </motion.div>
  );
};

/**
 * Continue Learning Card Component
 */
interface ContinueCardProps {
  title: string;
  progress: number;
  currentLesson: string;
  icon: React.ElementType;
}

const ContinueCard = ({ title, progress, currentLesson, icon: Icon }: ContinueCardProps) => {
  return (
    <Link
      href="#"
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl",
        "bg-card border border-border",
        "hover:border-primary/30 hover:shadow-warm-sm transition-all duration-300",
        "group"
      )}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-gradient-warm flex items-center justify-center flex-shrink-0">
        <Icon className="w-7 h-7 text-white" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground text-sm mb-1 group-hover:text-primary transition-colors truncate">
          {title}
        </h4>
        <p className="text-xs text-muted-foreground mb-2 truncate">
          {currentLesson}
        </p>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{progress}%</span>
        </div>
      </div>

      {/* Play Button */}
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
        <Play className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors ml-0.5" />
      </div>
    </Link>
  );
};

