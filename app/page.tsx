'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Sparkles, 
  Users, 
  Brain, 
  Target, 
  Timer, 
  Heart,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  BarChart3,
  MessageCircle,
  Clock,
  TrendingUp,
  Award,
  Play,
  Star,
  Flame,
  Activity,
  Headphones,
  Video,
  Coffee,
  Moon,
  Sun,
  Mic,
  Eye
} from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { cn } from '@/lib/utils';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

// Floating UI Chip Component
const FloatingChip = ({ 
  children, 
  className, 
  delay = 0,
  position 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  position: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={cn(
      "absolute chip text-white/80 shadow-xl",
      "animate-float",
      position,
      className
    )}
  >
    {children}
  </motion.div>
);

// Testimonial Card Component
const TestimonialCard = ({ 
  quote, 
  author, 
  role, 
  before, 
  after,
  delay = 0
}: { 
  quote: string; 
  author: string; 
  role: string; 
  before: string;
  after: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="glass-card rounded-3xl p-6 lg:p-8 card-glow"
  >
    {/* Stars */}
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-norepinephrine fill-norepinephrine" />
      ))}
    </div>
    
    {/* Quote */}
    <p className="text-white/80 text-base lg:text-lg leading-relaxed mb-6 font-crimson italic">
      "{quote}"
    </p>
    
    {/* Before/After Stats */}
    <div className="flex items-center gap-4 mb-6 p-4 rounded-2xl bg-dopa/5 border border-dopa/10">
      <div className="flex-1 text-center">
        <p className="text-white/40 text-xs mb-1">Önce</p>
        <p className="text-white/60 text-sm font-medium">{before}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-dopa" />
      <div className="flex-1 text-center">
        <p className="text-gaba text-xs mb-1">Sonra</p>
        <p className="text-gaba text-sm font-semibold">{after}</p>
      </div>
    </div>
    
    {/* Author */}
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dopa to-serotonin flex items-center justify-center text-white font-semibold">
        {author.charAt(0)}
      </div>
      <div>
        <p className="text-white font-medium text-sm">{author}</p>
        <p className="text-white/40 text-xs">{role}</p>
      </div>
    </div>
  </motion.div>
);

// Problem Card Component
const ProblemCard = ({ 
  icon: Icon, 
  title, 
  description,
  color,
  delay = 0
}: { 
  icon: React.ElementType;
  title: string; 
  description: string;
  color: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="glass-card rounded-3xl p-6 lg:p-8 card-glow group"
  >
    <div 
      className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center mb-5",
        "transition-transform duration-300 group-hover:scale-110",
        color
      )}
    >
      <Icon className="w-7 h-7 text-white" />
    </div>
    <h3 className="font-outfit font-semibold text-white text-xl mb-3">{title}</h3>
    <p className="text-white/50 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

// Feature Card Component (Bento Style)
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  accent,
  span = "1",
  delay = 0
}: { 
  icon: React.ElementType;
  title: string; 
  description: string;
  accent: string;
  span?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -4 }}
    className={cn(
      "bento-card group relative overflow-hidden",
      span === "2" && "md:col-span-2",
      span === "3" && "md:col-span-3"
    )}
  >
    {/* Gradient orb */}
    <div 
      className={cn(
        "absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500",
        accent
      )}
    />
    
    <div className="relative z-10">
      <div 
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
          accent.includes('dopa') ? 'bg-dopa/20' :
          accent.includes('serotonin') ? 'bg-serotonin/20' :
          accent.includes('norepinephrine') ? 'bg-norepinephrine/20' :
          accent.includes('gaba') ? 'bg-gaba/20' :
          'bg-endorphin/20'
        )}
      >
        <Icon 
          className={cn(
            "w-6 h-6",
            accent.includes('dopa') ? 'text-dopa-light' :
            accent.includes('serotonin') ? 'text-serotonin' :
            accent.includes('norepinephrine') ? 'text-norepinephrine' :
            accent.includes('gaba') ? 'text-gaba' :
            'text-endorphin'
          )} 
        />
      </div>
      <h3 className="font-outfit font-semibold text-white text-lg mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// Step Card Component
