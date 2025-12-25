'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  GraduationCap,
  Calendar,
  Users,
  BookOpen,
  User,
  Bot,
  Flame,
  Menu,
  X,
  ChevronRight,
  Search,
  Bell,
  Settings,
} from 'lucide-react';

/**
 * DopaLive Dashboard Header (Mobile)
 * 
 * ADHD-Friendly Design:
 * - Simple, scannable layout
 * - Clear navigation hierarchy
 * - Quick access to key features
 */

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  isNew?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Ana Sayfa', href: '/dashboard', icon: Home },
  { label: 'Koçluk', href: '/dashboard/coaching', icon: GraduationCap },
  { label: 'Etkinlikler', href: '/dashboard/events', icon: Calendar },
  { label: 'Topluluk', href: '/dashboard/community', icon: Users },
  { label: 'Öğren', href: '/dashboard/learn', icon: BookOpen },
  { label: 'Ben', href: '/dashboard/me', icon: User },
  { label: 'AI Koç', href: '/dashboard/ai-coach', icon: Bot, badge: 'Beta', isNew: true },
];

const DashboardHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  // Get current page title
  const currentPage = navItems.find(item => isActive(item.href));
  const pageTitle = currentPage?.label || 'Dashboard';

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center"
            aria-label="Menüyü aç"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-warm flex items-center justify-center shadow-warm-sm">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground">
              Dopa
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">
                Live
              </span>
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-xl hover:bg-muted flex items-center justify-center transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-md lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-full max-w-xs bg-background border-r border-border lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between h-16 px-4 border-b border-border">
                <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="w-8 h-8 rounded-lg bg-gradient-warm flex items-center justify-center shadow-warm-sm">
                    <Flame className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-lg tracking-tight text-foreground">
                    Dopa
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">
                      Live
                    </span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center"
                  aria-label="Menüyü kapat"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <Icon className={cn("w-5 h-5", active && "text-primary")} />
                        <span className={cn("font-medium", active && "text-primary")}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className={cn(
                            "ml-auto px-2 py-0.5 rounded-full text-xs font-medium",
                            item.isNew
                              ? "bg-primary/15 text-primary"
                              : "bg-muted text-muted-foreground"
                          )}>
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground" />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* User Section */}
              <div className="border-t border-border p-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-warm flex items-center justify-center text-white font-semibold text-sm">
                    A
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-medium text-sm truncate">Alperen</p>
                    <p className="text-muted-foreground text-xs truncate">Odak Planı</p>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                    <Settings className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardHeader;

