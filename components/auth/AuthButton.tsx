'use client';

/**
 * AuthButton Component
 * 
 * Shows sign in button or user menu based on auth state.
 * Opens AuthModal for sign in, OnboardingModal for new users.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Settings, ChevronDown, Loader2 } from 'lucide-react';
import { useAuth, useNeedsOnboarding } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AuthModal } from './AuthModal';
import { OnboardingModal } from './OnboardingModal';

interface AuthButtonProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function AuthButton({ className, variant = 'default' }: AuthButtonProps) {
  const { user, loading, initialized, logout } = useAuth();
  const needsOnboarding = useNeedsOnboarding();
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Show onboarding for new users
  useEffect(() => {
    if (user && needsOnboarding) {
      setShowOnboarding(true);
    }
  }, [user, needsOnboarding]);
  
  // Close menu on outside click
  useEffect(() => {
    if (!showUserMenu) return;
    
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-user-menu]')) {
        setShowUserMenu(false);
      }
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [showUserMenu]);
  
  // Loading state
  if (!initialized || loading) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  // Not logged in - show sign in button
  if (!user) {
    return (
      <>
        <Button
          variant="primary"
          size={variant === 'compact' ? 'sm' : 'md'}
          onClick={() => setShowAuthModal(true)}
          className={className}
        >
          Giriş Yap
        </Button>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowAuthModal(false)}
        />
      </>
    );
  }
  
  // Logged in - show user menu
  const displayName = user.displayName || user.email?.split('@')[0] || 'Kullanıcı';
  const initials = displayName.slice(0, 2).toUpperCase();
  
  return (
    <>
      <div className={cn("relative", className)} data-user-menu>
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className={cn(
            "flex items-center gap-2 px-2 py-1.5 rounded-xl",
            "hover:bg-muted transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          )}
        >
          {/* Avatar */}
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={displayName}
              className="w-8 h-8 rounded-lg object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
              {initials}
            </div>
          )}
          
          {/* Name (desktop only) */}
          {variant === 'default' && (
            <span className="hidden sm:block text-sm font-medium text-foreground max-w-[100px] truncate">
              {displayName}
            </span>
          )}
          
          <ChevronDown className={cn(
            "w-4 h-4 text-muted-foreground transition-transform",
            showUserMenu && "rotate-180"
          )} />
        </button>
        
        {/* Dropdown Menu */}
        <AnimatePresence>
          {showUserMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "absolute right-0 top-full mt-2 w-56",
                "bg-card border border-border rounded-xl shadow-lg",
                "overflow-hidden z-50"
              )}
            >
              {/* User Info */}
              <div className="p-3 border-b border-border">
                <p className="font-medium text-foreground truncate">
                  {displayName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email || user.phone}
                </p>
              </div>
              
              {/* Menu Items */}
              <div className="p-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    // TODO: Navigate to settings
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
                >
                  <Settings className="w-4 h-4 text-muted-foreground" />
                  Ayarlar
                </button>
                
                <button
                  onClick={async () => {
                    setShowUserMenu(false);
                    await logout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/5 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Çıkış Yap
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onComplete={() => setShowOnboarding(false)}
      />
    </>
  );
}

export default AuthButton;

