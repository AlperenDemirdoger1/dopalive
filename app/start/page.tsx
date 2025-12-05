'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Rocket, 
  ArrowRight, 
  ArrowLeft,
  Clock,
  Brain,
  Sparkles,
  Heart,
  Target,
  CheckCircle2,
  ChevronDown,
  Zap,
  Users,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  QuizAnswers,
  ProjectType,
  StuckStage,
  ADHDPatterns,
  PROJECT_TYPE_OPTIONS,
  STUCK_STAGE_OPTIONS,
  EMOTION_OPTIONS,
  saveQuizProgress,
  loadQuizProgress,
  clearQuizProgress,
  mapQuizToProfile,
  saveProfile,
  trackQuizEvent,
} from '@/lib/quiz';

// ============================================
// ANIMATION VARIANTS
// ============================================

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -4, transition: { duration: 0.2 } },
  tap: { scale: 0.98 }
};

// ============================================
// CONFETTI COMPONENT
// ============================================

const Confetti = ({ show }: { show: boolean }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            y: -20, 
            x: Math.random() * window.innerWidth,
            rotate: 0,
            opacity: 1
          }}
          animate={{ 
            y: window.innerHeight + 100,
            x: Math.random() * window.innerWidth,
            rotate: Math.random() * 720 - 360,
            opacity: 0
          }}
          transition={{ 
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: "easeOut"
          }}
          className={cn(
            "absolute w-3 h-3 rounded-sm",
            i % 5 === 0 && "bg-[#FF6B6B]",
            i % 5 === 1 && "bg-[#FF8E53]",
            i % 5 === 2 && "bg-[#10B981]",
            i % 5 === 3 && "bg-[#8B5CF6]",
            i % 5 === 4 && "bg-[#FBBF24]"
          )}
        />
      ))}
    </div>
  );
};

// ============================================
// PROGRESS BAR
// ============================================

const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  const progress = ((currentStep) / totalSteps) * 100;
  
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/40 text-sm font-medium">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-coral text-sm font-semibold">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
};

// ============================================
// OPTION CARD (for single select)
// ============================================

const OptionCard = ({
  selected,
  onClick,
  emoji,
  label,
  description,
  disabled = false,
}: {
  selected: boolean;
  onClick: () => void;
  emoji: string;
  label: string;
  description?: string;
  disabled?: boolean;
}) => (
  <motion.button
    variants={cardHover}
    initial="rest"
    whileHover={disabled ? "rest" : "hover"}
    whileTap={disabled ? "rest" : "tap"}
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "w-full p-4 rounded-2xl border text-left transition-all duration-200",
      "flex items-start gap-4",
      selected 
        ? "bg-[#FF6B6B]/10 border-[#FF6B6B]/40 shadow-lg shadow-[#FF6B6B]/10" 
        : "bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.12]",
      disabled && "opacity-50 cursor-not-allowed"
    )}
  >
    <div className={cn(
      "w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0",
      selected ? "bg-[#FF6B6B]/20" : "bg-white/[0.05]"
    )}>
      {emoji}
    </div>
    <div className="flex-1 min-w-0">
      <p className={cn(
        "font-semibold text-base",
        selected ? "text-white" : "text-white/80"
      )}>
        {label}
      </p>
      {description && (
        <p className={cn(
          "text-sm mt-1",
          selected ? "text-white/70" : "text-white/40"
        )}>
          {description}
        </p>
      )}
    </div>
    <div className={cn(
      "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1",
      selected ? "border-[#FF6B6B] bg-[#FF6B6B]" : "border-white/20"
    )}>
      {selected && <CheckCircle2 className="w-4 h-4 text-white" />}
    </div>
  </motion.button>
);

// ============================================
// EMOTION CHIP (for multi-select)
// ============================================

