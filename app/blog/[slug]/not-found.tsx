'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Search, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#0a0a0a] to-[#050505]" />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute w-[600px] h-[300px] bg-[#f5d4a0] opacity-[0.03] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-5"
      >
        {/* 404 Number */}
        <div className="text-[120px] md:text-[180px] font-bold text-white/[0.05] font-syne leading-none mb-4">
          404
        </div>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#f5d4a0]/10 border border-[#f5d4a0]/20 flex items-center justify-center mx-auto mb-6 -mt-10">
          <Search className="w-7 h-7 text-[#f5d4a0]/60" />
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-3 font-syne">
          Article not found
        </h1>
        
        <p className="text-white/50 max-w-md mx-auto mb-8">
          Looks like this article doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/blog">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f5d4a0]/10 border border-[#f5d4a0]/20 text-[#f5d4a0] font-medium transition-colors hover:bg-[#f5d4a0]/20"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </motion.span>
          </Link>

          <Link href="/hero">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/70 font-medium transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <Home className="w-4 h-4" />
              Go Home
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}

