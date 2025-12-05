'use client';

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Tabs Root Component
 * Container for the entire tabs interface
 */
const Tabs = TabsPrimitive.Root;

/**
 * Tabs List
 * Container for tab triggers/buttons
 */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-1",
      "rounded-xl p-1",
      "bg-white/[0.03] border border-white/[0.06]",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

/**
 * Tabs Trigger
 * Individual tab button
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap",
      "rounded-lg px-4 py-2.5",
      "text-sm font-medium text-white/60",
      "transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B6B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
      "disabled:pointer-events-none disabled:opacity-50",
      // Active state
      "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B6B] data-[state=active]:to-[#FF8E53]",
      "data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#FF6B6B]/20",
      // Hover state (non-active)
      "data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-white/[0.05]",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/**
 * Tabs Content
 * Panel content for each tab
 */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B6B]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
      // Animation
      "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:zoom-in-95",
      "data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=inactive]:zoom-out-95",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

/**
 * Animated Tabs variant with underline indicator
 */
interface AnimatedTabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const AnimatedTabs = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}: AnimatedTabsProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 p-1 rounded-xl",
        "bg-white/[0.03] border border-white/[0.06]",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative px-4 py-2.5 rounded-lg",
            "text-sm font-medium transition-colors duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B6B]",
            activeTab === tab.id ? "text-white" : "text-white/60 hover:text-white"
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] shadow-lg shadow-[#FF6B6B]/20"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {tab.icon}
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};

/**
 * Pill Tabs - Alternative style with pill indicators
 */
interface PillTabsProps {
  tabs: { id: string; label: string; count?: number }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

const PillTabs = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}: PillTabsProps) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B6B]",
            activeTab === tab.id
              ? "bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white shadow-lg shadow-[#FF6B6B]/20"
              : "bg-white/[0.03] border border-white/[0.06] text-white/60 hover:text-white hover:border-white/[0.1]"
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={cn(
                "ml-2 px-1.5 py-0.5 rounded-full text-xs",
                activeTab === tab.id
                  ? "bg-white/20"
                  : "bg-white/[0.05]"
              )}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent, AnimatedTabs, PillTabs };

