'use client';

/**
 * PhoneAuth Component
 * 
 * ADHD-friendly phone authentication with:
 * - Auto-formatting phone input
 * - Large OTP input boxes
 * - Auto-focus and auto-advance
 * - Clear countdown timer
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth';
import { normalizePhone, isValidPhone, maskPhone } from '@/lib/auth/utils';

// ============================================
// TYPES
// ============================================

interface PhoneAuthProps {
  step: 'input' | 'verify';
  phone: string;
  onPhoneChange: (phone: string) => void;
  onStepChange: (step: 'input' | 'verify') => void;
  onBack: () => void;
}

// ============================================
// OTP INPUT COMPONENT
// ============================================

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  autoFocus?: boolean;
}

function OTPInput({ value, onChange, length = 6, disabled, autoFocus }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);
  
  const handleChange = (index: number, newValue: string) => {
    // Only allow digits
    const digit = newValue.replace(/\D/g, '').slice(-1);
    
    const newOtp = value.split('');
    newOtp[index] = digit;
    const result = newOtp.join('');
    onChange(result);
    
    // Auto-advance to next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pastedData);
    
    // Focus last filled or next empty
    const focusIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };
  
  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            "w-11 h-14 sm:w-12 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-xl",
            "bg-muted border-2 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            value[index] ? "border-primary bg-primary/5" : "border-border"
          )}
          aria-label={`Kod hanesi ${index + 1}`}
        />
      ))}
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function PhoneAuth({
  step,
  phone,
  onPhoneChange,
  onStepChange,
  onBack,
}: PhoneAuthProps) {
  const { sendPhoneOTP, verifyPhoneOTP, loading, error, clearError } = useAuth();
  
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [localError, setLocalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // ============================================
  // COUNTDOWN TIMER
  // ============================================
  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  
  // ============================================
  // PHONE INPUT FORMATTING
  // ============================================
  
  const formatPhoneInput = (value: string): string => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as: 5XX XXX XX XX
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    if (digits.length <= 8) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneInput(e.target.value);
    onPhoneChange(formatted);
    setLocalError(null);
  };
  
  // ============================================
  // SEND OTP
  // ============================================
  
  const handleSendOTP = async () => {
    setLocalError(null);
    clearError();
    
    // Validate phone
    const normalized = normalizePhone(phone);
    if (!isValidPhone(normalized)) {
      setLocalError('Geçerli bir telefon numarası gir');
      return;
    }
    
    try {
      await sendPhoneOTP(phone);
      onStepChange('verify');
      setCountdown(60); // 60 second cooldown
    } catch {
      // Error is handled by context
    }
  };
  
  // ============================================
  // VERIFY OTP
  // ============================================
  
  const handleVerifyOTP = useCallback(async () => {
    if (otp.length !== 6) return;
    
    setLocalError(null);
    clearError();
    
    try {
      await verifyPhoneOTP(otp);
      setSuccess(true);
    } catch {
      setOtp('');
    }
  }, [otp, verifyPhoneOTP, clearError]);
  
  // Auto-verify when OTP is complete
  useEffect(() => {
    if (otp.length === 6 && step === 'verify') {
      handleVerifyOTP();
    }
  }, [otp, step, handleVerifyOTP]);
  
  // ============================================
  // RESEND OTP
  // ============================================
  
  const handleResend = async () => {
    if (countdown > 0) return;
    
    setOtp('');
    setLocalError(null);
    clearError();
    
    try {
      await sendPhoneOTP(phone);
      setCountdown(60);
    } catch {
      // Error handled by context
    }
  };
  
  // ============================================
  // RENDER
  // ============================================
  
  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle2 className="w-16 h-16 mx-auto text-success mb-4" />
        </motion.div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Giriş Başarılı! 🎉
        </h3>
        <p className="text-muted-foreground">
          Hoş geldin, yönlendiriliyorsun...
        </p>
      </motion.div>
    );
  }
  
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
        
        {/* Phone input */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Telefon Numarası
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              +90
            </span>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="5XX XXX XX XX"
              className={cn(
                "w-full pl-14 pr-4 py-3.5 rounded-xl",
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
        
        {/* reCAPTCHA container (invisible) */}
        <div id="recaptcha-container" />
        
        {/* Submit button */}
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleSendOTP}
          isLoading={loading}
          loadingText="Gönderiliyor..."
          disabled={!phone || phone.replace(/\D/g, '').length < 10}
        >
          <Phone className="w-5 h-5 mr-2" />
          Kod Gönder
        </Button>
      </div>
    );
  }
  
  // Verify step
  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Numarayı Değiştir
      </button>
      
      {/* Phone display */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-1">
          Kod gönderildi:
        </p>
        <p className="text-lg font-medium text-foreground">
          +90 {phone}
        </p>
      </div>
      
      {/* OTP Input */}
      <OTPInput
        value={otp}
        onChange={setOtp}
        disabled={loading}
        autoFocus
      />
      
      {/* Error */}
      {(localError || error) && (
        <p className="text-center text-sm text-destructive">
          {localError || error?.userMessage}
        </p>
      )}
      
      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Doğrulanıyor...</span>
        </div>
      )}
      
      {/* Resend */}
      <div className="text-center">
        {countdown > 0 ? (
          <p className="text-sm text-muted-foreground">
            Tekrar gönder ({countdown}s)
          </p>
        ) : (
          <button
            onClick={handleResend}
            disabled={loading}
            className="text-sm text-primary hover:underline disabled:opacity-50"
          >
            Kodu tekrar gönder
          </button>
        )}
      </div>
      
      {/* reCAPTCHA container (invisible) */}
      <div id="recaptcha-container" />
    </div>
  );
}

export default PhoneAuth;

