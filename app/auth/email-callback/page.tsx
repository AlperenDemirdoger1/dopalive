'use client';

/**
 * Email Magic Link Callback Page
 * 
 * Handles the redirect from email magic links.
 * Automatically completes sign-in if valid.
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, XCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth, isMagicLinkUrl, completeMagicLinkSignIn } from '@/lib/auth';
import { fadeInUp } from '@/lib/motion';

type Status = 'loading' | 'success' | 'error' | 'need-email';

export default function EmailCallbackPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    const verifyMagicLink = async () => {
      // Check if this is actually a magic link
      if (typeof window === 'undefined') return;
      
      if (!isMagicLinkUrl(window.location.href)) {
        setStatus('error');
        setError('Bu bağlantı geçersiz veya süresi dolmuş.');
        return;
      }
      
      // Try to get email from localStorage
      const savedEmail = localStorage.getItem('emailForSignIn');
      
      if (!savedEmail) {
        // Need to ask for email (different device/browser)
        setStatus('need-email');
        return;
      }
      
      try {
        await completeMagicLinkSignIn(savedEmail);
        setStatus('success');
        
        // Redirect after success
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } catch (err: unknown) {
        console.error('Magic link verification failed:', err);
        setStatus('error');
        const authError = err as { code?: string };
        if (authError.code === 'auth/invalid-action-code') {
          setError('Bu bağlantının süresi dolmuş. Yeni bağlantı iste.');
        } else if (authError.code === 'auth/expired-action-code') {
          setError('Bu bağlantının süresi dolmuş. Yeni bağlantı iste.');
        } else {
          setError('Giriş yapılamadı. Lütfen tekrar dene.');
        }
      }
    };
    
    // If already logged in, redirect
    if (user) {
      router.push('/');
      return;
    }
    
    verifyMagicLink();
  }, [user, router]);
  
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setStatus('loading');
    
    try {
      await completeMagicLinkSignIn(email);
      setStatus('success');
      
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err: unknown) {
      console.error('Magic link verification failed:', err);
      setStatus('error');
      setError('E-posta eşleşmedi veya bağlantı geçersiz.');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-md w-full text-center"
      >
        {/* Loading */}
        {status === 'loading' && (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">
              Giriş Yapılıyor...
            </h1>
            <p className="text-muted-foreground">
              Lütfen bekle, seni yönlendiriyoruz.
            </p>
          </div>
        )}
        
        {/* Success */}
        {status === 'success' && (
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center"
            >
              <CheckCircle2 className="w-8 h-8 text-success" />
            </motion.div>
            <h1 className="text-xl font-semibold text-foreground">
              Giriş Başarılı! 🎉
            </h1>
            <p className="text-muted-foreground">
              Hoş geldin! Ana sayfaya yönlendiriliyorsun...
            </p>
          </div>
        )}
        
        {/* Error */}
        {status === 'error' && (
          <div className="space-y-6">
            <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Bir Sorun Oluştu
              </h1>
              <p className="text-muted-foreground mt-2">
                {error}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                onClick={() => router.push('/')}
              >
                Ana Sayfaya Dön
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push('/?auth=true')}
              >
                Tekrar Giriş Yap
              </Button>
            </div>
          </div>
        )}
        
        {/* Need Email (different device) */}
        {status === 'need-email' && (
          <div className="space-y-6">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                E-postanı Doğrula
              </h1>
              <p className="text-muted-foreground mt-2">
                Farklı bir cihazdan giriş yapıyorsun.<br />
                Güvenlik için e-postanı gir.
              </p>
            </div>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@email.com"
                className="w-full px-4 py-3 rounded-xl bg-muted border-2 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:border-primary"
                autoFocus
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={!email}
              >
                Giriş Yap
              </Button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}

