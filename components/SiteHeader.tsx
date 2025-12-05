'use client';

import * as React from "react";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { slideInRight, buttonPress } from '@/lib/motion';

/**
 * DopaLive Logo Component
 */
const DopaLiveLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    className={cn("w-8 h-8", className)}
    aria-hidden="true"
  >
    {/* Warm gradient background */}
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E8735A" />
        <stop offset="100%" stopColor="#F5D4A0" />
      </linearGradient>
    </defs>
    {/* Main circle */}
    <circle cx="16" cy="16" r="14" fill="url(#logo-gradient)" />
    {/* Inner D shape */}
    <path
      d="M11 9h5c4.418 0 8 3.582 8 8s-3.582 8-8 8h-5V9z"
      fill="white"
      fillOpacity="0.9"
    />
    {/* Live dot */}
    <circle cx="22" cy="10" r="4" fill="#4ADE80" />
  </svg>
);

/**
 * Navigation link configuration
 */
const navLinks = [
  { label: 'Nasıl Çalışır', href: '/how-it-works' },
  { label: 'Özellikler', href: '/features' },
  { label: 'Bilim', href: '/science' },
  { label: 'Fiyatlar', href: '/pricing' },
];

/**
 * SiteHeader Component
 *
 * DopaLive's main navigation header - ADHD-friendly design:
 * - Clear, warm branding
 * - Simple navigation (4 items max to reduce cognitive load)
 * - High contrast CTAs
 * - Smooth, predictable animations
 */
const SiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu open
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
          "transition-all duration-400 ease-out",
          isScrolled 
            ? "py-3 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-warm-sm" 
            : "py-4"
        )}
        role="banner"
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 focus-ring rounded-xl p-1 -m-1"
            aria-label="DopaLive Ana Sayfa"
          >
            <motion.div {...buttonPress}>
              <DopaLiveLogo />
            </motion.div>
            <span className="font-display font-bold text-xl tracking-tight">
              <span className="text-primary">Dopa</span>
              <span className="text-foreground">Live</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex items-center gap-1"
            role="navigation"
            aria-label="Ana navigasyon"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-xl",
                  "text-muted-foreground text-sm font-medium",
                  "hover:text-foreground hover:bg-muted/50",
                  "transition-colors duration-200",
                  "focus-ring"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className={cn(
                "px-4 py-2 rounded-xl",
                "text-muted-foreground text-sm font-medium",
                "hover:text-foreground transition-colors duration-200",
                "focus-ring"
              )}
            >
              Giriş Yap
            </Link>
            <Button
              variant="primary"
              size="md"
              rightIcon={Sparkles}
              iconSize={16}
              asChild
            >
              <Link href="/signup">
                Başla
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "md:hidden",
              "w-11 h-11 rounded-xl",
              "bg-muted/50 border border-border",
              "flex items-center justify-center",
              "transition-all duration-200",
              "hover:bg-muted",
              "focus-ring"
            )}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 text-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5 text-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              id="mobile-menu"
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "fixed top-0 right-0 bottom-0 z-50",
                "w-full max-w-sm",
                "bg-background border-l border-border",
                "md:hidden"
              )}
              role="dialog"
              aria-modal="true"
              aria-label="Mobil navigasyon"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-5 border-b border-border">
                <Link 
                  href="/" 
                  className="flex items-center gap-2.5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <DopaLiveLogo className="w-7 h-7" />
                  <span className="font-display font-bold text-lg">
                    <span className="text-primary">Dopa</span>
                    <span className="text-foreground">Live</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "w-10 h-10 rounded-xl",
                    "bg-muted/50 border border-border",
                    "flex items-center justify-center",
                    "focus-ring"
                  )}
                  aria-label="Menüyü kapat"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Menu Content */}
              <nav className="p-5" role="navigation">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between",
                          "px-4 py-3.5 rounded-xl",
                          "text-foreground text-base font-medium",
                          "hover:bg-muted/50 transition-colors duration-200"
                        )}
                      >
                        {link.label}
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Divider */}
                <div className="my-6 h-px bg-border" />

                {/* Auth Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-center",
                      "w-full px-4 py-3.5 rounded-xl",
                      "text-foreground text-base font-medium",
                      "border border-border",
                      "hover:bg-muted/50 transition-colors duration-200"
                    )}
                  >
                    Giriş Yap
                  </Link>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    rightIcon={Sparkles}
                    asChild
                  >
                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      Hemen Başla
                    </Link>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeader;
