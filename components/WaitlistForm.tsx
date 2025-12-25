'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="w-10 h-10 rounded-lg bg-[#f5d4a0]/10 flex items-center justify-center mx-auto mb-3"
          >
            <Check className="w-5 h-5 text-[#f5d4a0]" strokeWidth={2} />
          </motion.div>
          <p className="text-white/70 text-sm font-light">
            Listeye eklendin!
          </p>
        </motion.div>
      ) : (
        <motion.form 
          key="form"
          onSubmit={handleSubmit} 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={cn(
            "rounded-xl p-1 flex items-center gap-1.5",
            "bg-white/[0.02] border transition-all duration-300",
            isFocused ? "border-[#f5d4a0]/15" : "border-white/[0.05]"
          )}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="E-posta"
              required
              className="flex-1 bg-transparent px-3 py-2.5 text-white/80 text-sm font-light placeholder:text-white/25 focus:outline-none"
            />
            
            <motion.button
              type="submit"
              disabled={isLoading || !email}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "px-4 py-2.5 rounded-lg",
                "bg-gradient-to-r from-[#f5d4a0] to-[#e8c87a]",
                "text-[#1a1a1a] text-xs font-medium",
                "transition-all duration-300",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                "flex items-center gap-1.5"
              )}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Erken Erişim</span>
                  <ArrowRight className="w-3 h-3" />
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default WaitlistForm;
