'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Brain,
  Sparkles,
  Target,
  CheckCircle2,
  ArrowRight,
  Zap,
  Heart,
  Clock,
  TrendingUp,
  Shield,
  Lightbulb,
  Users,
  Star,
  Flame,
  Check,
  AlertTriangle,
  Award,
  Timer,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DopamineProfile,
  loadProfile,
  clearQuizProgress,
  trackQuizEvent,
  DOPAMINE_ARCHETYPES,
} from '@/lib/quiz';

// ============================================
// ANIMATION VARIANTS
// ============================================

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
};

// ============================================
// PRICING PLANS (3-tier system)
// ============================================

const pricingPlans = [
  {
    id: "explorer",
    name: "Keşfet",
    tagline: "AI araçlarını dene",
    price: 0,
    description: "Dopamin odaklı AI araçlarını keşfet, topluluğu tanı.",
    highlight: false,
    features: [
      { text: "Doppa - AI Dopamin Koçu", detail: "Günde 5 mesaj", included: true },
      { text: "Temel odak araçları", included: true },
      { text: "Topluluk erişimi", detail: "Salt okunur", included: true },
      { text: "Body Doubling seansları", included: false },
      { text: "1:1 İnsan koçluk", included: false },
    ],
    cta: "Ücretsiz Başla",
    ctaVariant: "outline" as const
  },
  {
    id: "focus",
    name: "Odak",
    tagline: "AI + Body Doubling",
    price: 590,
    description: "Sınırsız AI desteği ve canlı Body Doubling seanslarıyla odaklan.",
    highlight: false,
    features: [
      { text: "Sınırsız Doppa - AI Dopamin Koçu", detail: "7/24", included: true },
      { text: "Tüm odak araçları & şablonlar", included: true },
      { text: "Topluluk erişimi", detail: "Tam", included: true },
      { text: "Body Doubling seansları", detail: "Günlük 4+ seans", included: true },
      { text: "1:1 İnsan koçluk", included: false },
    ],
    cta: "7 Gün Ücretsiz Dene",
    ctaVariant: "secondary" as const
  },
  {
    id: "coaching",
    name: "Koçluk",
    tagline: "Tam sistem",
    price: 3900,
    description: "DEHB uzmanı koç + AI + Body Doubling + Pod. Projeni bitirmenin garantisi.",
    highlight: true,
    badge: "🔥 Gerçek Dönüşüm",
    features: [
      { text: "Haftalık 1:1 koç seansları", detail: "45 dakika", included: true, premium: true },
      { text: "DEHB sertifikalı uzman koç", included: true, premium: true },
      { text: "Sınırsız AI + Body Doubling", included: true },
      { text: "Eşleştirilmiş Pod grubu", detail: "4-5 kişi", included: true, premium: true },
      { text: "30 gün para iade garantisi", included: true },
    ],
    cta: "Koçunla Eşleş",
    ctaVariant: "primary" as const,
    savings: "Geleneksel koçluktan %70 tasarruf"
  }
];

// ============================================
// COACH PROFILES
// ============================================

// Use same expert profiles as experts page
const coaches = [
  {
    name: "Simay Selek",
    title: "Bilişsel ve Hesaplamalı Sinirbilimci",
    university: "ODTÜ",
    specialties: ["Sertifikalı BDT Terapisti"],
    experience: "2+ yıl DEHB deneyimi",
    image: "/experts/simay.jpg"
  },
  {
    name: "Ömer Evren Yılmaz",
    title: "Psikolog",
    university: "Dokuz Eylül Üniversitesi",
    specialties: ["BDT", "Aile Terapisti"],
    experience: "3+ yıl DEHB deneyimi",
    image: "/experts/evren.jpg"
  },
  {
    name: "Görkem Demirdöğer",
    title: "Klinik Psikolog",
    university: "Boğaziçi Üniversitesi",
    specialties: ["Klinik Uzmanlık"],
    experience: "15+ yıl DEHB deneyimi",
    image: "/experts/gorkem.jpg"
  }
];

// ============================================
// DEHB STATISTICS (Turkey & Global)
// ============================================