const StepCard = ({ 
  number, 
  title, 
  description,
  isLast = false,
  delay = 0
}: { 
  number: number;
  title: string; 
  description: string;
  isLast?: boolean;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className="relative flex gap-6"
  >
    {/* Number and Line */}
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dopa to-serotonin flex items-center justify-center text-white font-outfit font-bold text-lg shadow-lg shadow-dopa/20 animate-neural-pulse">
        {number}
      </div>
      {!isLast && (
        <div className="w-0.5 flex-1 mt-4 bg-gradient-to-b from-dopa/40 to-transparent" />
      )}
    </div>
    
    {/* Content */}
    <div className="pb-12">
      <h3 className="font-outfit font-semibold text-white text-xl mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed max-w-md">{description}</p>
    </div>
  </motion.div>
);

// Pricing Card Component
const PricingCard = ({ 
  name, 
  price, 
  description,
  features,
  isPopular = false,
  delay = 0
}: { 
  name: string;
  price: string; 
  description: string;
  features: string[];
  isPopular?: boolean;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -8, scale: 1.02 }}
    className={cn(
      "rounded-3xl p-6 lg:p-8 relative card-glow",
      isPopular 
        ? "bg-gradient-to-b from-dopa/15 to-transparent border border-dopa/30" 
        : "glass-card"
    )}
  >
    {isPopular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-dopa to-serotonin text-white text-xs font-semibold">
        En Popüler
      </div>
    )}
    
    <h3 className="font-outfit font-semibold text-white text-xl mb-2">{name}</h3>
    <p className="text-white/40 text-sm mb-4">{description}</p>
    
    <div className="mb-6">
      <span className="font-outfit font-bold text-4xl text-white">{price}</span>
      {price !== 'Ücretsiz' && <span className="text-white/40 text-sm">/ay</span>}
    </div>
    
    <ul className="space-y-3 mb-6">
      {features.map((feature, i) => (
        <li key={i} className="flex items-center gap-2 text-white/60 text-sm">
          <CheckCircle2 className={cn("w-4 h-4", isPopular ? "text-dopa-light" : "text-gaba")} />
          {feature}
        </li>
      ))}
    </ul>
  </motion.div>
);

