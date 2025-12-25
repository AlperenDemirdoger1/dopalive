'use client';

/**
 * AuthModal Component
 * 
 * ADHD-friendly authentication modal with:
 * - Clear visual hierarchy
 * - Minimal cognitive load
 * - State restoration on close/reopen
 * - Short, non-blaming error messages
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { modalVariants, overlayVariants } from '@/lib/motion';
import { useAuth } from '@/lib/auth';
import { AuthMethod } from '@/lib/auth/types';
import { AuthMethodSelector } from './AuthMethodSelector';
import { PhoneAuth } from './PhoneAuth';
import { EmailAuth } from './EmailAuth';

// ============================================
// TYPES
// ============================================

type AuthStep = 'method' | 'phone' | 'phone-verify' | 'email' | 'email-sent';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Default method to show */
  defaultMethod?: AuthMethod;
  /** Called after successful auth */
  onSuccess?: () => void;
}

// ============================================
// STORAGE KEYS
// ============================================

const STORAGE_KEY = 'dopalive_auth_state';

interface SavedAuthState {
  step: AuthStep;
  method: AuthMethod | null;
  phone?: string;
  email?: string;
  timestamp: number;
}

// ============================================
// COMPONENT
// ============================================

export function AuthModal({
  isOpen,
  onClose,
  defaultMethod,
  onSuccess,
}: AuthModalProps) {
  // Auth context
  const { 
    signInWithGoogle, 
    loading, 
    error, 
    clearError,
    user,
  } = useAuth();
  
  // Local state
  const [step, setStep] = useState<AuthStep>('method');
  const [selectedMethod, setSelectedMethod] = useState<AuthMethod | null>(defaultMethod || null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  // ============================================
  // STATE PERSISTENCE
  // ============================================
  
  // Restore state on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const state: SavedAuthState = JSON.parse(saved);
        
        // Only restore if less than 5 minutes old
        if (Date.now() - state.timestamp < 5 * 60 * 1000) {
          setStep(state.step);
          setSelectedMethod(state.method);
          if (state.phone) setPhone(state.phone);
          if (state.email) setEmail(state.email);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (e) {
      // Ignore parse errors
    }
  }, []);
  
  // Save state on change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const state: SavedAuthState = {
      step,
      method: selectedMethod,
      phone: phone || undefined,
      email: email || undefined,
      timestamp: Date.now(),
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [step, selectedMethod, phone, email]);
  
  // Clear state on success
  useEffect(() => {
    if (user && isOpen) {
      localStorage.removeItem(STORAGE_KEY);
      onSuccess?.();
      onClose();
    }
  }, [user, isOpen, onSuccess, onClose]);
  
  // ============================================
  // HANDLERS
  // ============================================
  
  const handleMethodSelect = useCallback(async (method: AuthMethod) => {
    setSelectedMethod(method);
    clearError();
    
    switch (method) {
      case 'google':
        await signInWithGoogle();
        break;
      case 'phone':
        setStep('phone');
        break;
      case 'email':
        setStep('email');
        break;
    }
  }, [signInWithGoogle, clearError]);
  
  const handleBack = useCallback(() => {
    clearError();
    
    switch (step) {
      case 'phone':
      case 'email':
        setStep('method');
        setSelectedMethod(null);
        break;
      case 'phone-verify':
        setStep('phone');
        break;
      case 'email-sent':
        setStep('email');
        break;
      default:
        setStep('method');
    }
  }, [step, clearError]);
  
  const handleClose = useCallback(() => {
    // Don't clear state on close - allow restoration
    onClose();
  }, [onClose]);
  
  const handleReset = useCallback(() => {
    setStep('method');
    setSelectedMethod(null);
    setPhone('');
    setEmail('');
    clearError();
    localStorage.removeItem(STORAGE_KEY);
  }, [clearError]);
  
  // ============================================
  // TITLE
  // ============================================
  
  const getTitle = () => {
    switch (step) {
      case 'method':
        return 'Giriş Yap veya Kaydol';
      case 'phone':
        return 'Telefon ile Giriş';
      case 'phone-verify':
        return 'Kodu Gir';
      case 'email':
        return 'E-posta ile Giriş';
      case 'email-sent':
        return 'E-postanı Kontrol Et';
      default:
        return 'Giriş Yap';
    }
  };
  
  // ============================================
  // RENDER
  // ============================================
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent 
        className={cn(
          "sm:max-w-[440px] p-0 gap-0 overflow-hidden",
          "bg-[#1a1a1a] border-white/10"
        )}
        showCloseButton={false}
      >
        {/* Header */}
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-display font-bold text-white">
              {getTitle()}
            </DialogTitle>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors focus-ring"
              aria-label="Kapat"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>
          
          {/* Subtitle based on step */}
          {step !== 'method' && (
            <p className="text-sm text-white/60 mt-1">
              {step === 'phone' && 'Sana bir kod göndereceğiz'}
              {step === 'phone-verify' && 'SMS ile gelen 6 haneli kod'}
              {step === 'email' && 'Sana bir bağlantı göndereceğiz'}
              {step === 'email-sent' && 'Gelen kutunu kontrol et'}
            </p>
          )}
        </DialogHeader>
        
        {/* Content */}
        <div className="p-6 pt-4">
          <AnimatePresence mode="wait">
            {/* Method Selection */}
            {step === 'method' && (
              <motion.div
                key="method"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
              >
                <AuthMethodSelector
                  onSelect={handleMethodSelect}
                  loading={loading}
                  error={error}
                />
              </motion.div>
            )}
            
            {/* Phone Auth */}
            {(step === 'phone' || step === 'phone-verify') && (
              <motion.div
                key="phone"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
              >
                <PhoneAuth
                  step={step === 'phone' ? 'input' : 'verify'}
                  phone={phone}
                  onPhoneChange={setPhone}
                  onStepChange={(newStep) => setStep(newStep === 'input' ? 'phone' : 'phone-verify')}
                  onBack={handleBack}
                />
              </motion.div>
            )}
            
            {/* Email Auth */}
            {(step === 'email' || step === 'email-sent') && (
              <motion.div
                key="email"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
              >
                <EmailAuth
                  step={step === 'email' ? 'input' : 'sent'}
                  email={email}
                  onEmailChange={setEmail}
                  onStepChange={(newStep) => setStep(newStep === 'input' ? 'email' : 'email-sent')}
                  onBack={handleBack}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-lg bg-red-500/20 border border-red-500/40"
            >
              <p className="text-sm text-red-300 font-medium">
                {error.userMessage}
              </p>
              <button
                onClick={clearError}
                className="text-xs text-red-400 hover:text-red-300 mt-2 underline"
              >
                Tamam
              </button>
            </motion.div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-6 pt-4 border-t border-white/10 mt-4">
          <p className="text-xs text-white/50 text-center">
            Devam ederek{' '}
            <a href="/terms" className="text-white/70 hover:text-white underline">
              Kullanım Şartları
            </a>
            {' '}ve{' '}
            <a href="/privacy" className="text-white/70 hover:text-white underline">
              Gizlilik Politikası
            </a>
            'nı kabul etmiş olursun.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;