const dehbStats = [
  {
    value: "~4 Milyon",
    label: "Türkiye'de DEHB'li yetişkin",
    detail: "Yalnızca %10'u tanı almış",
    icon: Users
  },
  {
    value: "%70",
    label: "Çocukluk DEHB'si yetişkinliğe taşınır",
    detail: "Tanısız kalmanın sonuçları ağır",
    icon: TrendingUp
  },
  {
    value: "%65",
    label: "Potansiyelin altında performans",
    detail: "Doğru destekle tamamen önlenebilir",
    icon: Target
  }
];

// ============================================
// URGENCY & SOCIAL PROOF
// ============================================


// ============================================
// SCORE BAR COMPONENT
// ============================================

const ScoreBar = ({ label, score, color = "primary" }: { label: string; score: number; color?: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-foreground/80">{label}</span>
      <span className="text-primary font-semibold">%{score}</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.3 }}
        className={cn(
          "h-full rounded-full",
          color === "primary" && "bg-gradient-warm",
          color === "accent" && "bg-gradient-focus",
          color === "success" && "bg-gradient-reward"
        )}
      />
    </div>
  </div>
);

// ============================================
// COACH CARD COMPONENT
// ============================================

const CoachCard = ({ coach, index }: { coach: typeof coaches[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="p-6 rounded-2xl bg-card border border-border h-full flex flex-col items-center text-center"
  >
    {/* Profile Image */}
    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary/20">
      <img 
        src={coach.image} 
        alt={coach.name}
        className="w-full h-full object-cover"
      />
    </div>
    
    {/* Name & Title */}
    <h3 className="text-foreground font-bold text-lg mb-1">{coach.name}</h3>
    <p className="text-primary text-sm font-medium mb-2">{coach.title}</p>
    
    {/* University */}
    <p className="text-muted-foreground text-xs mb-3">{coach.university}</p>
    
    {/* Specialties */}
    <div className="flex flex-wrap gap-2 justify-center mb-3">
      {coach.specialties.map((specialty, i) => (
        <span key={i} className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs">
          {specialty}
        </span>
      ))}
    </div>
    
    {/* Experience */}
    <p className="text-sm text-primary font-semibold mt-auto">
      {coach.experience}
    </p>
  </motion.div>
);

// ============================================
// PRICING CARD COMPONENT
// ============================================

const PricingCard = ({ plan, index, isRecommended }: { plan: typeof pricingPlans[0]; index: number; isRecommended: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -4 }}
    className={cn(
      "relative p-6 rounded-2xl border transition-all duration-300 flex flex-col",
      plan.highlight
        ? "bg-gradient-to-b from-primary/[0.08] via-accent/[0.04] to-transparent border-primary/40 shadow-warm-md"
        : "bg-card border-border hover:border-primary/30"
    )}
  >
    {/* Top accent for highlighted */}
    {plan.highlight && (
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-t-2xl" />
    )}
    
    {/* Badge */}
    {plan.badge && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-warm text-white text-xs font-bold whitespace-nowrap shadow-warm-sm">
        {plan.badge}
      </span>
    )}
    
    {/* Recommended indicator */}
    {isRecommended && !plan.highlight && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-white text-xs font-semibold whitespace-nowrap">
        Sana Önerilen
      </span>
    )}
    
    {/* Header */}
    <div className="mb-4">
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{plan.tagline}</p>
      <h3 className="text-xl font-display font-bold text-foreground">{plan.name}</h3>
    </div>
    
    {/* Price */}
    <div className="mb-4">
      <div className="flex items-baseline gap-1">
        {plan.price > 0 && <span className="text-muted-foreground text-lg">₺</span>}
        <span className={cn(
          "font-bold text-foreground",
          plan.highlight ? "text-4xl" : "text-3xl"
        )}>
          {plan.price === 0 ? "Ücretsiz" : plan.price.toLocaleString('tr-TR')}
        </span>
        {plan.price > 0 && <span className="text-muted-foreground text-sm">/ay</span>}
      </div>
    </div>
    
    {/* Description */}
    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{plan.description}</p>
    
    {/* Savings */}
    {plan.savings && (
      <div className="mb-5 p-3 rounded-lg bg-success/10 border border-success/20">
        <p className="text-xs text-success font-medium">{plan.savings}</p>
      </div>
    )}
    
    {/* Features */}
    <ul className="space-y-3 mb-6 flex-1">
      {plan.features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-sm">
          <span className="mt-0.5 flex-shrink-0">
            {feature.included ? (
              <Check className={cn("w-4 h-4", (feature as any).premium ? "text-primary" : "text-success")} />
            ) : (
              <span className="w-4 h-4 rounded-full border border-muted-foreground/30 block" />
            )}
          </span>
          <div>
            <span className={cn(
              feature.included ? "text-foreground/80" : "text-muted-foreground",
              (feature as any).premium && "font-medium"
            )}>
              {feature.text}
            </span>
            {feature.detail && (
              <span className={cn(
                "ml-1 text-xs",
                feature.included ? ((feature as any).premium ? "text-primary/60" : "text-muted-foreground") : "text-muted-foreground"
              )}>
                ({feature.detail})
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
    
    {/* CTA */}
    <Button
      variant={plan.ctaVariant}
      size="lg"
      className={cn(
        "w-full font-semibold",
        plan.highlight && "shadow-warm-md"
      )}
      onClick={() => {
        if (typeof window !== 'undefined') {
          const event = new CustomEvent('openEarlyAccessForm', { detail: { planId: plan.id } });
          window.dispatchEvent(event);
        }
      }}
    >
      Erken Erişim İçin Tıkla
    </Button>
  </motion.div>
);

// ============================================
// MAIN RESULT PAGE
// ============================================

// Mock profile for preview
const mockProfile: DopamineProfile = {
  id: "mock-profile-123",
  archetypeKey: "seeker",
  archetype: DOPAMINE_ARCHETYPES.seeker,
  scores: {
    dopamineSystem: 78,
    attentionRegulation: 65,
    executiveFunction: 72,
    emotionalRegulation: 68,
    timePerception: 55,
    energyManagement: 70,
    externalSupport: 75
  },
  subScores: {
    noveltySeekingRaw: 4.2,
    hyperfocusRaw: 2.8,
    impulsivityRaw: 3.5,
    timeBlindnessRaw: 4.0,
    emotionalReactivityRaw: 3.2
  },
  insights: [
    "Dopamin sistemin yüksek uyaran gerektiriyor",
    "Kısa süreli odaklanma blokları senin için daha etkili",
    "Body doubling desteği odaklanmanı %40 artırabilir"
  ],
  recommendedPlan: "coaching",
  planReasoning: "Dopamin Avcısı profili ve yüksek düzenleme ihtiyacınız göz önüne alındığında, birebir koçluk desteği en etkili olacaktır.",
  createdAt: new Date()
};

export default function ResultPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<DopamineProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEarlyAccessForm, setShowEarlyAccessForm] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestedFeatures: [] as string[],
    comments: ''
  });
  
  const interestOptions = [
    { id: 'ai', label: 'Doppa - AI Dopamin Koçu', icon: '🤖' },
    { id: 'body_doubling', label: 'Body Doubling Seansları', icon: '👥' },
    { id: 'coaching', label: 'Uzman Koç Desteği', icon: '🎯' },
    { id: 'adhd_focused', label: 'DEHB Odaklı Platform', icon: '🧠' },
    { id: 'community', label: 'Topluluk ve Destek', icon: '💬' },
    { id: 'tools', label: 'Odak Araçları ve Şablonlar', icon: '🛠️' }
  ];
  
  const toggleInterest = (id: string) => {
    setFormData(prev => ({
      ...prev,
      interestedFeatures: prev.interestedFeatures.includes(id)
        ? prev.interestedFeatures.filter(f => f !== id)
        : [...prev.interestedFeatures, id]
    }));
  };

  useEffect(() => {
    // Check for mock mode
    const searchParams = new URLSearchParams(window.location.search);
    const isMock = searchParams.get('mock') === 'true';
    
    if (isMock) {
      setProfile(mockProfile);
      setLoading(false);
    } else {
    const stored = loadProfile();
      if (stored) {
        setProfile(stored);
      } else {
        router.push('/start');
      }
      setLoading(false);
    }
    
    // Listen for early access form open event
    const handleOpenForm = (e: CustomEvent) => {
      setSelectedPlanId(e.detail.planId);
      setShowEarlyAccessForm(true);
    };
    
    window.addEventListener('openEarlyAccessForm', handleOpenForm as EventListener);
    
    return () => {
      window.removeEventListener('openEarlyAccessForm', handleOpenForm as EventListener);
    };
  }, [router]);

  const handleEarlyAccessSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || formData.interestedFeatures.length === 0) {
      alert('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }
    
    try {
      const res = await fetch('/api/forms/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interestedFeatures: formData.interestedFeatures,
          comments: formData.comments,
          selectedPlanId: selectedPlanId,
          source: 'result_page'
        }),
      });

      if (!res.ok) {
        throw new Error('Başvuru kaydedilemedi');
      }

      alert('Başvurunuz alındı! En kısa sürede size ulaşacağız.');
      setShowEarlyAccessForm(false);
      setFormData({ name: '', email: '', phone: '', interestedFeatures: [], comments: '' });
      setSelectedPlanId(null);
    } catch (err) {
      console.error(err);
      alert('Gönderirken bir hata oluştu. Lütfen tekrar dene.');
    }
  };

  const handlePlanSelect = useCallback(
    (planId: string) => {
      trackQuizEvent({ type: 'plan_selected', plan: planId, timestamp: new Date() });
      router.push(`/pricing?plan=${planId}`);
    },
    [router]
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            className="w-14 h-14 rounded-full border-4 border-muted border-t-primary mx-auto mb-4"
          />
          <p className="text-muted-foreground font-medium">Profilin hazırlanıyor...</p>
        </motion.div>
      </main>
    );
  }

  if (!profile) return null;

  const { archetype, scores, insights } = profile;

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-[-200px] w-[520px] h-[520px] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[520px] h-[520px] bg-accent/10 rounded-full blur-[140px]" />
      </div>


      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-24 pb-16 relative z-10">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-muted-foreground text-sm mb-2 uppercase tracking-[0.2em]">
              Dikkat ve Odak Profilin Hazır
            </p>
            <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-warm shadow-warm-md">
                <span className="text-2xl">{archetype.emoji}</span>
              </span>
              {archetype.name}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">{archetype.tagline}</p>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* Archetype Description */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
            className="lg:col-span-2 p-6 rounded-3xl bg-card border border-border"
        >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-warm flex items-center justify-center shadow-warm-md">
                <span className="text-3xl">{archetype.emoji}</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dikkat Arketipin</p>
                <p className="text-xl font-display font-bold">{archetype.name}</p>
              </div>
            </div>
            <p className="text-foreground/80 mb-5 leading-relaxed">{archetype.description}</p>
            
            {/* Neuroscience Insight */}
            <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-accent mb-1">Nörobilimsel İçgörü</p>
                  <p className="text-sm text-foreground/70">{archetype.neuroscienceInsight}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scores Panel */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="p-6 rounded-3xl bg-card border border-border"
          >
            <h3 className="font-display font-bold text-lg mb-5 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Profil Skorların
            </h3>
            <div className="space-y-5">
              <ScoreBar label="Dopamin Sistemi" score={scores.dopamineSystem} color="primary" />
              <ScoreBar label="Dikkat Düzenleme" score={scores.attentionRegulation} color="accent" />
              <ScoreBar label="Yürütücü İşlevler" score={scores.executiveFunction} color="primary" />
              <ScoreBar label="Duygusal Düzenleme" score={scores.emotionalRegulation} color="accent" />
              <ScoreBar label="Zaman Algısı" score={scores.timePerception} color="primary" />
          </div>
        </motion.div>
        </div>

        {/* Strengths & Challenges */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-6 mb-10"
        >
          {/* Strengths */}
          <motion.div variants={staggerItem} className="p-6 rounded-3xl bg-success/5 border border-success/20">
            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2 text-success">
              <Sparkles className="w-5 h-5" />
              Güçlü Yönlerin
            </h3>
            <ul className="space-y-3">
              {archetype.strengths.map((item, i) => (
                <li key={i} className="flex gap-3 text-foreground/80">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Challenges */}
          <motion.div variants={staggerItem} className="p-6 rounded-3xl bg-destructive/5 border border-destructive/20">
            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2 text-destructive">
              <Target className="w-5 h-5" />
              Çalışma Alanların
            </h3>
            <ul className="space-y-3">
              {archetype.challenges.map((item, i) => (
                <li key={i} className="flex gap-3 text-foreground/80">
                  <Clock className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Strategies */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="p-6 rounded-3xl bg-card border border-border mb-10"
        >
          <h3 className="font-display font-bold text-lg mb-5 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-secondary" />
            Sana Özel Stratejiler
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {archetype.strategies.map((strategy, i) => (
              <div key={i} className="flex gap-3 p-4 rounded-xl bg-muted/50">
                <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground/80">{strategy}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Insights */}
        {insights.length > 0 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="p-6 rounded-3xl bg-accent/5 border border-accent/20 mb-10"
          >
            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2 text-accent">
              <Brain className="w-5 h-5" />
              Kişisel İçgörülerin
            </h3>
            <ul className="space-y-3">
              {insights.map((insight, i) => (
                <li key={i} className="flex gap-3 text-foreground/80">
                  <span className="text-accent">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* DEHB Statistics Section (Neuromarketing - Social Proof) */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium mb-4">
              <AlertTriangle className="w-3.5 h-3.5" />
              Türkiye'de DEHB Gerçeği
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              Yalnız Değilsin — Milyonlarca Kişi Aynı Mücadelede
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tanı almamış DEHB, potansiyelin önündeki en büyük engel. Doğru destekle her şey değişebilir.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {dehbStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400 mb-2">
                  {stat.value}
                </p>
                <p className="text-foreground font-medium mb-1">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommended Coaches Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium mb-4">
              <Award className="w-3.5 h-3.5" />
              Sertifikalı Uzmanlar
                </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              Önerilen Koçlarınız
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {archetype.name} profiline uygun, alanında uzman koçlarımızla tanışın.
            </p>
            </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {coaches.map((coach, i) => (
              <CoachCard key={i} coach={coach} index={i} />
            ))}
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Fotoğraflar ve detaylı profiller yakında eklenecek
            </p>
          </div>
        </motion.div>


        {/* Pricing Plans */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              Sana En Uygun Planı Seç
            </h2>
            <p className="text-muted-foreground">
              {archetype.name} profili için <strong className="text-primary">Koçluk</strong> planı öneriyoruz
            </p>
                  </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                index={i}
                isRecommended={plan.id === profile.recommendedPlan}
              />
            ))}
          </div>
        </motion.div>

        {/* Trust Message */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-2 border-primary/20 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-display font-bold text-foreground">
                Seni ve beynini en iyi anlayan uzmanlar tarafından yazılmış bir platform
              </h3>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto">
              DEHB uzmanları, nörobilimciler ve koçların bir araya gelerek oluşturduğu bu platform, 
              senin benzersiz zihinsel yapını anlıyor. <strong className="text-foreground">Yalnız değilsin.</strong> 
              Burada senin gibi düşünen, senin gibi yaşayan binlerce insan var.
            </p>
          </div>
          </motion.div>

        {/* Final CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Ana Sayfaya Dön
            </Link>
            <span className="text-border">•</span>
            <Link href="/experts/apply" className="text-primary hover:text-primary/80 text-sm transition-colors flex items-center gap-1">
              <Users className="w-4 h-4" />
              Koçluğu Keşfet
            </Link>
            </div>
        </motion.div>
      </div>
      
      {/* Early Access Form Modal */}
      <AnimatePresence>
        {showEarlyAccessForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowEarlyAccessForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl border-2 border-border p-6 md:p-8 max-w-lg w-full shadow-2xl"
            >
              <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                Erken Erişim Başvurusu
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Size ulaşabilmemiz için bilgilerinizi paylaşın
              </p>
              
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ad Soyad <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    E-posta <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="ornek@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Telefon <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="05XX XXX XX XX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    En çok ilginizi çeken kısım <span className="text-destructive">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {interestOptions.map((option) => {
                      const isSelected = formData.interestedFeatures.includes(option.id);
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => toggleInterest(option.id)}
                          className={cn(
                            "p-3 rounded-xl border-2 transition-all text-left",
                            isSelected
                              ? "bg-primary/10 border-primary text-foreground shadow-md"
                              : "bg-white border-border text-foreground hover:border-primary/50"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{option.icon}</span>
                            <span className="text-sm font-medium">{option.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Birden fazla seçenek seçebilirsiniz
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ek Yorumlarınız
                  </label>
                  <textarea
                    value={formData.comments}
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                    placeholder="Eklemek istediğiniz bir şey var mı?"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowEarlyAccessForm(false);
                      setFormData({ name: '', email: '', phone: '', interestedFeatures: [], comments: '' });
                      setSelectedPlanId(null);
                    }}
                    className="flex-1"
                  >
                    İptal
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleEarlyAccessSubmit}
                    disabled={!formData.name || !formData.email || !formData.phone || formData.interestedFeatures.length === 0}
                    className="flex-1"
                  >
                    Gönder
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
