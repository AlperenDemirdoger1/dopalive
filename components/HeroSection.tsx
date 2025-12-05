'use client';

import { motion } from 'framer-motion';
import { Shield, Users, Cpu, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  onEarlyAccessClick?: () => void;
}

const HeroSection = ({ onEarlyAccessClick }: HeroSectionProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 md:px-8 lg:px-24 xl:px-40 py-20">
      <div className="max-w-[600px] w-full flex flex-col items-center text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <div className="rounded-full px-3 py-1.5 inline-flex items-center gap-2 bg-[#f5d4a0]/[0.06] border border-[#f5d4a0]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5d4a0]/70 animate-pulse" />
            <span className="text-[#f5d4a0]/70 text-[10px] font-medium tracking-wider uppercase">
              Bilim + Topluluk
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-white mb-0"
          style={{
            fontSize: 'clamp(26px, 5.5vw, 48px)',
            lineHeight: '1.15',
            letterSpacing: '-0.03em',
            fontWeight: 300,
          }}
        >
          Ertelemeyle çok uğraştın.
          <br />
          <span className="text-gradient">Biz de öyle.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/35 max-w-[400px] mt-5 font-light"
          style={{
            fontSize: 'clamp(12px, 1.5vw, 14px)',
            lineHeight: '1.7',
          }}
        >
          14 yıl bu yollardan geçtik. Psikologlar, ilaçlar, bitmek bilmeyen arayış...
          <span className="text-white/50"> Artık harita hazır.</span>
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <motion.button
            onClick={onEarlyAccessClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "px-6 py-3 rounded-xl",
              "bg-gradient-to-r from-[#f5d4a0] to-[#e8c87a]",
              "text-[#1a1a1a] text-sm font-medium",
              "transition-all duration-300",
              "hover:shadow-lg hover:shadow-[#f5d4a0]/20",
              "flex items-center gap-2"
            )}
          >
            <span>Erken Erişim</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex items-center justify-center gap-5"
        >
          {[
            { icon: Shield, label: 'Klinik Onaylı' },
            { icon: Users, label: 'Uzman Koçlar' },
            { icon: Cpu, label: 'AI Asistan' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 text-white/20"
            >
              <item.icon className="w-3 h-3" />
              <span className="text-[10px] font-light">{item.label}</span>
            </div>
          ))}
        </motion.div>
        
      </div>
    </div>
  );
};

export default HeroSection;
