'use client';

/**
 * EmailAuth Component
 * 
 * ADHD-friendly email magic link authentication with:
 * - Simple email input
 * - Clear confirmation screen
 * - Open email app helper
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Loader2, CheckCircle2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth';
import { isValidEmail, maskEmail } from '@/lib/auth/utils';

// ============================================
// TYPES
// ============================================

interface EmailAuthProps {
  step: 'input' | 'sent';
  email: string;
  onEmailChange: (email: string) => void;
  onStepChange: (step: 'input' | 'sent') => void;
  onBack: () => void;
}

// ============================================
// COMPONENT
// ============================================

export function EmailAuth({
  step,
  email,
  onEmailChange,
  onStepChange,
  onBack,
}: EmailAuthProps) {
  const { sendEmailMagicLink, loading, error, clearError } = useAuth();
  
  const [localError, setLocalError] = useState<string | null>(null);
  
  // ============================================
  // HANDLERS
  // ============================================
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onEmailChange(e.target.value.toLowerCase().trim());
    setLocalError(null);
  };
  
  const handleSendLink = async () => {
    setLocalError(null);
    clearError();
    
    // Validate email
    if (!isValidEmail(email)) {
      setLocalError('Geçerli bir e-posta adresi gir');
      return;
    }
    
    try {
      await sendEmailMagicLink(email);
      onStepChange('sent');
    } catch {
      // Error is handled by context
    }
  };
  
  const handleResend = async () => {
    setLocalError(null);
    clearError();
    
    try {
      await sendEmailMagicLink(email);
    } catch {
      // Error handled by context
    }
  };
  
  // ============================================
  // EMAIL APP LINKS
  // ============================================
  
  const getEmailAppLink = () => {
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (!domain) return null;
    
    if (domain.includes('gmail')) {
      return { name: 'Gmail', url: 'https://mail.google.com' };
    }
    if (domain.includes('outlook') || domain.includes('hotmail') || domain.includes('live')) {
      return { name: 'Outlook', url: 'https://outlook.live.com' };
    }
    if (domain.includes('yahoo')) {
      return { name: 'Yahoo Mail', url: 'https://mail.yahoo.com' };
    }
    if (domain.includes('icloud') || domain.includes('me.com') || domain.includes('mac.com')) {
      return { name: 'iCloud Mail', url: 'https://www.icloud.com/mail' };
    }
    
    return null;
  };
  
  // ============================================
  // RENDER - INPUT STEP
  // ============================================
  
  if (step === 'input') {
    return (
      <div className="space-y-6">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Geri
        </button>
        
        {/* Email input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            E-posta Adresi
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="ornek@email.com"
              className={cn(
                "w-full pl-12 pr-4 py-3.5 rounded-xl",
                "bg-muted border-2 text-foreground placeholder:text-muted-foreground",
                "transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                localError || error ? "border-destructive" : "border-border focus:border-primary"
              )}
              disabled={loading}
              autoFocus
            />
          </div>
          
          {(localError || error) && (
            <p className="mt-2 text-sm text-destructive">
              {localError || error?.userMessage}
            </p>
          )}
        </div>
        
        {/* Submit button */}
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleSendLink}
          isLoading={loading}
          loadingText="Gönderiliyor..."
          disabled={!email}
        >
          <Mail className="w-5 h-5 mr-2" />
          Bağlantı Gönder
        </Button>
        
        {/* Info text */}
        <p className="text-xs text-center text-muted-foreground">
          Şifre oluşturmana gerek yok.<br />
          E-postadaki bağlantıya tıklayarak giriş yaparsın.
        </p>
      </div>
    );
  }
  
  // ============================================
  // RENDER - SENT STEP
  // ============================================
  
  const emailApp = getEmailAppLink();
  
  return (
    <div className="space-y-6 text-center">
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
      >
        <Mail className="w-8 h-8 text-primary" />
      </motion.div>
      
      {/* Title */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          E-postanı Kontrol Et
        </h3>
        <p className="text-muted-foreground">
          Giriş bağlantısını gönderdik:
        </p>
        <p className="font-medium text-foreground mt-1">
          {email}
        </p>
      </div>
      
      {/* Steps */}
      <div className="bg-muted/50 rounded-xl p-4 text-left space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
            1
          </div>
          <p className="text-sm text-foreground">
            E-postanı aç (spam klasörünü de kontrol et)
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
            2
          </div>
          <p className="text-sm text-foreground">
            "Giriş Yap" butonuna tıkla
          </p>
        </div>
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
            3
          </div>
          <p className="text-sm text-foreground">
            Otomatik olarak giriş yapacaksın ✨
          </p>
        </div>
      </div>
      
      {/* Email app link */}
      {emailApp && (
        <a
          href={emailApp.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl",
            "bg-primary/10 text-primary font-medium",
            "hover:bg-primary/20 transition-colors"
          )}
        >
          <ExternalLink className="w-4 h-4" />
          {emailApp.name}'i Aç
        </a>
      )}
      
      {/* Resend and back */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={handleResend}
          disabled={loading}
          className="text-sm text-primary hover:underline disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Gönderiliyor...
            </>
          ) : (
            'Tekrar Gönder'
          )}
        </button>
        
        <button
          onClick={() => onStepChange('input')}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Farklı e-posta kullan
        </button>
      </div>
      
      {/* Error */}
      {error && (
        <p className="text-sm text-destructive">
          {error.userMessage}
        </p>
      )}
    </div>
  );
}

export default EmailAuth;

