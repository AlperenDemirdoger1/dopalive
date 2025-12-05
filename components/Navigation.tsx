'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  onExpertClick?: () => void;
}

const Navigation = ({ onExpertClick }: NavigationProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-5 md:px-8 py-5"
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/hero" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center"
          >
            <div className="w-3 h-3 rounded-full border border-[#f5d4a0]/60" />
          </motion.div>
          <span className="text-white/80 text-base font-light tracking-tight">dopalive</span>
        </Link>

        {/* Uzman Ağına Katıl */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onExpertClick}
          className={cn(
            "group px-4 py-2 rounded-lg",
            "bg-[#f5d4a0]/[0.06] border border-[#f5d4a0]/10",
            "hover:border-[#f5d4a0]/20 transition-all duration-300"
          )}
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#f5d4a0]/60" />
            <span className="text-xs text-white/60 group-hover:text-[#f5d4a0]/80 transition-colors">
              Uzman Ağına Katıl
            </span>
          </span>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navigation;
