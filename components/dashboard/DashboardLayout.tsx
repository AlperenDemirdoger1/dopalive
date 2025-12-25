'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import { cn } from '@/lib/utils';

/**
 * DopaLive Dashboard Layout
 * 
 * Main layout wrapper for all dashboard pages.
 * Provides consistent sidebar, header, and content area.
 */

interface DashboardLayoutProps {
  children: ReactNode;
  /** Optional page title for header */
  title?: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Optional right header content */
  headerAction?: ReactNode;
}

const DashboardLayout = ({ 
  children, 
  title, 
  subtitle,
  headerAction,
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar (Desktop) */}
      <DashboardSidebar />

      {/* Mobile Header */}
      <DashboardHeader />

      {/* Main Content Area */}
      <main className={cn(
        "min-h-screen",
        "pt-16 lg:pt-0", // Account for mobile header
        "lg:pl-[260px]", // Account for sidebar
        "transition-all duration-300"
      )}>
        {/* Page Header */}
        {(title || headerAction) && (
          <div className="sticky top-16 lg:top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border">
            <div className="flex items-center justify-between h-16 px-5 md:px-8">
              <div>
                {title && (
                  <h1 className="text-lg font-semibold text-foreground font-display">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-sm text-muted-foreground">{subtitle}</p>
                )}
              </div>
              {headerAction && (
                <div className="flex items-center gap-3">
                  {headerAction}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
          className="px-5 md:px-8 py-6"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardLayout;

