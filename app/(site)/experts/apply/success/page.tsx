'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Suspense, useEffect } from 'react';
import Link from 'next/link';

// Basit conversion event tetikleyici (gtag varsa)
type GtagFn = (...args: any[]) => void;

const trackConversion = () => {
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    const gtag = (window as any).gtag as GtagFn;
    gtag('event', 'expert_apply_success', {
      event_category: 'conversion',
      event_label: 'experts_apply_success',
    });
  }
};

function SuccessContent() {
  useEffect(() => {
    trackConversion();
  }, []);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[520px] w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </motion.div>
        
        <h1 className="text-foreground text-2xl font-display font-bold mb-3">
          Başvurunuz alındı
        </h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Uzman ağımıza katılmak için başvurduğunuz için teşekkür ederiz.
            Başvurunuzu değerlendiriyoruz ve en kısa sürede size dönüş yapacağız.
          </p>
          <p className="text-muted-foreground text-xs">
            Değerlendirme sürecinde size ulaşabilmemiz için mailinizi kontrol etmeyi unutmayın.
          </p>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-lg bg-gradient-warm text-white font-medium hover:opacity-90 transition-opacity"
          >
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/experts"
            className="inline-block px-6 py-3 rounded-lg border border-border bg-card text-foreground font-medium hover:bg-muted transition-colors"
          >
            Uzman Ağı Sayfası
          </Link>
        </div>
      </motion.div>
    </main>
  );
}

export default function ExpertApplicationSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Yükleniyor...</div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}