const EmotionChip = ({
  selected,
  onClick,
  emoji,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  emoji: string;
  label: string;
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={cn(
      "px-4 py-3 rounded-xl border transition-all duration-200",
      "flex items-center gap-2",
      selected 
        ? "bg-[#FF6B6B]/10 border-[#FF6B6B]/40 text-white" 
        : "bg-white/[0.02] border-white/[0.08] text-white/60 hover:bg-white/[0.04] hover:border-white/[0.12] hover:text-white/80"
    )}
  >
    <span className="text-lg">{emoji}</span>
    <span className="text-sm font-medium">{label}</span>
  </motion.button>
);

// ============================================
// LIKERT SCALE
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
  <div className="space-y-3">
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <motion.button
          key={n}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(n)}
          className={cn(
            "flex-1 h-12 rounded-xl border transition-all duration-200 font-semibold",
            value === n
              ? "bg-[#FF6B6B] border-[#FF6B6B] text-white shadow-lg shadow-[#FF6B6B]/30"
              : "bg-white/[0.02] border-white/[0.08] text-white/60 hover:bg-white/[0.05] hover:border-white/[0.15]"
          )}
        >
          {n}
        </motion.button>
      ))}
    </div>
    <div className="flex justify-between text-xs text-white/40">
      <span>{leftLabel}</span>
      <span>{rightLabel}</span>
    </div>
  </div>
);

// ============================================
// STEP COMPONENTS
// ============================================

