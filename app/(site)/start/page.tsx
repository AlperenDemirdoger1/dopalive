'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowRight, 
  ArrowLeft,
  Brain,
  Flame,
  Sparkles,
  Target,
  CheckCircle2,
  ChevronDown,
  Zap,
  Clock,
  Heart,
  Battery,
  Globe,
  BookOpen,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  QuizAnswers,
  QUIZ_SECTIONS,
  saveQuizProgress,
  loadQuizProgress,
  clearQuizProgress,
  calculateDopamineProfile,
  saveProfile,
  trackQuizEvent,
} from '@/lib/quiz';

// ============================================
// ANIMATION VARIANTS
// ============================================

const pageVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.3 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
};

// ============================================
// SECTION ICONS
// ============================================

const sectionIcons: Record<string, React.ElementType> = {
  intro: Brain,
  dopamine: Zap,
  attention: Target,
  executive: BookOpen,
  emotion: Heart,
  time: Clock,
  energy: Battery,
  environment: Globe,
  context: Sparkles
};

// ============================================
// SECTION COMPLETION INFO
// ============================================

const sectionCompletionInfo: Record<string, { title: string; fact: string; source: string; emoji: string }> = {
  dopamine: {
    title: "Dopamin Sistemi Tamamlandı! 🎉",
    emoji: "🧠",
    fact: "Dünya genelinde 366 milyon yetişkin DEHB'li var ve çoğu dopamin düzenleme desteğine ihtiyaç duyuyor",
    source: "WHO, 2023"
  },
  attention: {
    title: "Dikkat ve Odak Bölümü Tamamlandı! 🎯",
    emoji: "🎯",
    fact: "Türkiye'de 4 milyon yetişkin DEHB'li var ve yalnızca %10'u profesyonel destek alıyor",
    source: "TPD, 2024"
  },
  executive: {
    title: "Yürütücü İşlevler Bölümü Tamamlandı! 📚",
    emoji: "📚",
    fact: "DEHB'li bireylerin %70'i çocukluktan yetişkinliğe taşınır ve görev yönetimi desteğine ihtiyaç duyar",
    source: "CHADD, 2023"
  },
  emotion: {
    title: "Duygusal Düzenleme Bölümü Tamamlandı! ❤️",
    emoji: "❤️",
    fact: "DEHB'li bireylerin %50'sinden fazlası anksiyete ve depresyon deneyimliyor, destek grupları kritik önem taşıyor",
    source: "ADDA, 2023"
  },
  time: {
    title: "Zaman Algısı Bölümü Tamamlandı! ⏰",
    emoji: "⏰",
    fact: "Zaman körlüğü DEHB'li bireylerin %80'inde görülüyor ve görsel zamanlayıcılar en etkili çözümlerden biri",
    source: "Barkley, 2020"
  },
  energy: {
    title: "Enerji Yönetimi Bölümü Tamamlandı! 🔋",
    emoji: "🔋",
    fact: "DEHB'li bireylerde uyku bozuklukları %75 oranında görülüyor, düzenli rutinler yaşam kalitesini önemli ölçüde artırıyor",
    source: "Sleep Foundation, 2023"
  },
  environment: {
    title: "Çevresel Faktörler Bölümü Tamamlandı! 🌍",
    emoji: "🌍",
    fact: "Body doubling ve sosyal hesap verebilirlik DEHB'li bireylerde proje tamamlama oranını 3 katına çıkarıyor",
    source: "ADHD Foundation, 2023"
  }
};

// ============================================
// PROGRESS BAR
// ============================================

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const progress = Math.round((current / total) * 100);
  
  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-muted-foreground text-sm">
          Bölüm {current} / {total}
        </span>
        <span className="text-primary text-sm font-semibold">%{progress}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-warm rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
        />
      </div>
    </div>
  );
};

// ============================================
// LIKERT SCALE COMPONENT
// ============================================

const LikertScale = ({
  value,
  onChange,
  leftLabel,
  rightLabel,
}: {
  value: number;
  onChange: (value: number) => void;
  leftLabel: string;
  rightLabel: string;
}) => (
  <div className="space-y-4">
    <div className="flex gap-3">
      {[1, 2, 3, 4, 5].map((n) => (
  <motion.button
          key={n}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(n)}
          aria-pressed={value === n}
    className={cn(
            "flex-1 h-16 rounded-2xl border-2 transition-all duration-300 font-bold text-xl",
            value === n
              ? "bg-foreground border-foreground text-background shadow-xl scale-110 ring-4 ring-foreground/20"
              : "bg-card border-border text-muted-foreground hover:bg-muted hover:border-foreground/40 hover:text-foreground"
          )}
        >
          {n}
        </motion.button>
      ))}
    </div>
    <div className="flex justify-between text-sm text-muted-foreground px-2">
      <span>{leftLabel}</span>
      <span>{rightLabel}</span>
    </div>
    </div>
);

