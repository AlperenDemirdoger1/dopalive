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
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Settings,
  LogOut,
  MessageCircle,
} from 'lucide-react';

/**
 * DopaLive Dashboard Sidebar
 * 
 * ADHD-Friendly Design:
 * - Clear visual hierarchy
 * - Minimal cognitive load
 * - Warm, inviting aesthetic
 * - Smooth, purposeful animations
 */

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  isNew?: boolean;
}

const mainNavItems: NavItem[] = [
  { label: 'Ana Sayfa', href: '/dashboard', icon: Home },
  { label: 'Koçluk', href: '/dashboard/coaching', icon: GraduationCap },
  { label: 'Etkinlikler', href: '/dashboard/events', icon: Calendar },
  { label: 'Topluluk', href: '/dashboard/community', icon: Users },
  { label: 'Öğren', href: '/dashboard/learn', icon: BookOpen },
  { label: 'Ben', href: '/dashboard/me', icon: User },
];

const toolNavItems: NavItem[] = [
  { label: 'AI Koç', href: '/dashboard/ai-coach', icon: MessageCircle, badge: 'Beta', isNew: true },
];

const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40",
        "bg-background border-r border-border",
        "flex flex-col",
        "hidden lg:flex"
      )}
    >
      {/* Logo */}
      <div className="h-20 flex items-center px-5 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-warm flex items-center justify-center shadow-warm-sm flex-shrink-0">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-bold text-xl tracking-tight text-foreground whitespace-nowrap"
              >
                Dopa
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">
                  Live
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
        {/* Main Items */}
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              isActive={isActive(item.href)}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="py-4">
          <div className="h-px bg-border" />
        </div>

        {/* Tools Section */}
        <div className="space-y-1">
          {!isCollapsed && (
            <span className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Araçlar
            </span>
          )}
          {toolNavItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              isActive={isActive(item.href)}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </nav>

      {/* User Section */}
      <div className="border-t border-border p-3">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
            <div className="w-10 h-10 rounded-full bg-gradient-warm flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
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
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-warm flex items-center justify-center text-white font-semibold text-sm">
              A
            </div>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "absolute -right-3 top-24",
          "w-6 h-6 rounded-full",
          "bg-background border border-border shadow-sm",
          "flex items-center justify-center",
          "hover:bg-muted transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        )}
        aria-label={isCollapsed ? "Menüyü genişlet" : "Menüyü daralt"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-muted-foreground" />
        )}
      </button>
    </motion.aside>
  );
};

/**
 * Navigation Link Component
 */
interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
}

const NavLink = ({ item, isActive, isCollapsed }: NavLinkProps) => {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "relative flex items-center gap-3 px-3 py-2.5 rounded-xl w-full",
        "transition-all duration-200",
        "group",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        isCollapsed && "justify-center px-0"
      )}
    >
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary"
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        />
      )}

      <Icon className={cn(
        "w-5 h-5 flex-shrink-0 transition-colors",
        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
      )} />

      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "font-medium text-sm whitespace-nowrap",
              isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
            )}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Badge */}
      {item.badge && !isCollapsed && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "ml-auto px-2 py-0.5 rounded-full text-xs font-medium",
            item.isNew
              ? "bg-primary/15 text-primary"
              : "bg-muted text-muted-foreground"
          )}
        >
          {item.badge}
        </motion.span>
      )}

      {/* New indicator dot for collapsed state */}
      {item.isNew && isCollapsed && (
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
      )}
    </Link>
  );
};

export default DashboardSidebar;