// Step 0: Welcome Screen
const WelcomeScreen = ({ onStart }: { onStart: () => void }) => {
  const [showExamples, setShowExamples] = useState(false);
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-xl mx-auto text-center"
    >
      {/* Hero Icon */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center mx-auto shadow-2xl shadow-[#FF6B6B]/30">
          <Brain className="w-10 h-10 text-white" />
        </div>
      </motion.div>
      
      {/* Headline */}
      <motion.h1 
        variants={itemVariants}
        className="font-syne font-bold text-3xl md:text-4xl text-white mb-4"
      >
        Let's map how your brain
        <br />
        <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent">
          finishes projects.
        </span>
      </motion.h1>
      
      {/* Subheadline */}
      <motion.p 
        variants={itemVariants}
        className="text-white/50 text-lg mb-8 max-w-md mx-auto"
      >
        Discover your unique project completion patterns and get a personalized plan that works with your brain, not against it.
      </motion.p>
      
      {/* Promises */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap justify-center gap-4 mb-8"
      >
        {[
          { icon: Clock, text: "~3 minutes" },
          { icon: Brain, text: "Made for ADHD brains" },
          { icon: Target, text: "Personalized plan" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08]"
          >
            <item.icon className="w-4 h-4 text-[#FF6B6B]" />
            <span className="text-white/70 text-sm">{item.text}</span>
          </div>
        ))}
      </motion.div>
      
      {/* Primary CTA */}
      <motion.div variants={itemVariants}>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className={cn(
            "px-8 py-4 rounded-full w-full sm:w-auto",
            "bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53]",
            "text-white font-semibold text-lg",
            "shadow-2xl shadow-[#FF6B6B]/30",
            "hover:shadow-3xl hover:shadow-[#FF6B6B]/40",
            "transition-all duration-300",
            "flex items-center justify-center gap-2 mx-auto"
          )}
        >
          Start the quiz
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
      
      {/* Secondary link */}
      <motion.div variants={itemVariants} className="mt-6">
        <button
          onClick={() => setShowExamples(!showExamples)}
          className="text-white/40 hover:text-white/60 text-sm transition-colors inline-flex items-center gap-1"
        >
          What will you ask?
          <ChevronDown className={cn(
            "w-4 h-4 transition-transform",
            showExamples && "rotate-180"
          )} />
        </button>
        
        <AnimatePresence>
          {showExamples && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-left">
                <p className="text-white/60 text-sm mb-3">Example questions:</p>
                <ul className="space-y-2 text-white/40 text-sm">
                  <li>• What type of project are you working on?</li>
                  <li>• Where do you typically get stuck?</li>
                  <li>• How do you feel about this project?</li>
                  <li>• What kind of support works best for you?</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Safety copy */}
      <motion.p 
        variants={itemVariants}
        className="mt-8 text-white/30 text-xs flex items-center justify-center gap-2"
      >
        <Shield className="w-4 h-4" />
        This is not a diagnosis. It's a tool to help you finish what you start.
      </motion.p>
    </motion.div>
  );
};

// Step 1: Project Type
const ProjectTypeStep = ({
  value,
  onChange,
}: {
  value?: ProjectType;
  onChange: (value: ProjectType) => void;
}) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="max-w-xl mx-auto"
  >
    <motion.div variants={itemVariants} className="text-center mb-8">
      <h2 className="font-syne font-bold text-2xl md:text-3xl text-white mb-3">
        What are you trying to finish?
      </h2>
      <p className="text-white/50">
        Pick the project that's been weighing on you most.
      </p>
    </motion.div>
    
    <motion.div variants={containerVariants} className="grid gap-3">
      {PROJECT_TYPE_OPTIONS.map((option) => (
        <motion.div key={option.id} variants={itemVariants}>
          <OptionCard
            selected={value === option.id}
            onClick={() => onChange(option.id as ProjectType)}
            emoji={option.emoji}
            label={option.label}
            description={option.description}
          />
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

// Step 2: Time Stuck
const TimeStuckStep = ({
  value,
  onChange,
  projectType,
}: {
  value?: number;
  onChange: (value: number) => void;
  projectType?: ProjectType;
}) => {
  const projectLabel = PROJECT_TYPE_OPTIONS.find(p => p.id === projectType)?.label?.toLowerCase() || "project";
  
  const timeOptions = [
    { value: 1, label: "Less than a month", emoji: "🌱", description: "Just getting stuck" },
    { value: 3, label: "1-3 months", emoji: "🌿", description: "Stuck for a while" },
    { value: 6, label: "3-6 months", emoji: "🌳", description: "Getting serious" },
    { value: 12, label: "6-12 months", emoji: "🏔️", description: "Long-term struggle" },
    { value: 24, label: "Over a year", emoji: "⛰️", description: "Deeply rooted" },
  ];
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-xl mx-auto"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h2 className="font-syne font-bold text-2xl md:text-3xl text-white mb-3">
          How long have you been stuck on your {projectLabel}?
        </h2>
        <p className="text-white/50">
          No judgment—just helps us understand where you're at.
        </p>
      </motion.div>
      
      <motion.div variants={containerVariants} className="grid gap-3">
        {timeOptions.map((option) => (
          <motion.div key={option.value} variants={itemVariants}>
            <OptionCard
              selected={value === option.value}
              onClick={() => onChange(option.value)}
              emoji={option.emoji}
              label={option.label}
              description={option.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// Step 3: Stuck Stage
const StuckStageStep = ({
  value,
  onChange,
}: {
  value?: StuckStage;
  onChange: (value: StuckStage) => void;
}) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="max-w-xl mx-auto"
  >
    <motion.div variants={itemVariants} className="text-center mb-8">
      <h2 className="font-syne font-bold text-2xl md:text-3xl text-white mb-3">
        Where do you usually get stuck?
      </h2>
      <p className="text-white/50">
        Think about your pattern across projects, not just this one.
      </p>
    </motion.div>
    
    <motion.div variants={containerVariants} className="grid gap-3">
      {STUCK_STAGE_OPTIONS.map((option) => (
        <motion.div key={option.id} variants={itemVariants}>
          <OptionCard
            selected={value === option.id}
            onClick={() => onChange(option.id)}
            emoji={option.emoji}
            label={option.label}
            description={option.detail}
          />
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

// Step 4: ADHD Patterns
const ADHDPatternsStep = ({
  value,
  onChange,
}: {
  value?: ADHDPatterns;
  onChange: (value: ADHDPatterns) => void;
}) => {
  const patterns = value || {
    taskInitiation: 3,
    timeBlindness: 3,
    boredomThreshold: 3,
    perfectionism: 3,
    contextSwitching: 3,
  };
  
  const updatePattern = (key: keyof ADHDPatterns, newValue: number) => {
    onChange({ ...patterns, [key]: newValue });
  };
  
  const questions = [
    {
      key: 'taskInitiation' as keyof ADHDPatterns,
      question: "Starting tasks feels hard, even when I know what to do.",
      leftLabel: "Rarely",
      rightLabel: "Almost always"
    },
    {
      key: 'timeBlindness' as keyof ADHDPatterns,
      question: "I often lose track of time or underestimate how long things take.",
      leftLabel: "Rarely",
      rightLabel: "Almost always"
    },
    {
      key: 'boredomThreshold' as keyof ADHDPatterns,
      question: "I get bored quickly and crave something new.",
      leftLabel: "Rarely",
      rightLabel: "Almost always"
    },
    {
      key: 'perfectionism' as keyof ADHDPatterns,
      question: "I delay things until I can do them 'right.'",
      leftLabel: "Rarely",
      rightLabel: "Almost always"
    },
    {
      key: 'contextSwitching' as keyof ADHDPatterns,
      question: "Once interrupted, it's hard to get back into a task.",
      leftLabel: "Rarely",
      rightLabel: "Almost always"
    },
  ];
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-xl mx-auto"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h2 className="font-syne font-bold text-2xl md:text-3xl text-white mb-3">
          How does your brain work?
        </h2>
        <p className="text-white/50">
          Rate how strongly these resonate with you.
        </p>
      </motion.div>
      
      <motion.div variants={containerVariants} className="space-y-8">
        {questions.map((q) => (
          <motion.div 
            key={q.key} 
            variants={itemVariants}
            className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
          >
            <p className="text-white/80 text-base mb-4">{q.question}</p>
            <LikertScale
              value={patterns[q.key]}
              onChange={(v) => updatePattern(q.key, v)}
              leftLabel={q.leftLabel}
              rightLabel={q.rightLabel}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// Step 5: Emotions
const EmotionsStep = ({
  value,
  onChange,
}: {
  value?: string[];
  onChange: (value: string[]) => void;
}) => {
  const emotions = value || [];
  
  const toggleEmotion = (emotionId: string) => {
    if (emotions.includes(emotionId)) {
      onChange(emotions.filter(e => e !== emotionId));
    } else {
      onChange([...emotions, emotionId]);
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-xl mx-auto"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h2 className="font-syne font-bold text-2xl md:text-3xl text-white mb-3">
          How do you feel about this project?
        </h2>
        <p className="text-white/50">
          Select all that apply. It's okay to feel contradictory things.
        </p>
      </motion.div>
      
      <motion.div 
        variants={containerVariants} 
        className="flex flex-wrap gap-3 justify-center"
      >
        {EMOTION_OPTIONS.map((emotion) => (
          <motion.div key={emotion.id} variants={itemVariants}>
            <EmotionChip
              selected={emotions.includes(emotion.id)}
              onClick={() => toggleEmotion(emotion.id)}
              emoji={emotion.emoji}
              label={emotion.label}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {emotions.length > 0 && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-white/40 text-sm mt-6"
        >
          {emotions.length} emotion{emotions.length !== 1 ? 's' : ''} selected
        </motion.p>
      )}
    </motion.div>
  );
};

// Step 6: Identity Statements
const IdentityStep = ({
  value,
  onChange,
}: {
  value?: { trailOfUnfinished: number; startStrongFadeOut: number; fearJudgment: number };
  onChange: (value: { trailOfUnfinished: number; startStrongFadeOut: number; fearJudgment: number }) => void;
}) => {
  const statements = value || {
    trailOfUnfinished: 3,
    startStrongFadeOut: 3,
    fearJudgment: 3,
  };
  
  const questions = [
    {
      key: 'trailOfUnfinished',
      statement: '"I leave a trail of half-finished things behind me."',
    },
    {
      key: 'startStrongFadeOut',
      statement: '"I start strong but fade out before the finish line."',
    },
    {
      key: 'fearJudgment',
      statement: '"I\'m afraid of what people will think if I actually ship this."',
    },
  ];
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-xl mx-auto"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h2 className="font-syne font-bold text-2xl md:text-3xl text-white mb-3">
          How much do these resonate?
        </h2>
        <p className="text-white/50">
          Be honest—there's no wrong answer.
        </p>
      </motion.div>
      
      <motion.div variants={containerVariants} className="space-y-6">
        {questions.map((q) => (
          <motion.div 
            key={q.key} 
            variants={itemVariants}
            className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
          >
            <p className="text-white/80 text-base mb-4 italic">{q.statement}</p>
            <LikertScale
              value={statements[q.key as keyof typeof statements]}
              onChange={(v) => onChange({ ...statements, [q.key]: v })}
              leftLabel="Not me"
              rightLabel="So me"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// Step 7: Environment
const EnvironmentStep = ({
  value,
  onChange,
}: {
  value?: { hoursPerWeek: number; stabilityLevel: number; hasSupportNetwork: boolean };
  onChange: (value: { hoursPerWeek: number; stabilityLevel: number; hasSupportNetwork: boolean }) => void;
}) => {
  const environment = value || {
    hoursPerWeek: 10,
    stabilityLevel: 3,
    hasSupportNetwork: false,
  };
  
  const hourOptions = [
    { value: 2, label: "1-2 hours", emoji: "⏰" },
    { value: 5, label: "3-5 hours", emoji: "🕐" },
    { value: 10, label: "5-10 hours", emoji: "🕑" },
    { value: 20, label: "10-20 hours", emoji: "🕒" },
    { value: 30, label: "20+ hours", emoji: "🕓" },
  ];
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-xl mx-auto"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h2 className="font-syne font-bold text-2xl md:text-3xl text-white mb-3">
          Let's understand your situation
        </h2>
        <p className="text-white/50">
          This helps us recommend realistic goals and support.
        </p>
      </motion.div>
      
      <motion.div variants={containerVariants} className="space-y-8">
        {/* Hours per week */}
        <motion.div variants={itemVariants}>
          <p className="text-white/80 text-base mb-4">
            How many hours per week can you realistically dedicate to this project?
          </p>
          <div className="grid grid-cols-5 gap-2">
            {hourOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onChange({ ...environment, hoursPerWeek: option.value })}
                className={cn(
                  "py-3 px-2 rounded-xl border text-center transition-all",
                  environment.hoursPerWeek === option.value
                    ? "bg-[#FF6B6B]/10 border-[#FF6B6B]/40 text-white"
                    : "bg-white/[0.02] border-white/[0.08] text-white/60 hover:bg-white/[0.04]"
                )}
              >
                <div className="text-lg mb-1">{option.emoji}</div>
                <div className="text-xs">{option.label}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Life stability */}
        <motion.div 
          variants={itemVariants}
          className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
        >
          <p className="text-white/80 text-base mb-4">
            How stable is your life right now? (work, health, caregiving, etc.)
          </p>
          <LikertScale
            value={environment.stabilityLevel}
            onChange={(v) => onChange({ ...environment, stabilityLevel: v })}
            leftLabel="Chaotic"
            rightLabel="Very stable"
          />
        </motion.div>
        
        {/* Support network */}
        <motion.div variants={itemVariants}>
          <p className="text-white/80 text-base mb-4">
            Do you have people who support your creative work?
          </p>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange({ ...environment, hasSupportNetwork: true })}
              className={cn(
                "py-4 px-4 rounded-xl border transition-all",
                environment.hasSupportNetwork
                  ? "bg-[#FF6B6B]/10 border-[#FF6B6B]/40 text-white"
                  : "bg-white/[0.02] border-white/[0.08] text-white/60 hover:bg-white/[0.04]"
              )}
            >
              <Users className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm">Yes, I have support</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange({ ...environment, hasSupportNetwork: false })}
              className={cn(
                "py-4 px-4 rounded-xl border transition-all",
                !environment.hasSupportNetwork
                  ? "bg-[#FF6B6B]/10 border-[#FF6B6B]/40 text-white"
                  : "bg-white/[0.02] border-white/[0.08] text-white/60 hover:bg-white/[0.04]"
              )}
            >
              <Heart className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm">Not really</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Step 8: Support Preferences
const SupportPreferencesStep = ({
  value,
  onChange,
}: {
  value?: {
    wantsPod: boolean;
    wantsCoach: boolean;
    preferredStyle: "gentle" | "direct";
    communicationMode: "written" | "spoken" | "visual";
    aiIntensity: "low" | "medium" | "high";
  };
  onChange: (value: {
    wantsPod: boolean;
    wantsCoach: boolean;
    preferredStyle: "gentle" | "direct";
    communicationMode: "written" | "spoken" | "visual";
    aiIntensity: "low" | "medium" | "high";
  }) => void;
}) => {
  const prefs = value || {
    wantsPod: false,
    wantsCoach: false,
    preferredStyle: "gentle" as const,
    communicationMode: "written" as const,
    aiIntensity: "medium" as const,
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-xl mx-auto"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h2 className="font-syne font-bold text-2xl md:text-3xl text-white mb-3">
          How do you like to be supported?
        </h2>
        <p className="text-white/50">
          We'll customize your experience based on this.
        </p>
      </motion.div>
      
      <motion.div variants={containerVariants} className="space-y-8">
        {/* Communication style */}
        <motion.div variants={itemVariants}>
          <p className="text-white/80 text-base mb-4">
            What communication style works best for you?
          </p>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange({ ...prefs, preferredStyle: "gentle" })}
              className={cn(
                "py-4 px-4 rounded-xl border transition-all text-left",
                prefs.preferredStyle === "gentle"
                  ? "bg-[#FF6B6B]/10 border-[#FF6B6B]/40 text-white"
                  : "bg-white/[0.02] border-white/[0.08] text-white/60 hover:bg-white/[0.04]"
              )}
            >
              <Heart className="w-6 h-6 mb-2" />
              <div className="font-semibold text-sm">Gentle & Supportive</div>
              <div className="text-xs mt-1 opacity-70">Encouragement over pressure</div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange({ ...prefs, preferredStyle: "direct" })}
              className={cn(
                "py-4 px-4 rounded-xl border transition-all text-left",
                prefs.preferredStyle === "direct"
                  ? "bg-[#FF6B6B]/10 border-[#FF6B6B]/40 text-white"
                  : "bg-white/[0.02] border-white/[0.08] text-white/60 hover:bg-white/[0.04]"
              )}
            >
              <Zap className="w-6 h-6 mb-2" />
              <div className="font-semibold text-sm">Direct & Honest</div>
              <div className="text-xs mt-1 opacity-70">Tell it like it is</div>
            </motion.button>
          </div>
        </motion.div>
        
        {/* Pod interest */}
        <motion.div variants={itemVariants}>
          <p className="text-white/80 text-base mb-4">
            Would you like to be part of an accountability pod?
          </p>
          <p className="text-white/40 text-sm mb-4">
            Small groups of 3-5 ADHD creators matched by project type.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange({ ...prefs, wantsPod: true })}
              className={cn(
                "py-4 px-4 rounded-xl border transition-all",
                prefs.wantsPod
                  ? "bg-[#10B981]/10 border-[#10B981]/40 text-white"
                  : "bg-white/[0.02] border-white/[0.08] text-white/60 hover:bg-white/[0.04]"
              )}
            >
              <Users className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm">Yes, I want a pod</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange({ ...prefs, wantsPod: false })}
              className={cn(
                "py-4 px-4 rounded-xl border transition-all",
                !prefs.wantsPod
                  ? "bg-white/[0.05] border-white/[0.15] text-white"
                  : "bg-white/[0.02] border-white/[0.08] text-white/60 hover:bg-white/[0.04]"
              )}
            >
              <Brain className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm">Solo is fine for now</span>
            </motion.button>
          </div>
        </motion.div>
        
        {/* AI intensity */}
        <motion.div variants={itemVariants}>
          <p className="text-white/80 text-base mb-4">
            How much AI coaching do you want?
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "low", label: "Light touch", emoji: "🌱" },
              { value: "medium", label: "Balanced", emoji: "⚖️" },
              { value: "high", label: "Intensive", emoji: "🔥" },
            ].map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onChange({ ...prefs, aiIntensity: option.value as "low" | "medium" | "high" })}
                className={cn(
                  "py-4 px-3 rounded-xl border transition-all text-center",
                  prefs.aiIntensity === option.value
                    ? "bg-[#FF6B6B]/10 border-[#FF6B6B]/40 text-white"
                    : "bg-white/[0.02] border-white/[0.08] text-white/60 hover:bg-white/[0.04]"
                )}
              >
                <div className="text-2xl mb-2">{option.emoji}</div>
                <div className="text-xs">{option.label}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Step 9: Commitment
const CommitmentStep = ({
  value,
  onChange,
  projectType,
}: {
  value?: { commitmentStatement?: string; flagshipProject?: string };
  onChange: (value: { commitmentStatement?: string; flagshipProject?: string }) => void;
  projectType?: ProjectType;
}) => {
  const commitment = value || { commitmentStatement: '', flagshipProject: '' };
  const projectLabel = PROJECT_TYPE_OPTIONS.find(p => p.id === projectType)?.label?.toLowerCase() || "project";
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-xl mx-auto"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h2 className="font-syne font-bold text-2xl md:text-3xl text-white mb-3">
          Let's make it real
        </h2>
        <p className="text-white/50">
          These are optional, but they help anchor your commitment.
        </p>
      </motion.div>
      
      <motion.div variants={containerVariants} className="space-y-6">
        <motion.div variants={itemVariants}>
          <label className="block text-white/80 text-base mb-3">
            What's the name of your {projectLabel}?
          </label>
          <input
            type="text"
            value={commitment.flagshipProject || ''}
            onChange={(e) => onChange({ ...commitment, flagshipProject: e.target.value })}
            placeholder={`e.g., "My productivity app" or "The novel I've been writing"`}
            className="w-full px-4 py-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF6B6B]/50 focus:bg-white/[0.05] transition-all"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <label className="block text-white/80 text-base mb-3">
            In the next 4-8 weeks, finishing this would mean...
          </label>
          <textarea
            value={commitment.commitmentStatement || ''}
            onChange={(e) => onChange({ ...commitment, commitmentStatement: e.target.value })}
            placeholder="e.g., I could finally show it to people, launch my business, prove to myself I can finish things..."
            rows={4}
            className="w-full px-4 py-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/30 focus:outline-none focus:border-[#FF6B6B]/50 focus:bg-white/[0.05] transition-all resize-none"
          />
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="p-4 rounded-2xl bg-[#10B981]/5 border border-[#10B981]/20"
        >
          <p className="text-[#10B981] text-sm flex items-start gap-2">
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Writing this down increases your chances of completing by 42%. 
              Your brain responds to clarity.
            </span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// ============================================
// MAIN QUIZ COMPONENT
// ============================================

const TOTAL_STEPS = 9;

export default function StartPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [quizStartTime] = useState(Date.now());
  
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({
    adhdPatterns: {
      taskInitiation: 3,
      timeBlindness: 3,
      boredomThreshold: 3,
      perfectionism: 3,
      contextSwitching: 3,
    },
    emotions: [],
    identityStatements: {
      trailOfUnfinished: 3,
      startStrongFadeOut: 3,
      fearJudgment: 3,
    },
    environment: {
      hoursPerWeek: 10,
      stabilityLevel: 3,
      hasSupportNetwork: false,
    },
    supportPreference: {
      wantsPod: false,
      wantsCoach: false,
      preferredStyle: "gentle",
      communicationMode: "written",
      aiIntensity: "medium",
    },
  });
  
  // Load saved progress on mount
  useEffect(() => {
    const saved = loadQuizProgress();
    if (saved && saved.step > 0) {
      setStep(saved.step);
      setAnswers(prev => ({ ...prev, ...saved.answers }));
    }
  }, []);
  
  // Save progress on changes
  useEffect(() => {
    if (step > 0) {
      saveQuizProgress(step, answers);
    }
  }, [step, answers]);
  
  // Track quiz start
  useEffect(() => {
    if (step === 1) {
      trackQuizEvent({ type: "quiz_started", timestamp: new Date() });
    }
  }, [step]);
  
  const canProceed = useCallback(() => {
    switch (step) {
      case 0: return true;
      case 1: return !!answers.projectType;
      case 2: return !!answers.timeStuckMonths;
      case 3: return !!answers.stuckStage;
      case 4: return !!answers.adhdPatterns;
      case 5: return (answers.emotions?.length || 0) > 0;
      case 6: return !!answers.identityStatements;
      case 7: return !!answers.environment;
      case 8: return !!answers.supportPreference;
      case 9: return true;
      default: return false;
    }
  }, [step, answers]);
  
  const handleNext = useCallback(() => {
    if (!canProceed()) return;
    
    if (step === TOTAL_STEPS) {
      // Complete quiz and analyze
      setIsAnalyzing(true);
      
      trackQuizEvent({ 
        type: "quiz_completed", 
        duration: Date.now() - quizStartTime,
        timestamp: new Date() 
      });
      
      // Simulate brief analysis time for anticipation
      setTimeout(() => {
        const fullAnswers = answers as QuizAnswers;
        const profile = mapQuizToProfile(fullAnswers);
        saveProfile(profile);
        clearQuizProgress();
        
        trackQuizEvent({ 
          type: "profile_shown", 
          archetypeKey: profile.archetypeKey,
          timestamp: new Date() 
        });
        
        setShowConfetti(true);
        
        setTimeout(() => {
          router.push('/start/result');
        }, 1500);
      }, 2000);
    } else {
      // Show mini celebration on completing sections
      if ([3, 6, 8].includes(step)) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
      
      trackQuizEvent({ type: "quiz_step_completed", step, timestamp: new Date() });
      setStep(step + 1);
    }
  }, [step, answers, canProceed, router, quizStartTime]);
  
  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    } else if (step === 1) {
      setStep(0);
    }
  }, [step]);
  
  const handleStartQuiz = useCallback(() => {
    clearQuizProgress();
    setStep(1);
  }, []);
  
  // Render current step
  const renderStep = () => {
    switch (step) {
      case 0:
        return <WelcomeScreen onStart={handleStartQuiz} />;
      case 1:
        return (
          <ProjectTypeStep
            value={answers.projectType}
            onChange={(v) => setAnswers(prev => ({ ...prev, projectType: v }))}
          />
        );
      case 2:
        return (
          <TimeStuckStep
            value={answers.timeStuckMonths}
            onChange={(v) => setAnswers(prev => ({ ...prev, timeStuckMonths: v }))}
            projectType={answers.projectType}
          />
        );
      case 3:
        return (
          <StuckStageStep
            value={answers.stuckStage}
            onChange={(v) => setAnswers(prev => ({ ...prev, stuckStage: v }))}
          />
        );
      case 4:
        return (
          <ADHDPatternsStep
            value={answers.adhdPatterns}
            onChange={(v) => setAnswers(prev => ({ ...prev, adhdPatterns: v }))}
          />
        );
      case 5:
        return (
          <EmotionsStep
            value={answers.emotions}
            onChange={(v) => setAnswers(prev => ({ ...prev, emotions: v }))}
          />
        );
      case 6:
        return (
          <IdentityStep
            value={answers.identityStatements}
            onChange={(v) => setAnswers(prev => ({ ...prev, identityStatements: v }))}
          />
        );
      case 7:
        return (
          <EnvironmentStep
            value={answers.environment}
            onChange={(v) => setAnswers(prev => ({ ...prev, environment: v }))}
          />
        );
      case 8:
        return (
          <SupportPreferencesStep
            value={answers.supportPreference}
            onChange={(v) => setAnswers(prev => ({ ...prev, supportPreference: v }))}
          />
        );
      case 9:
        return (
          <CommitmentStep
            value={{ 
              commitmentStatement: answers.commitmentStatement, 
              flagshipProject: answers.flagshipProject 
            }}
            onChange={(v) => setAnswers(prev => ({ 
              ...prev, 
              commitmentStatement: v.commitmentStatement,
              flagshipProject: v.flagshipProject
            }))}
            projectType={answers.projectType}
          />
        );
      default:
        return null;
    }
  };
  
  // Analyzing state
  if (isAnalyzing) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-5">
        <Confetti show={showConfetti} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-full border-4 border-white/10 border-t-[#FF6B6B] mx-auto mb-6"
          />
          <h2 className="font-syne font-bold text-2xl text-white mb-2">
            Mapping your patterns...
          </h2>
          <p className="text-white/50">
            Finding your project completion archetype
          </p>
        </motion.div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-[#FF6B6B]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-100px] right-[-200px] w-[500px] h-[500px] bg-[#10B981]/10 rounded-full blur-[150px]" />
      </div>
      
      {/* Confetti */}
      <Confetti show={showConfetti} />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 py-4 px-5 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center shadow-lg shadow-[#FF6B6B]/20">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="font-syne font-bold text-xl text-white tracking-tight">
              Launch<span className="text-[#FF6B6B]">Pod</span>
            </span>
          </Link>
          
          {step > 0 && (
            <button
              onClick={() => {
                clearQuizProgress();
                setStep(0);
                setAnswers({});
              }}
              className="text-white/40 hover:text-white/60 text-sm transition-colors"
            >
              Start over
            </button>
          )}
        </div>
      </header>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col pt-24 pb-32 px-5 md:px-8">
        {/* Progress bar */}
        {step > 0 && (
          <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
        )}
        
        {/* Step content */}
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Navigation buttons */}
      {step > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 py-6 px-5 md:px-8 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent">
          <div className="max-w-xl mx-auto flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBack}
              className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 font-medium hover:bg-white/10 hover:text-white transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </motion.button>
            
            <motion.button
              whileHover={canProceed() ? { scale: 1.02 } : {}}
              whileTap={canProceed() ? { scale: 0.98 } : {}}
              onClick={handleNext}
              disabled={!canProceed()}
              className={cn(
                "flex-1 px-6 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2",
                canProceed()
                  ? "bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white shadow-lg shadow-[#FF6B6B]/25 hover:shadow-xl"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              )}
            >
              {step === TOTAL_STEPS ? (
                <>
                  See my results
                  <Sparkles className="w-4 h-4" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      )}
    </main>
  );
}