// ============================================
// SINGLE SELECT COMPONENT
// ============================================

const SingleSelect = ({
  options,
  value,
  onChange,
}: {
  options: Array<{ id: string; label: string; emoji?: string; description?: string }>;
  value: string | undefined;
  onChange: (value: string) => void;
}) => (
  <div className="grid gap-3">
    {options.map((option) => (
  <motion.button
        key={option.id}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => onChange(option.id)}
    className={cn(
          "w-full p-4 rounded-2xl border-2 text-left transition-all duration-200",
          "flex items-center gap-4",
          value === option.id
            ? "bg-primary/10 border-primary shadow-warm-sm"
            : "bg-card border-border hover:bg-muted hover:border-muted-foreground/30"
        )}
      >
        {option.emoji && (
          <span className="text-2xl">{option.emoji}</span>
        )}
        <div className="flex-1">
          <p className={cn(
            "font-semibold",
            value === option.id ? "text-foreground" : "text-foreground/80"
          )}>
            {option.label}
          </p>
          {option.description && (
            <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
          )}
        </div>
        <div className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0",
          value === option.id ? "border-primary bg-primary" : "border-muted-foreground/30"
        )}>
          {value === option.id && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
        </div>
  </motion.button>
    ))}
  </div>
);

// ============================================
// MULTI SELECT COMPONENT
// ============================================