// Live Body Doubling Card
const BodyDoublingCard = ({ 
  type,
  participants,
  duration,
  status
}: {
  type: string;
  participants: number;
  duration: string;
  status: 'live' | 'starting' | 'ended';
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-4 rounded-2xl bg-bg-card border border-dopa/10 hover:border-dopa/30 transition-all cursor-pointer"
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-white font-medium text-sm">{type}</span>
      <div className={cn(
        "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs",
        status === 'live' ? "bg-gaba/20 text-gaba" :
        status === 'starting' ? "bg-norepinephrine/20 text-norepinephrine" :
        "bg-white/10 text-white/50"
      )}>
        {status === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-gaba animate-pulse" />}
        {status === 'live' ? 'Canlı' : status === 'starting' ? '5 dk' : 'Bitti'}
      </div>
    </div>
    <div className="flex items-center gap-4 text-white/40 text-xs">
      <span className="flex items-center gap-1">
        <Users className="w-3 h-3" /> {participants}
      </span>
      <span className="flex items-center gap-1">
        <Clock className="w-3 h-3" /> {duration}
      </span>
    </div>
  </motion.div>
);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <main className="relative">
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Ambient Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-orb w-[800px] h-[800px] bg-dopa/20 top-[-300px] left-[-300px]" />
        <div className="ambient-orb w-[600px] h-[600px] bg-serotonin/15 bottom-[-200px] right-[-200px]" />
        <div className="ambient-orb w-[400px] h-[400px] bg-endorphin/10 top-[50%] left-[30%]" />
      </div>
      
      <SiteHeader />
      
      {/* ==================== HERO SECTION ==================== */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-5 md:px-8 overflow-hidden"
      >
        {/* Neural Grid Pattern */}
        <div className="absolute inset-0 neural-grid opacity-60" />
        
        {/* Floating UI Chips */}
        <FloatingChip 
          position="top-[22%] left-[8%] md:left-[12%]" 
          delay={0.8}
          className="hidden md:flex bg-gaba/10 border-gaba/20"
        >
          <Video className="w-4 h-4 text-gaba" />
          <span className="text-xs">Body Double: Sessiz çalışma odası</span>
        </FloatingChip>
        
        <FloatingChip 
          position="top-[30%] right-[8%] md:right-[10%]" 
          delay={1}
          className="hidden md:flex animate-float-delayed bg-dopa/10 border-dopa/20"
        >
          <Brain className="w-4 h-4 text-dopa-light" />
          <span className="text-xs">AI Koç: Dopamin seviyeni optimize et</span>
        </FloatingChip>
        
        <FloatingChip 
          position="bottom-[28%] left-[10%] md:left-[15%]" 
          delay={1.2}
          className="hidden lg:flex bg-norepinephrine/10 border-norepinephrine/20"
        >
          <Activity className="w-4 h-4 text-norepinephrine" />
          <span className="text-xs">Enerji: Yüksek • Yaratıcı mod aktif</span>
        </FloatingChip>
        
        <FloatingChip 
          position="bottom-[22%] right-[8%] md:right-[12%]" 
          delay={1.4}
          className="hidden lg:flex bg-serotonin/10 border-serotonin/20"
        >
          <Users className="w-4 h-4 text-serotonin" />
          <span className="text-xs">127 kişi seninle birlikte çalışıyor</span>
        </FloatingChip>
        
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 inline-flex"
          >
            <span className="chip bg-dopa/10 border-dopa/20 text-dopa-light">
              <Zap className="w-4 h-4" />
              <span>AI + İnsan Destekli Nörokimyasal Odak Sistemi</span>
            </span>
          </motion.div>
          
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-outfit font-bold text-white leading-[1.1] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}
          >
            ADHD beynin için{' '}
            <span className="text-gradient-dopa">dopamin optimizasyonu</span>
            <br />
            ve body doubling ekosistemi
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
          >
            DopaLive, nörokimyasal durumunu anlayan AI koçluk, gerçek zamanlı body doubling 
            ve ADHD'ye özel araçlarla{' '}
            <span className="text-white/70">odaklanmanı ve tamamlama oranını artırır.</span>
          </motion.p>
          
          {/* Live Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gaba/10 border border-gaba/20">
              <span className="w-2 h-2 rounded-full bg-gaba animate-pulse" />
              <span className="text-gaba text-sm font-medium">127 kişi şu an çalışıyor</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-dopa/10 border border-dopa/20">
              <Flame className="w-4 h-4 text-norepinephrine" />
              <span className="text-white/60 text-sm">Bugün 2,340 görev tamamlandı</span>
            </div>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "px-8 py-4 rounded-full",
                "bg-gradient-to-r from-dopa to-serotonin",
                "text-white font-semibold text-lg",
                "shadow-2xl shadow-dopa/30",
                "hover:shadow-3xl hover:shadow-dopa/40",
                "transition-all duration-300",
                "flex items-center gap-2 animate-neural-pulse"
              )}
            >
              Hemen Body Double'a Katıl
              <Users className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "px-8 py-4 rounded-full",
                "bg-white/5 border border-white/10",
                "text-white/80 font-medium text-lg",
                "hover:bg-white/10 hover:border-white/20",
                "transition-all duration-300",
                "flex items-center gap-2"
              )}
            >
              <Play className="w-5 h-5" />
              Nasıl çalışır?
            </motion.button>
          </motion.div>
          
          {/* App Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-4xl">
              {/* Glow behind mockup */}
              <div className="absolute inset-0 bg-gradient-to-r from-dopa/20 via-transparent to-serotonin/20 blur-3xl" />
              
              {/* Mockup Frame */}
              <div className="relative glass-strong rounded-3xl p-4 border border-dopa/20">
                <div className="rounded-2xl overflow-hidden bg-bg-card border border-dopa/10">
                  {/* Mockup Header */}
                  <div className="flex items-center gap-2 p-4 border-b border-dopa/10">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-endorphin/60" />
                      <div className="w-3 h-3 rounded-full bg-norepinephrine/60" />
                      <div className="w-3 h-3 rounded-full bg-gaba/60" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="px-4 py-1 rounded-full bg-dopa/10 text-dopa-light/60 text-xs">
                        app.dopalive.co
                      </div>
                    </div>
                  </div>
                  
                  {/* Mockup Content */}
                  <div className="p-6 min-h-[350px] grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Left: Body Doubling Sessions */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 font-medium text-sm">Canlı Odalar</span>
                        <span className="text-gaba text-xs flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-gaba animate-pulse" />
                          8 aktif
                        </span>
                      </div>
                      
                      <BodyDoublingCard
                        type="Sessiz Çalışma"
                        participants={34}
                        duration="2 saat"
                        status="live"
                      />
                      <BodyDoublingCard
                        type="Pomodoro Sprint"
                        participants={12}
                        duration="25 dk"
                        status="live"
                      />
                      <BodyDoublingCard
                        type="Akşam Odaklanma"
                        participants={45}
                        duration="1 saat"
                        status="starting"
                      />
                    </div>
                    
                    {/* Center: AI Coach */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-white/80 font-medium">AI Koç</div>
                        <div className="chip text-xs bg-norepinephrine/10 border-norepinephrine/20 text-norepinephrine">
                          <Activity className="w-3 h-3" />
                          Enerji: Yüksek
                        </div>
                      </div>
                      
                      {/* AI Chat Preview */}
                      <div className="p-4 rounded-2xl bg-dopa/5 border border-dopa/10">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-dopa to-serotonin flex items-center justify-center flex-shrink-0">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white/80 text-sm mb-2">
                              Dopamin seviyeni analiz ettim. Şu an yaratıcı işler için ideal bir dönemdesin! 🧠
                            </p>
                            <p className="text-white/60 text-sm">
                              Öneri: 25 dakikalık bir body double seansı ile başla. Sessiz çalışma odasında 34 kişi seni bekliyor.
                            </p>
                          </div>
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          <button className="px-3 py-1.5 rounded-full bg-gaba/20 text-gaba text-xs hover:bg-gaba/30 transition-colors">
                            Body Double'a Katıl
                          </button>
                          <button className="px-3 py-1.5 rounded-full bg-dopa/20 text-dopa-light text-xs hover:bg-dopa/30 transition-colors">
                            Görev Böl
                          </button>
                          <button className="px-3 py-1.5 rounded-full bg-norepinephrine/20 text-norepinephrine text-xs hover:bg-norepinephrine/30 transition-colors">
                            Enerji Haritası
                          </button>
                        </div>
                      </div>
                      
                      {/* Today's Progress */}
                      <div className="p-4 rounded-2xl bg-bg-elevated border border-dopa/10">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-white/60 text-sm">Bugünkü İlerleme</span>
                          <span className="text-gaba text-sm font-medium">7/10 görev</span>
                        </div>
                        <div className="h-2 rounded-full bg-dopa/10 overflow-hidden">
                          <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-dopa to-serotonin" />
                        </div>
                        <div className="flex items-center justify-between mt-3 text-xs text-white/40">
                          <span className="flex items-center gap-1">
                            <Flame className="w-3 h-3 text-norepinephrine" /> 12 günlük seri
                          </span>
                          <span>2 saat 34 dk odaklanma</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== SOCIAL PROOF BAR ==================== */}
      <section className="relative py-12 border-y border-dopa/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            {/* Stats */}
            <div className="flex items-center gap-8 md:gap-12">
              <div className="text-center md:text-left">
                <p className="font-outfit font-bold text-2xl md:text-3xl text-white">5,000+</p>
                <p className="text-white/40 text-sm">ADHD kullanıcı</p>
              </div>
              <div className="w-px h-12 bg-dopa/20 hidden md:block" />
              <div className="text-center md:text-left">
                <p className="font-outfit font-bold text-2xl md:text-3xl text-gaba">%340</p>
                <p className="text-white/40 text-sm">odaklanma artışı</p>
              </div>
              <div className="w-px h-12 bg-dopa/20 hidden md:block" />
              <div className="text-center md:text-left">
                <p className="font-outfit font-bold text-2xl md:text-3xl text-dopa-light">50K+</p>
                <p className="text-white/40 text-sm">body double saati</p>
              </div>
            </div>
            
            {/* Trust text */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['D', 'A', 'S', 'E'].map((letter, i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-dopa to-serotonin flex items-center justify-center text-white text-xs font-medium border-2 border-bg"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <span className="text-white/40 text-sm">ADHD uzmanları tarafından destekleniyor</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== PROBLEM SECTION - ADHD ZORLUKLAR ==================== */}
      <section className="relative py-24 lg:py-32 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="chip bg-endorphin/10 border-endorphin/20 text-endorphin mb-6">
              <Lightbulb className="w-4 h-4" />
              Tanıdık geliyor mu?
            </span>
            <h2 className="font-outfit font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4">
              ADHD beyni{' '}
              <span className="text-gradient-energy">farklı çalışır</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Dopamin eksikliği, dikkat dağınıklığı ve motivasyon kaybı... 
              Bunlar tembel olduğun anlamına gelmiyor. Beynin sadece farklı yakıtla çalışıyor.
            </p>
          </motion.div>
          
          {/* Problem Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <ProblemCard
              icon={Sparkles}
              title="Dopamin Açlığı"
              description="Yeni şeyler heyecan veriyor, rutin görevler sıkıcı. Beynin sürekli stimülasyon arıyor."
              color="bg-gradient-to-br from-dopa to-dopa-light"
              delay={0}
            />
            <ProblemCard
              icon={Brain}
              title="Yürütücü İşlev Zorluğu"
              description="Ne yapman gerektiğini biliyorsun ama başlayamıyorsun. Niyet ile eylem arasında uçurum var."
              color="bg-gradient-to-br from-serotonin to-serotonin-light"
              delay={0.1}
            />
            <ProblemCard
              icon={Clock}
              title="Zaman Körlüğü"
              description="5 dakika mı 5 saat mı? Hepsi aynı hissettiriyor. Deadline'lar aniden beliriyor."
              color="bg-gradient-to-br from-norepinephrine to-norepinephrine-light"
              delay={0.2}
            />
            <ProblemCard
              icon={Activity}
              title="Enerji Dalgalanmaları"
              description="Bazen hiperfonksiyonel, bazen tamamen durgun. Tutarlı performans zor."
              color="bg-gradient-to-br from-endorphin to-endorphin-light"
              delay={0.3}
            />
          </div>
          
          {/* Transition text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white/40 text-lg mt-16 max-w-xl mx-auto"
          >
            Geleneksel üretkenlik uygulamaları senin beynin için tasarlanmadı.{' '}
            <span className="text-dopa-light">DopaLive tasarlandı.</span>
          </motion.p>
        </div>
      </section>

      {/* ==================== BODY DOUBLING SECTION ==================== */}
      <section id="body-doubling" className="relative py-24 lg:py-32 px-5 md:px-8">
        <div className="absolute inset-0 synapse-pattern opacity-30" />
        
        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="chip bg-gaba/10 border-gaba/20 text-gaba mb-6">
              <Users className="w-4 h-4" />
              Body Doubling Nedir?
            </span>
            <h2 className="font-outfit font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4">
              Yalnız çalışmak zorunda değilsin.{' '}
              <span className="text-gradient-calm">Birlikte odaklan.</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Body doubling, başka birinin varlığının odaklanmayı artırdığı bilimsel olarak kanıtlanmış bir yöntem. 
              DopaLive ile 7/24 body double'ın yanında.
            </p>
          </motion.div>
          
          {/* Body Doubling Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-3xl p-6 lg:p-8 card-glow"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gaba/20 to-gaba/5 flex items-center justify-center mb-5">
                <Video className="w-7 h-7 text-gaba" />
              </div>
              <h3 className="font-outfit font-semibold text-white text-xl mb-3">Canlı Çalışma Odaları</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                Sessiz çalışma, pomodoro sprint, gece çalışma... Her mood için bir oda var. 
                Kamera isteğe bağlı.
              </p>
              <div className="flex items-center gap-2 text-gaba text-sm">
                <span className="w-2 h-2 rounded-full bg-gaba animate-pulse" />
                8 oda şu an aktif
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card rounded-3xl p-6 lg:p-8 card-glow"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-serotonin/20 to-serotonin/5 flex items-center justify-center mb-5">
                <Headphones className="w-7 h-7 text-serotonin" />
              </div>
              <h3 className="font-outfit font-semibold text-white text-xl mb-3">Ambient Sesler</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                Lo-fi beats, doğa sesleri, cafe ortamı... Odaklanmana yardımcı olan seslerle çalışma ortamını özelleştir.
              </p>
              <div className="flex items-center gap-2 text-serotonin text-sm">
                <Mic className="w-4 h-4" />
                20+ ses kütüphanesi
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-3xl p-6 lg:p-8 card-glow"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-dopa/20 to-dopa/5 flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-dopa-light" />
              </div>
              <h3 className="font-outfit font-semibold text-white text-xl mb-3">Accountability Partner</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                AI eşleştirme ile uyumlu çalışma partnerleri bul. Hedeflerini paylaş, birbirinizi motive edin.
              </p>
              <div className="flex items-center gap-2 text-dopa-light text-sm">
                <Users className="w-4 h-4" />
                Otomatik eşleştirme
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== SOLUTION / PRODUCT ECOSYSTEM ==================== */}
      <section id="ozellikler" className="relative py-24 lg:py-32 px-5 md:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dopa/[0.02] to-transparent" />
        
        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="chip bg-dopa/10 border-dopa/20 text-dopa-light mb-6">
              <Zap className="w-4 h-4" />
              DopaLive Ekosistemi
            </span>
            <h2 className="font-outfit font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4">
              Nörokimyasal durumunu anlayan{' '}
              <span className="text-gradient-dopa">akıllı sistem</span>
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              AI + İnsan hibrit yaklaşımı ile beyninin nasıl çalıştığını öğren ve optimize et.
            </p>
          </motion.div>
          
          {/* Bento Grid */}
          <div className="bento-grid">
            <FeatureCard
              icon={Brain}
              title="AI Nöro-Koç"
              description="Dopamin, serotonin ve norepinefrin seviyelerini analiz eden AI koç. Durumuna göre kişiselleştirilmiş öneriler."
              accent="bg-dopa"
              span="2"
              delay={0}
            />
            <FeatureCard
              icon={Users}
              title="Body Doubling"
              description="7/24 canlı çalışma odaları. Yalnız çalışmak zorunda değilsin."
              accent="bg-gaba"
              span="2"
              delay={0.1}
            />
            <FeatureCard
              icon={Target}
              title="Görev Bölücü"
              description="Büyük görevleri dopamin dostu küçük parçalara böl."
              accent="bg-norepinephrine"
              delay={0.2}
            />
            <FeatureCard
              icon={BarChart3}
              title="Enerji Haritası"
              description="Günlük enerji paternlerini takip et. Ne zaman yaratıcı, ne zaman analitik modda olduğunu öğren."
              accent="bg-serotonin"
              delay={0.3}
            />
            <FeatureCard
              icon={Timer}
              title="Akıllı Pomodoro"
              description="ADHD'ye uygun esnek süreler. Hiperfokus modunda timer'ı durdurma."
              accent="bg-endorphin"
              delay={0.4}
            />
            <FeatureCard
              icon={Flame}
              title="Seri Takibi"
              description="Günlük serilerin ve başarıların ile motivasyonunu koru."
              accent="bg-norepinephrine"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="nasil-calisir" className="relative py-24 lg:py-32 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div>
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <span className="chip bg-serotonin/10 border-serotonin/20 text-serotonin mb-6">
                  <Target className="w-4 h-4" />
                  Basit Süreç
                </span>
                <h2 className="font-outfit font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4">
                  Dakikalar içinde{' '}
                  <span className="text-gradient-calm">odaklanmaya başla</span>
                </h2>
                <p className="text-white/50 text-lg">
                  Karmaşık kurulum yok. Sadece netlik ve momentum.
                </p>
              </motion.div>
              
              {/* Steps */}
              <div className="space-y-2">
                <StepCard
                  number={1}
                  title="Nöro-profil testi"
                  description="5 dakikalık test ile ADHD paternlerini, enerji döngülerini ve dopamin tetikleyicilerini keşfet."
                  delay={0}
                />
                <StepCard
                  number={2}
                  title="AI koçun ile tanış"
                  description="Profiline göre kişiselleştirilmiş AI koçun, nörokimyasal durumunu anlıyor ve sana özel öneriler sunuyor."
                  delay={0.1}
                />
                <StepCard
                  number={3}
                  title="Body double'a katıl"
                  description="Canlı çalışma odalarına katıl. Yüzlerce kişi seninle birlikte çalışıyor."
                  delay={0.2}
                />
                <StepCard
                  number={4}
                  title="Tamamla ve kutla"
                  description="Görevlerini tamamla, serileri kır, başarılarını toplulukla paylaş."
                  isLast
                  delay={0.3}
                />
              </div>
            </div>
            
            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Decorative orbs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-dopa/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-serotonin/20 rounded-full blur-3xl" />
              
              <div className="relative glass-strong rounded-3xl p-8 border border-dopa/20">
                {/* Neuro Profile Preview */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-dopa to-serotonin flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Nöro-Profil Sonuçların</p>
                      <p className="text-white/40 text-sm">ADHD Tipin: Kombine</p>
                    </div>
                  </div>
                  
                  {/* Neurotransmitter levels */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-dopa-light">Dopamin Duyarlılığı</span>
                        <span className="text-white/60">Yüksek</span>
                      </div>
                      <div className="h-2 rounded-full bg-dopa/10">
                        <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-dopa to-dopa-light" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-serotonin">Odaklanma Kapasitesi</span>
                        <span className="text-white/60">Orta</span>
                      </div>
                      <div className="h-2 rounded-full bg-serotonin/10">
                        <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-serotonin to-serotonin-light" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-norepinephrine">Enerji Dalgalanması</span>
                        <span className="text-white/60">Yüksek</span>
                      </div>
                      <div className="h-2 rounded-full bg-norepinephrine/10">
                        <div className="h-full w-[80%] rounded-full bg-gradient-to-r from-norepinephrine to-norepinephrine-light" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Recommendations */}
                  <div className="p-4 rounded-2xl bg-gaba/5 border border-gaba/10">
                    <p className="text-gaba text-sm font-medium mb-2">AI Koç Önerisi:</p>
                    <p className="text-white/60 text-sm">
                      Sabah saatlerinde yaratıcı işler, öğleden sonra rutin görevler için idealsin. 
                      Body doubling ile %340 daha uzun odaklanabilirsin.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== PRICING PREVIEW ==================== */}
      <section id="fiyatlandirma" className="relative py-24 lg:py-32 px-5 md:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-serotonin/[0.02] to-transparent" />
        
        <div className="max-w-5xl mx-auto relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="chip bg-norepinephrine/10 border-norepinephrine/20 text-norepinephrine mb-6">
              <Award className="w-4 h-4" />
              Basit Fiyatlandırma
            </span>
            <h2 className="font-outfit font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4">
              Ücretsiz başla.{' '}
              <span className="text-gradient-dopa">İhtiyacına göre yükselt.</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Gizli ücret yok. Baskı yok. Sadece beynin için çalışan araçlar.
            </p>
          </motion.div>
          
          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <PricingCard
              name="Ücretsiz"
              price="Ücretsiz"
              description="Temel özelliklerle başla"
              features={[
                'Nöro-profil testi',
                'Günde 3 body double seansı',
                'Temel AI koç (günde 10 mesaj)',
                'Topluluk erişimi'
              ]}
              delay={0}
            />
            <PricingCard
              name="Pro"
              price="₺149"
              description="Tam ekosistem erişimi"
              features={[
                'Ücretsiz\'deki her şey',
                'Sınırsız body double',
                'Sınırsız AI koç',
                'Enerji haritası',
                'Gelişmiş analitikler',
                'Öncelikli destek'
              ]}
              isPopular
              delay={0.1}
            />
            <PricingCard
              name="Takım"
              price="₺299"
              description="Şirketler için"
              features={[
                'Pro\'daki her şey',
                'Özel takım odaları',
                'Takım analitikleri',
                'Admin paneli',
                'API erişimi',
                'Özel entegrasyonlar'
              ]}
              delay={0.2}
            />
          </div>
          
          {/* See full pricing link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-10"
          >
            <Link 
              href="/pricing"
              className="text-dopa-light hover:text-dopa transition-colors inline-flex items-center gap-2"
            >
              Tüm fiyatlandırma detaylarını gör
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="relative py-24 lg:py-32 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="chip bg-endorphin/10 border-endorphin/20 text-endorphin mb-6">
              <Heart className="w-4 h-4" />
              Gerçek Hikayeler
            </span>
            <h2 className="font-outfit font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-4">
              ADHD topluluğundan{' '}
              <span className="text-gradient-energy">başarı hikayeleri</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Döngüyü kıran ve odaklanmayı öğrenen kullanıcılarımız.
            </p>
          </motion.div>
          
          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="Yıllardır mücadele ettiğim tez yazımını DopaLive ile 3 ayda bitirdim. Body doubling hayatımı değiştirdi."
              author="Elif K."
              role="Doktora Öğrencisi"
              before="Günde 30 dk odaklanma"
              after="Günde 4+ saat"
              delay={0}
            />
            <TestimonialCard
              quote="AI koç ne zaman enerjimin düştüğünü biliyor. Tam zamanında müdahale ediyor. Artık deadline kaçırmıyorum."
              author="Mert T."
              role="Yazılım Geliştirici"
              before="Haftada 2 deadline kaçırma"
              after="3 aydır sıfır"
              delay={0.1}
            />
            <TestimonialCard
              quote="Sessiz çalışma odasındaki 34 kişiyle birlikte çalışmak, tek başıma çalışmaktan 10 kat daha verimli."
              author="Zeynep A."
              role="İçerik Üreticisi"
              before="Ayda 2 içerik"
              after="Haftada 3 içerik"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="relative py-24 lg:py-32 px-5 md:px-8">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-dopa/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-dopa/10 blur-[150px] rounded-full" />
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-8"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-dopa to-serotonin flex items-center justify-center shadow-2xl shadow-dopa/30 animate-neural-pulse">
              <Zap className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          
          <h2 className="font-outfit font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-6">
            Odaklanmaya hazır mısın?
          </h2>
          
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-6">
            Şu an 127 kişi DopaLive'da birlikte çalışıyor. 
            Sen de katıl, dopamin optimizasyonu ve body doubling ile farkı hisset.
          </p>
          
          {/* Live indicator */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="flex -space-x-2">
              {['E', 'M', 'Z', 'A', 'K'].map((letter, i) => (
                <div 
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-dopa to-serotonin flex items-center justify-center text-white text-xs font-medium border-2 border-bg"
                >
                  {letter}
                </div>
              ))}
            </div>
            <span className="text-gaba text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gaba animate-pulse" />
              127 kişi şu an çalışıyor
            </span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "px-10 py-5 rounded-full",
              "bg-gradient-to-r from-dopa to-serotonin",
              "text-white font-semibold text-xl",
              "shadow-2xl shadow-dopa/40",
              "hover:shadow-3xl hover:shadow-dopa/50",
              "transition-all duration-300",
              "flex items-center gap-3 mx-auto"
            )}
          >
            Ücretsiz Başla
            <ArrowRight className="w-6 h-6" />
          </motion.button>
          
          <p className="mt-6 text-white/30 text-sm">
            Kredi kartı gerekmez • 2 dakikada başla • İstediğin zaman iptal et
          </p>
        </motion.div>
      </section>

      <SiteFooter />
    </main>
  );
}
