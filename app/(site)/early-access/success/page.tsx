'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [queueNumber, setQueueNumber] = useState<number | null>(null);

  useEffect(() => {
    // URL'den queue number'ı al veya random oluştur
    const queue = searchParams.get('queue');
    if (queue) {
      setQueueNumber(parseInt(queue));
    } else {
      setQueueNumber(Math.floor(Math.random() * 200) + 50);
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[500px] w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </motion.div>
        
        <h1 className="text-foreground text-2xl font-display font-bold mb-4">
          Türkiye'nin en büyük DEHB platformuna hoş geldin
        </h1>
        
        {queueNumber && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <p className="text-primary text-3xl font-bold mb-3">
              Sıralaman: #{queueNumber}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-2">
              Yalnız değilsin. Yakında dönüş yapacağız — biz de mükemmelliyetçilik kurbanıyız, biraz bekleteceğiz 😊
            </p>
            <p className="text-muted-foreground text-xs">
              Öncelikli gruba almak için mailini kontrol et.
            </p>
          </motion.div>
        )}
        
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-gradient-warm text-white font-medium hover:opacity-90 transition-opacity"
        >
          Ana Sayfaya Dön
        </Link>
      </motion.div>
    </main>
  );
}

export default function EarlyAccessSuccessPage() {
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

