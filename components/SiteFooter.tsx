'use client';

import * as React from "react";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Heart,
  ArrowRight,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

/**
 * DopaLive Logo Component (Footer version)
 */
const DopaLiveLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    className={cn("w-8 h-8", className)}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="footer-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E8735A" />
        <stop offset="100%" stopColor="#F5D4A0" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="14" fill="url(#footer-logo-gradient)" />
    <path
      d="M11 9h5c4.418 0 8 3.582 8 8s-3.582 8-8 8h-5V9z"
      fill="white"
      fillOpacity="0.9"
    />
    <circle cx="22" cy="10" r="4" fill="#4ADE80" />
  </svg>
);

/**
 * Footer link configuration
 */
const footerLinks = {
  product: [
    { label: 'Nasıl Çalışır', href: '/how-it-works' },
    { label: 'Özellikler', href: '/features' },
    { label: 'Fiyatlar', href: '/pricing' },
    { label: 'Sık Sorulanlar', href: '/faq' },
  ],
  company: [
    { label: 'Hakkımızda', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Kariyer', href: '/careers' },
    { label: 'İletişim', href: '/contact' },
  ],
  resources: [
    { label: 'DEHB Rehberi', href: '/adhd-guide' },
    { label: 'Topluluk', href: '/community' },
    { label: 'Yardım Merkezi', href: '/help' },
    { label: 'Bilim', href: '/science' },
  ],
  legal: [
    { label: 'Gizlilik', href: '/privacy' },
    { label: 'Kullanım Şartları', href: '/terms' },
    { label: 'Çerezler', href: '/cookies' },
  ],
};

/**
 * Social media links
 */
const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/dopalive', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/dopalive', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/dopalive', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:merhaba@dopalive.app', label: 'E-posta' },
];

/**
 * SiteFooter Component
 *
 * DopaLive's footer - Warm, inviting, ADHD-friendly:
 * - Clear link hierarchy
 * - Newsletter with reward feedback
 * - Social proof elements
 */
const SiteFooter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer 
      className="relative bg-card border-t border-border"
      role="contentinfo"
    >
      {/* Warm ambient glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" 
        aria-hidden="true"
      />
      
      <div className="container-wide py-16 lg:py-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-6 lg:col-span-4">
            {/* Logo */}
            <Link 
              href="/" 
              className="inline-flex items-center gap-2.5 mb-5 focus-ring rounded-xl"
            >
              <DopaLiveLogo />
              <span className="font-display font-bold text-xl tracking-tight">
                <span className="text-primary">Dopa</span>
                <span className="text-foreground">Live</span>
              </span>
            </Link>

            <p className="text-muted-foreground text-sm leading-relaxed max-w-[300px] mb-6">
              DEHB'li yaratıcılar için, DEHB'li yaratıcılar tarafından. 
              Birlikte odaklan, birlikte başar.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "w-10 h-10 rounded-xl",
                    "bg-muted/50 border border-border",
                    "flex items-center justify-center",
                    "text-muted-foreground hover:text-primary",
                    "hover:border-primary/30 hover:bg-primary/5",
                    "transition-colors duration-200",
                    "focus-ring"
                  )}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-display font-semibold text-foreground text-sm mb-4">
              Ürün
            </h4>
            <ul className="space-y-3" role="list">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200 focus-ring rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-display font-semibold text-foreground text-sm mb-4">
              Şirket
            </h4>
            <ul className="space-y-3" role="list">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200 focus-ring rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="font-display font-semibold text-foreground text-sm mb-4">
              Kaynaklar
            </h4>
            <ul className="space-y-3" role="list">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200 focus-ring rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <h4 className="font-display font-semibold text-foreground text-sm mb-4">
              Bülten
            </h4>
            <p className="text-muted-foreground text-sm mb-4">
              DEHB ipuçları ve DopaLive güncellemeleri.
            </p>
            
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-success text-sm p-3 rounded-xl bg-success/10 border border-success/20"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Teşekkürler! 🎉</span>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta adresin"
                    required
                    className="input-base pr-12"
                    aria-label="Bülten için e-posta adresi"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "absolute right-1.5 top-1/2 -translate-y-1/2",
                      "w-9 h-9 rounded-lg",
                      "bg-gradient-warm",
                      "flex items-center justify-center",
                      "text-white",
                      "hover:opacity-90 transition-opacity",
                      "disabled:opacity-50",
                      "focus-ring"
                    )}
                    aria-label="Bültene abone ol"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Made with love */}
            <p className="text-muted-foreground text-sm flex items-center gap-1.5">
              DEHB topluluğu için{' '}
              <Heart 
                className="w-4 h-4 text-primary fill-primary" 
                aria-label="sevgi"
              />{' '}
              ile yapıldı
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              {footerLinks.legal.map((link, index) => (
                <React.Fragment key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200 focus-ring rounded"
                  >
                    {link.label}
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="text-border hidden md:inline">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} DopaLive
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
