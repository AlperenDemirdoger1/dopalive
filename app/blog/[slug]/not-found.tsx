'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Search, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-background flex items-center justify-center">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-5"
      >
        {/* 404 Number */}
        <div className="text-[120px] md:text-[180px] font-bold text-foreground/5 font-syne leading-none mb-4">
          404
        </div>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 -mt-10">
          <Search className="w-7 h-7 text-primary/60" />
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-3 font-syne">
          Makale bulunamadı
        </h1>
        
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Bu makale mevcut değil veya taşınmış olabilir. Sizi doğru yere yönlendirelim.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/blog">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-medium transition-colors hover:bg-primary/20"
            >
              <ArrowLeft className="w-4 h-4" />
              Blog&apos;a Dön
            </motion.span>
          </Link>

          <Link href="/">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border text-muted-foreground font-medium transition-colors hover:bg-muted hover:text-foreground"
            >
              <Home className="w-4 h-4" />
              Ana Sayfa
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
