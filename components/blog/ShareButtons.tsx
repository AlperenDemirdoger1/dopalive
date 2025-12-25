'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Twitter, Linkedin, Link2, Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
  title: string;
  url: string;
  variant?: 'horizontal' | 'vertical';
}

export default function ShareButtons({ title, url, variant = 'horizontal' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setShowToast(true);
      setTimeout(() => {
        setCopied(false);
        setShowToast(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const buttonClass = cn(
    "flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
    "bg-white/[0.03] border border-white/[0.08] text-white/60",
    "hover:bg-white/[0.06] hover:border-white/[0.15] hover:text-white"
  );

  if (variant === 'vertical') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky top-24 flex flex-col gap-3"
      >
        <span className="text-white/30 text-xs font-medium uppercase tracking-wider mb-1">
          Share
        </span>

        <motion.a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, x: 4 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300",
            "bg-white/[0.03] border border-white/[0.08] text-white/50",
            "hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/30 hover:text-[#1DA1F2]"
          )}
        >
          <Twitter className="w-5 h-5" />
        </motion.a>

        <motion.a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, x: 4 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300",
            "bg-white/[0.03] border border-white/[0.08] text-white/50",
            "hover:bg-[#0077B5]/10 hover:border-[#0077B5]/30 hover:text-[#0077B5]"
          )}
        >
          <Linkedin className="w-5 h-5" />
        </motion.a>

        <motion.button
          onClick={copyToClipboard}
          whileHover={{ scale: 1.05, x: 4 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300",
            "bg-white/[0.03] border border-white/[0.08]",
            copied
              ? "text-emerald-400 border-emerald-500/30"
              : "text-white/50 hover:border-white/[0.2] hover:text-white/70"
          )}
        >
          {copied ? <Check className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <div className="flex items-center gap-2 flex-wrap">
        <span className="flex items-center gap-2 text-white/40 text-sm mr-2">
          <Share2 className="w-4 h-4" />
          Share
        </span>

        <motion.a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            buttonClass,
            "hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/30 hover:text-[#1DA1F2]"
          )}
        >
          <Twitter className="w-4 h-4" />
          <span className="hidden sm:inline">Twitter</span>
        </motion.a>

        <motion.a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            buttonClass,
            "hover:bg-[#0077B5]/10 hover:border-[#0077B5]/30 hover:text-[#0077B5]"
          )}
        >
          <Linkedin className="w-4 h-4" />
          <span className="hidden sm:inline">LinkedIn</span>
        </motion.a>

        <motion.button
          onClick={copyToClipboard}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            buttonClass,
            copied && "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
          )}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Copy link</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-3 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm"
          >
            Link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}