const MultiSelect = ({
  options,
  values,
  onChange,
}: {
  options: Array<{ id: string; label: string; emoji?: string }>;
  values: string[];
  onChange: (values: string[]) => void;
}) => {
  const toggle = (id: string) => {
    if (values.includes(id)) {
      onChange(values.filter(v => v !== id));
    } else {
      onChange([...values, id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {options.map((option) => {
        const selected = values.includes(option.id);
        return (
        <motion.button
            key={option.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggle(option.id)}
          className={cn(
              "relative px-5 py-3.5 rounded-xl border-2 transition-all duration-200",
              "flex items-center gap-2.5",
              selected
                ? "bg-primary/15 border-primary text-foreground shadow-lg ring-2 ring-primary/30 scale-105"
                : "bg-card border-border text-muted-foreground hover:bg-muted hover:border-muted-foreground/30"
            )}
          >
            {selected && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </span>
            )}
            {option.emoji && <span className="text-xl">{option.emoji}</span>}
            <span className={cn("text-sm font-semibold", selected && "text-foreground")}>{option.label}</span>
        </motion.button>
        );
      })}
  </div>
);
};

// ============================================
// WELCOME SCREEN
// ============================================

const WelcomeScreen = ({ onStart }: { onStart: () => void }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-xl mx-auto text-center"
    >
      {/* Hero Icon */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="w-24 h-24 rounded-3xl bg-gradient-warm flex items-center justify-center mx-auto shadow-warm-lg">
          <Flame className="w-12 h-12 text-white" />
        </div>
      </motion.div>
      
      {/* Headline */}
      <motion.h1 
        variants={itemVariants}
        className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4"
      >
        Dopamin Haritanı
        <br />
        <span className="text-gradient">Keşfet</span>
      </motion.h1>
      
      {/* Subheadline */}
      <motion.p 
        variants={itemVariants}
        className="text-muted-foreground text-lg mb-6 max-w-md mx-auto leading-relaxed"
      >
        Beyninin motivasyon, dikkat ve enerji sistemlerini anla. 
        Sana özel stratejiler ve destek planı oluşturalım.
      </motion.p>

      {/* Trust Badge - Scientific References */}
      <motion.div 
        variants={itemVariants}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
          <Shield className="w-3.5 h-3.5" />
          <span>DSM-5 kriterleri ve nörobilim temelli</span>
        </div>
        <p className="text-muted-foreground text-xs mt-3 max-w-md mx-auto leading-relaxed">
          Test, DSM-5 DEHB kriterleri, working memory araştırmaları ve dopaminerjik sistem çalışmalarına dayanmaktadır. 
          <span className="block mt-1 text-muted-foreground/80">
            Klinik değerlendirme yerine geçmez.
          </span>
        </p>
      </motion.div>
      
      {/* Features */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap justify-center gap-3 mb-8"
      >
        {[
          { icon: Clock, text: "~5 dakika" },
          { icon: Brain, text: "Nörokimyasal analiz" },
          { icon: Target, text: "Kişisel profil" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border"
          >
            <item.icon className="w-4 h-4 text-primary" />
            <span className="text-foreground/80 text-sm">{item.text}</span>
          </div>
        ))}
      </motion.div>
      
      {/* CTA */}
      <motion.div variants={itemVariants}>
        <Button
          variant="primary"
          size="xl"
          rightIcon={ArrowRight}
          onClick={onStart}
          className="w-full sm:w-auto px-10"
        >
          Teste Başla
        </Button>
      </motion.div>
      
      {/* Details Toggle */}
      <motion.div variants={itemVariants} className="mt-6">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-muted-foreground hover:text-foreground text-sm transition-colors inline-flex items-center gap-1"
        >
          Ne sorulacak?
          <ChevronDown className={cn("w-4 h-4 transition-transform", showDetails && "rotate-180")} />
        </button>
        
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-5 rounded-2xl bg-card border border-border text-left">
                <p className="text-muted-foreground text-sm mb-3 font-medium">Test bölümleri:</p>
                <ul className="space-y-2 text-foreground/70 text-sm">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Dopamin sistemi - motivasyon ve ödül
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Dikkat düzenleme - odaklanma kalıpları
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Yürütücü işlevler - planlama ve organize olma
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-primary" />
                    Duygusal düzenleme - duygu yönetimi
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Zaman algısı - zaman körlüğü
                  </li>
                  <li className="flex items-center gap-2">
                    <Battery className="w-4 h-4 text-primary" />
                    Enerji kalıpları - günlük ritim
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Safety Note */}
      <motion.p 
        variants={itemVariants}
        className="mt-8 text-muted-foreground text-xs flex items-center justify-center gap-2"
      >
        <Shield className="w-4 h-4" />
        Bu bir tanı değildir. Kendini anlamak için tasarlanmış bir araçtır.
      </motion.p>
    </motion.div>
  );
};

// ============================================
// QUESTION STEP COMPONENT
// ============================================

const QuestionStep = ({
  section,
  answers,
  onAnswer,
}: {
  section: typeof QUIZ_SECTIONS[number];
  answers: Record<string, number | string | string[]>;
  onAnswer: (questionId: string, value: number | string | string[]) => void;
}) => {
  const Icon = sectionIcons[section.id] || Brain;
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto"
    >
      {/* Section Header */}
      <motion.div variants={itemVariants} className="text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-warm flex items-center justify-center mx-auto mb-4 shadow-warm-md">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
          {section.title}
        </h2>
        <p className="text-muted-foreground">{section.subtitle}</p>
      </motion.div>
      
      {/* Questions */}
      <motion.div variants={containerVariants} className="space-y-8">
        {section.questions.map((question, idx) => (
          <motion.div 
            key={question.id}
            variants={itemVariants}
            className="p-6 rounded-2xl bg-card border border-border"
          >
            <div className="mb-4">
              <p className="text-foreground font-medium text-lg mb-1">
                {idx + 1}. {question.text}
              </p>
              {question.subtext && (
                <p className="text-muted-foreground text-sm">{question.subtext}</p>
              )}
            </div>

            {question.type === "scale" && (
            <LikertScale
                value={(answers[question.id] as number) || 0}
                onChange={(v) => onAnswer(question.id, v)}
                leftLabel={question.scaleLabels?.left || "Az"}
                rightLabel={question.scaleLabels?.right || "Çok"}
              />
            )}

            {question.type === "single" && question.options && (
              <SingleSelect
                options={question.options}
                value={answers[question.id] as string | undefined}
                onChange={(v) => onAnswer(question.id, v)}
              />
            )}

            {question.type === "multi" && question.options && (
              <MultiSelect
                options={question.options}
                values={(answers[question.id] as string[]) || []}
                onChange={(v) => onAnswer(question.id, v)}
              />
            )}
        </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// ============================================
// MAIN QUIZ COMPONENT
// ============================================

// Intro ekranını çıkararak quiz bölümlerini al
const QUIZ_STEP_SECTIONS = QUIZ_SECTIONS.filter(s => s.id !== "intro");
const TOTAL_STEPS = QUIZ_STEP_SECTIONS.length;

export default function StartPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0 = welcome, 1+ = quiz sections
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number | string | string[]>>({});
  const [showCompletionInfo, setShowCompletionInfo] = useState(false);
  const [completedSectionId, setCompletedSectionId] = useState<string | null>(null);

  // Load saved progress
  useEffect(() => {
    const saved = loadQuizProgress();
    if (saved && saved.step > 0) {
      setStep(saved.step);
      setAnswers(saved.answers as Record<string, number | string | string[]>);
    }
  }, []);
  
  // Save progress
  useEffect(() => {
    if (step > 0) {
      saveQuizProgress(step, answers as Partial<QuizAnswers>);
    }
  }, [step, answers]);
  
  // Scroll to top on step change
  useEffect(() => {
    if (typeof window !== 'undefined' && step > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);
  
  // Scroll to top when completion info is shown
  useEffect(() => {
    if (typeof window !== 'undefined' && showCompletionInfo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showCompletionInfo]);
  
  const handleStart = useCallback(() => {
    clearQuizProgress();
    setAnswers({});
    setQuizStartTime(Date.now());
      trackQuizEvent({ type: "quiz_started", timestamp: new Date() });
    setStep(1);
  }, []);

  const handleAnswer = useCallback((questionId: string, value: number | string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const currentSection = step > 0 ? QUIZ_STEP_SECTIONS[step - 1] : null;
  
  const canProceed = useCallback(() => {
    if (step === 0) return true;
    if (!currentSection) return false;
    
    // Tüm sorular cevaplanmış mı kontrol et
    return currentSection.questions.every(q => {
      const answer = answers[q.id];
      if (q.type === "scale") return typeof answer === "number" && answer > 0;
      if (q.type === "single") return typeof answer === "string" && answer.length > 0;
      if (q.type === "multi") return Array.isArray(answer) && answer.length > 0;
      return false;
    });
  }, [step, currentSection, answers]);
  
  const handleNext = useCallback(async () => {
    if (!canProceed()) return;
    
    if (step === TOTAL_STEPS) {
      // Quiz tamamlandı - profil hesapla
      setIsAnalyzing(true);
      
      const duration = quizStartTime ? Date.now() - quizStartTime : 0;
      trackQuizEvent({ type: "quiz_completed", duration, timestamp: new Date() });

      // Cevapları QuizAnswers formatına dönüştür
      const quizAnswers: Partial<QuizAnswers> = {
        noveltySeekingScore: (answers.novelty_seeking as number) || 3,
        rewardSensitivityScore: (answers.reward_sensitivity as number) || 3,
        boredomThresholdScore: (answers.boredom_threshold as number) || 3,
        delayedGratificationScore: (answers.delayed_gratification as number) || 3,
        sustainedAttentionScore: (answers.sustained_attention as number) || 3,
        selectiveAttentionScore: (answers.selective_attention as number) || 3,
        attentionShiftingScore: (answers.attention_shifting as number) || 3,
        hyperfocusFrequency: (answers.hyperfocus as number) || 3,
        taskInitiationScore: (answers.task_initiation as number) || 3,
        planningScore: (answers.planning as number) || 3,
        workingMemoryScore: (answers.working_memory as number) || 3,
        inhibitionScore: (answers.inhibition as number) || 3,
        cognitiveFlexibilityScore: (answers.flexibility as number) || 3,
        emotionalReactivityScore: (answers.emotional_intensity as number) || 3,
        frustrationToleranceScore: (answers.frustration_tolerance as number) || 3,
        rejectionSensitivityScore: (answers.rejection_sensitivity as number) || 3,
        emotionalRecoveryScore: (answers.emotional_recovery as number) || 3,
        timeBlindnessScore: (answers.time_blindness as number) || 3,
        urgencyDependenceScore: (answers.urgency_dependence as number) || 3,
        estimationAccuracyScore: (answers.estimation as number) || 3,
        energyConsistencyScore: (answers.energy_consistency as number) || 3,
        externalStructureNeed: (answers.external_structure as number) || 3,
        socialAccountabilityScore: (answers.accountability as number) || 3,
        environmentSensitivityScore: (answers.environment_sensitivity as number) || 3,
        diagnosisStatus: (answers.diagnosis_status as "diagnosed" | "suspected" | "exploring" | "none") || "exploring",
        ageRange: (answers.age_range as string) || "25-34",
        currentChallenges: (answers.main_challenges as string[]) || [],
        goals: (answers.goals as string[]) || [],
      };

      const profile = calculateDopamineProfile(quizAnswers);

      try {
        await fetch("/api/quiz/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            archetype: profile.archetype,
            scores: profile.scores,
            insights: profile.insights,
            recommendedPlan: profile.recommendedPlan,
            planReasoning: profile.planReasoning,
          }),
        });
      } catch (err) {
        console.error("quiz submit failed", err);
      }

        saveProfile(profile);
        clearQuizProgress();
        
      trackQuizEvent({ type: "profile_shown", archetypeKey: profile.archetypeKey, timestamp: new Date() });
      
          router.push('/start/result');
    } else {
      // If completion info is showing, close it and continue
      if (showCompletionInfo) {
        setShowCompletionInfo(false);
        setStep(step + 1);
        return;
      }
      
      if (currentSection) {
        trackQuizEvent({ type: "section_completed", sectionId: currentSection.id, timestamp: new Date() });
        
        // Show completion info for sections (except intro)
        if (currentSection.id !== 'intro' && sectionCompletionInfo[currentSection.id]) {
          setCompletedSectionId(currentSection.id);
          setShowCompletionInfo(true);
          return;
        }
      }
      setStep(step + 1);
    }
  }, [step, canProceed, answers, quizStartTime, currentSection, router, showCompletionInfo]);
  
  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    } else if (step === 1) {
      setStep(0);
    }
  }, [step]);
  
  const handleReset = useCallback(() => {
    clearQuizProgress();
    setStep(0);
    setAnswers({});
  }, []);
  
  // Analyzing state
  if (isAnalyzing) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-full border-4 border-muted border-t-primary mx-auto mb-6"
          />
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            Dopamin haritanı oluşturuyoruz...
          </h2>
          <p className="text-muted-foreground">
            Nörokimyasal profilin hesaplanıyor
          </p>
        </motion.div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" />
      </div>
      
      {/* Reset Button (Global SiteHeader is used from layout) */}
          {step > 0 && (
        <div className="fixed top-6 right-5 md:right-8 z-50">
            <button
            onClick={handleReset}
            className="text-muted-foreground hover:text-foreground text-sm transition-colors bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border"
          >
            Baştan Başla
            </button>
        </div>
      )}
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col pt-24 pb-32 px-5 md:px-8">
        {/* Progress Bar */}
        {step > 0 && (
          <ProgressBar current={step} total={TOTAL_STEPS} />
        )}
        
        {/* Section Completion Info Modal */}
        <AnimatePresence>
          {showCompletionInfo && completedSectionId && sectionCompletionInfo[completedSectionId] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => {
                setShowCompletionInfo(false);
                setStep(step + 1);
              }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl border-2 border-border p-6 md:p-8 max-w-lg w-full shadow-2xl"
              >
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{sectionCompletionInfo[completedSectionId].emoji}</div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    {sectionCompletionInfo[completedSectionId].title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Harika ilerliyorsun! İşte bu bölümle ilgili ilginç bir bilgi:
                  </p>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6 p-5 rounded-xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-2 border-primary/20"
                >
                  <p className="text-base text-foreground leading-relaxed font-medium mb-2">
                    {sectionCompletionInfo[completedSectionId].fact}
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    Kaynak: {sectionCompletionInfo[completedSectionId].source}
                  </p>
                </motion.div>
                
                <p className="text-muted-foreground text-sm text-center">
                  Alttaki butona tıklayarak devam edebilirsin
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Step Content */}
        <div className="flex-1 flex items-center justify-center py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              {step === 0 ? (
                <WelcomeScreen onStart={handleStart} />
              ) : currentSection ? (
                <QuestionStep
                  section={currentSection}
                  answers={answers}
                  onAnswer={handleAnswer}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Navigation Buttons */}
      {step > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 py-5 px-5 md:px-8">
          <div className="max-w-2xl mx-auto flex items-center gap-4 rounded-2xl bg-card/95 border border-border shadow-lg shadow-primary/10 backdrop-blur-lg px-4 py-3">
            <Button
              variant="ghost"
              size="lg"
              leftIcon={ArrowLeft}
              onClick={handleBack}
              className="px-6"
            >
              Geri
            </Button>

            <Button
              variant="primary"
              size="xl"
              rightIcon={step === TOTAL_STEPS ? Sparkles : ArrowRight}
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 px-10 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-orange-400 shadow-warm-lg"
            >
              {step === TOTAL_STEPS ? "Sonuçlarımı Gör" : "Devam Et"}
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
