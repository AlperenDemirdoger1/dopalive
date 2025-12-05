'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, ArrowRight, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsletterSignupProps {
  variant?: 'sidebar' | 'inline';
}

export default function NewsletterSignup({ variant = 'sidebar' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus('success');
    setEmail('');
    
    // Reset after delay
    setTimeout(() => setStatus('idle'), 3000);
  };

  if (variant === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#f5d4a0]/10 via-[#f5d4a0]/5 to-purple-500/5 border border-[#f5d4a0]/10 p-8 md:p-12"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f5d4a0]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5d4a0]/10 border border-[#f5d4a0]/20 text-[#f5d4a0] text-xs font-medium mb-6">
            <Sparkles className="w-3 h-3" />
            Weekly ADHD Insights
          </div>
          
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3 font-syne">
            Get ADHD productivity tips in your inbox
          </h3>
          <p className="text-white/50 mb-8">
            Join 2,000+ creators getting weekly tactics for finishing what you start.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={status === 'loading' || status === 'success'}
                className={cn(
                  "w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/[0.05] border transition-all duration-300",
                  "text-white placeholder:text-white/30 focus:outline-none",
                  isFocused ? "border-[#f5d4a0]/30" : "border-white/[0.08]"
                )}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === 'loading' || status === 'success' || !email}
              className={cn(
                "px-6 py-3.5 rounded-xl font-medium transition-all duration-300",
                "flex items-center justify-center gap-2",
                status === 'success'
                  ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
                  : "bg-[#f5d4a0]/20 border border-[#f5d4a0]/30 text-[#f5d4a0] hover:bg-[#f5d4a0]/30"
              )}
            >
              {status === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : status === 'success' ? (
                <>
                  <Check className="w-5 h-5" />
                  Subscribed!
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          <p className="text-white/30 text-xs mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </motion.div>
    );
  }

  // Sidebar variant
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sticky top-24"
    >
      <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6 overflow-hidden relative">
        {/* Subtle glow */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#f5d4a0]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-[#f5d4a0]/10 border border-[#f5d4a0]/20 flex items-center justify-center mb-4">
            <Mail className="w-5 h-5 text-[#f5d4a0]" />
          </div>

          <h4 className="text-lg font-semibold text-white mb-2 font-syne">
            Stay in the loop
          </h4>
          <p className="text-white/50 text-sm mb-5">
            Weekly ADHD productivity tactics and community updates.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={status === 'loading' || status === 'success'}
              className={cn(
                "w-full px-4 py-3 rounded-lg bg-white/[0.03] border transition-all duration-300",
                "text-white text-sm placeholder:text-white/30 focus:outline-none",
                isFocused ? "border-[#f5d4a0]/30" : "border-white/[0.08]"
              )}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={status === 'loading' || status === 'success' || !email}
              className={cn(
                "w-full py-3 rounded-lg font-medium text-sm transition-all duration-300",
                "flex items-center justify-center gap-2",
                status === 'success'
                  ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
                  : "bg-[#f5d4a0]/10 border border-[#f5d4a0]/20 text-[#f5d4a0] hover:bg-[#f5d4a0]/20"
              )}
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : status === 'success' ? (
                <>
                  <Check className="w-4 h-4" />
                  You&apos;re in!
                </>
              ) : (
                'Subscribe'
              )}
            </motion.button>
          </form>

          <p className="text-white/25 text-xs mt-3 text-center">
            Join 2,000+ ADHD creators
          </p>
        </div>
      </div>
    </motion.div>
  );
}

