'use client';

/**
 * OnboardingModal Component
 * 
 * Single-screen minimal onboarding with:
 * - Optional display name
 * - Goal selection (multi-select)
 * - Notification permission (now/later)
 * 
 * ADHD-friendly:
 * - One screen, no multi-step confusion
 * - Visual goal cards
 * - Quick completion path
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Target, 
  Bell, 
  BellOff, 
  Check, 
  Zap, 
  Users, 
  Calendar, 
  Brain,
  Sparkles,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerContainer, staggerItem, rewardPop } from '@/lib/motion';
import { useAuth } from '@/lib/auth';
import { UserGoal } from '@/lib/auth/types';
import { trackOnboardingStarted, trackGoalsSelected, trackNotificationDecision } from '@/lib/auth/analytics';

// ============================================
// TYPES
// ============================================

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

interface GoalOption {
  id: UserGoal;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// ============================================
// GOAL OPTIONS
// ============================================

const GOAL_OPTIONS: GoalOption[] = [
  {
    id: 'focus_sessions',
    label: 'Odaklanma Seansları',
    description: 'Pomodoro ve focus sessions',
    icon: Zap,
    color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  },
  {
    id: 'task_completion',
    label: 'Görev Tamamlama',
    description: 'Projeleri bitirmek',
    icon: Target,
    color: 'bg-green-500/10 text-green-500 border-green-500/20',
  },
  {
    id: 'accountability',
    label: 'Hesap Verebilirlik',
    description: 'Body doubling ve takip',
    icon: Users,
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  },
  {
    id: 'coaching',
    label: 'DEHB Koçluğu',
    description: 'Uzman desteği almak',
    icon: Brain,
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  },
  {
    id: 'habits',
    label: 'Alışkanlık Oluşturma',
    description: 'Rutinler ve sistemler',
    icon: Calendar,
    color: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  },
  {
    id: 'community',
    label: 'Topluluk',
    description: 'Benzer insanlarla bağ',
    icon: Sparkles,
    color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  },
];

// ============================================
// COMPONENT
// ============================================

export function OnboardingModal({ isOpen, onComplete }: OnboardingModalProps) {
  const { user, updateDisplayName, updateGoals, updateNotificationPreferences, completeOnboarding, loading } = useAuth();
  
  // Form state
  const [displayName, setDisplayName] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<UserGoal[]>([]);
  const [notificationChoice, setNotificationChoice] = useState<'pending' | 'yes' | 'later'>('pending');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Refs
  const startTimeRef = useRef<number>(Date.now());
  
  // ============================================
  // EFFECTS
  // ============================================
  
  useEffect(() => {
    if (isOpen && user) {
      trackOnboardingStarted(user.uid);
      startTimeRef.current = Date.now();
      
      // Pre-fill display name if available
      if (user.displayName) {
        setDisplayName(user.displayName);
      }
    }
  }, [isOpen, user]);
  
  // ============================================
  // HANDLERS
  // ============================================
  
  const toggleGoal = (goalId: UserGoal) => {
    setSelectedGoals(prev => {
      if (prev.includes(goalId)) {
        return prev.filter(g => g !== goalId);
      }
      return [...prev, goalId];
    });
  };
  
  const handleNotificationChoice = async (choice: 'yes' | 'later') => {
    setNotificationChoice(choice);
    trackNotificationDecision(choice === 'yes');
    
    if (choice === 'yes') {
      // Request notification permission
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        await updateNotificationPreferences({
          pushEnabled: permission === 'granted',
          emailEnabled: true,
        });
      }
    } else {
      await updateNotificationPreferences({
        pushEnabled: false,
        emailEnabled: false,
      });
    }
  };
  
  const handleSubmit = async () => {
    if (selectedGoals.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      // Update display name if changed
      if (displayName && displayName !== user?.displayName) {
        await updateDisplayName(displayName);
      }
      
      // Update goals
      await updateGoals(selectedGoals);
      trackGoalsSelected(selectedGoals);
      
      // Complete onboarding
      await completeOnboarding();
      
      // Show success animation
      setShowSuccess(true);
      
      // Wait for animation then close
      setTimeout(() => {
        onComplete();
      }, 1500);
    } catch (error) {
      console.error('Onboarding error:', error);
      setIsSubmitting(false);
    }
  };
  
  // ============================================
  // RENDER - SUCCESS STATE
  // ============================================
  
  if (showSuccess) {
    return (
      <Dialog open={isOpen}>
        <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden bg-card border-border">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 text-center"
          >
            <motion.div
              initial="initial"
              animate="reward"
              variants={rewardPop}
              className="w-20 h-20 mx-auto bg-gradient-warm rounded-full flex items-center justify-center mb-6"
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Hazırsın! 🚀
            </h2>
            <p className="text-muted-foreground">
              DopaLive'a hoş geldin, {displayName || 'merhaba'}!
            </p>
          </motion.div>
        </DialogContent>
      </Dialog>
    );
  }
  
  // ============================================
  // RENDER - MAIN FORM
  // ============================================
  
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden bg-card border-border max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-display font-bold text-foreground">
              Seni Tanıyalım 👋
            </h2>
            <p className="text-muted-foreground mt-1">
              1 dakikada hazır olacaksın
            </p>
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Display Name */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <label htmlFor="displayName" className="block text-sm font-medium text-foreground mb-2">
              Sana nasıl hitap edelim? <span className="text-muted-foreground">(opsiyonel)</span>
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="İsmin veya takma adın"
                maxLength={30}
                className={cn(
                  "w-full pl-12 pr-4 py-3 rounded-xl",
                  "bg-muted border-2 border-border text-foreground placeholder:text-muted-foreground",
                  "transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:border-primary"
                )}
              />
            </div>
          </motion.div>
          
          {/* Goals */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <label className="block text-sm font-medium text-foreground mb-3">
              DopaLive'dan ne bekliyorsun? <span className="text-primary">*</span>
            </label>
            <motion.div
              variants={staggerContainer(0.05)}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-3"
            >
              {GOAL_OPTIONS.map((goal) => {
                const Icon = goal.icon;
                const isSelected = selectedGoals.includes(goal.id);
                
                return (
                  <motion.button
                    key={goal.id}
                    variants={staggerItem}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleGoal(goal.id)}
                    className={cn(
                      "relative p-4 rounded-xl text-left transition-all duration-200",
                      "border-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    {/* Selected indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                    
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-2", goal.color)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-medium text-foreground text-sm">
                      {goal.label}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {goal.description}
                    </p>
                  </motion.button>
                );
              })}
            </motion.div>
            
            {selectedGoals.length === 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                En az bir hedef seç
              </p>
            )}
          </motion.div>
          
          {/* Notifications */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <label className="block text-sm font-medium text-foreground mb-3">
              Bildirimler
            </label>
            
            {notificationChoice === 'pending' ? (
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleNotificationChoice('yes')}
                  leftIcon={Bell}
                >
                  Evet, Hatırlat
                </Button>
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={() => handleNotificationChoice('later')}
                  leftIcon={BellOff}
                >
                  Sonra
                </Button>
              </div>
            ) : (
              <div className={cn(
                "p-3 rounded-xl flex items-center gap-3",
                notificationChoice === 'yes' 
                  ? "bg-success/10 text-success"
                  : "bg-muted text-muted-foreground"
              )}>
                {notificationChoice === 'yes' ? (
                  <>
                    <Bell className="w-5 h-5" />
                    <span className="text-sm font-medium">Bildirimler açık</span>
                  </>
                ) : (
                  <>
                    <BellOff className="w-5 h-5" />
                    <span className="text-sm font-medium">Sonra karar verebilirsin</span>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Footer */}
        <div className="p-6 pt-4 border-t border-border bg-muted/30">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleSubmit}
            disabled={selectedGoals.length === 0 || isSubmitting}
            isLoading={isSubmitting}
            loadingText="Kaydediliyor..."
            rightIcon={ArrowRight}
          >
            Başlayalım!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default OnboardingModal;

