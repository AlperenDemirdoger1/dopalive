'use client';

import Link from 'next/link';
import { Heart, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

const DopaLiveLogo = ({ className }: { className?: string }) => (
  <div className={cn("w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-sm", className)}>
    <Flame className="w-5 h-5 text-white" />
  </div>
);

const footerLinks = {
  product: [
    { label: 'DEHB Danışmanlığı', href: '/coaching' },
    { label: 'Odak Bilimi', href: '/science' },
    { label: 'SSS', href: '/faq' },
  ],
  company: [
    { label: 'Hakkımızda', href: '/about' },
    { label: 'Uzman Ağı', href: '/experts' },
    { label: 'İletişim', href: '/about#contact' },
  ],
  legal: [
    { label: 'Gizlilik Politikası', href: '/privacy' },
    { label: 'Kullanım Şartları', href: '/terms' },
  ],
};

// Social links temporarily disabled

const SiteFooter = () => {
  return (
    <footer className="relative bg-muted/30 border-t border-border">
      <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <DopaLiveLogo />
              <span className="font-bold text-xl text-foreground">
                Dopa
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">
                  Live
                </span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-[260px]">
              DEHB nörobiliminde uzman danışmanlarla beynini anla, potansiyelini keşfet.
            </p>
            {/* Social links temporarily disabled */}
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-5">Ürün</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-5">Şirket</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-5">Yasal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm flex items-center gap-1.5">
            DEHB topluluğu için <Heart className="w-3.5 h-3.5 text-primary fill-primary" /> ile yapıldı
          </p>
          <p className="text-muted-foreground text-sm">
            © 2025 DopaLive. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
