'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, ChevronRight, ArrowRight, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * DopaLive Logo Component - Flame icon with warm gradient background
 */
const DopaLiveLogo = ({ className }: { className?: string }) => (
  <div className={cn("w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-sm", className)}>
    <Flame className="w-5 h-5 text-white" />
  </div>
);

/**
 * Navigation links
 */
const navLinks = [
  { label: 'DEHB Danışmanlığı', href: '/coaching' },
  { label: 'Odak Bilimi', href: '/science' },
  { label: 'Hakkımızda', href: '/about' },
];

const SiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "transition-all duration-300",
          isScrolled 
            ? "py-3 bg-background/95 backdrop-blur-xl border-b border-border" 
            : "py-4 bg-background"
        )}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5"
          >
            <DopaLiveLogo />
            <span className="font-bold text-xl tracking-tight text-foreground">
              Dopa
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">
                Live
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-muted-foreground text-sm font-medium hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/experts"
              className={cn(
                "px-4 py-2 rounded-full",
                "border border-primary/30 bg-primary/5",
                "text-primary text-sm font-medium",
                "hover:bg-primary/10 hover:border-primary/50 transition-all",
                "flex items-center gap-1.5"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Uzman Ağına Katıl
            </Link>
            <Link
              href="/start"
              className={cn(
                "px-5 py-2.5 rounded-full",
                "bg-gradient-warm shadow-warm-sm",
                "text-white text-sm font-semibold",
                "hover:opacity-90 transition-opacity",
                "flex items-center gap-2"
              )}
            >
              Ücretsiz Başla
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center"
            aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-background border-l border-border lg:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <Link 
                  href="/" 
                  className="flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <DopaLiveLogo className="w-8 h-8" />
                  <span className="font-bold text-lg text-foreground">
                    Dopa
                    <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">
                      Live
                    </span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              <nav className="p-5">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-3.5 rounded-xl text-foreground font-medium hover:bg-muted transition-colors"
                      >
                        {link.label}
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 space-y-3">
                  <Link
                    href="/experts"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-xl text-center text-primary font-medium border border-primary/30 bg-primary/5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Uzman Ağına Katıl
                  </Link>
                  <Link
                    href="/start"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-3.5 rounded-xl text-center text-white font-semibold bg-gradient-warm shadow-warm-sm"
                  >
                    Ücretsiz Başla
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeader;
