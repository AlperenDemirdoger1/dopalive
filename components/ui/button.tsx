'use client';

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * DopaLive Button Variants
 * 
 * ADHD-Friendly Design:
 * - High contrast for visibility
 * - Clear tap targets (min 44px)
 * - Satisfying press feedback
 * - Loading states for async actions
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none cursor-pointer",
  ],
  {
    variants: {
      variant: {
        /** Primary - Warm gradient, main CTA */
        primary: [
          "bg-gradient-warm text-white font-semibold",
          "shadow-warm-md hover:shadow-warm-lg",
          "focus-visible:ring-primary focus-visible:ring-offset-background",
          "rounded-xl",
        ],
        /** Secondary - Soft, supportive action */
        secondary: [
          "bg-secondary/20 text-secondary-foreground",
          "border border-secondary/30",
          "hover:bg-secondary/30",
          "focus-visible:ring-secondary focus-visible:ring-offset-background",
          "rounded-xl",
        ],
        /** Ghost - Minimal, text-like */
        ghost: [
          "text-foreground",
          "hover:bg-muted",
          "focus-visible:ring-primary/50 focus-visible:ring-offset-background",
          "rounded-xl",
        ],
        /** Outline - Clear border */
        outline: [
          "border-2 border-primary/50 text-primary",
          "hover:bg-primary/5 hover:border-primary",
          "focus-visible:ring-primary focus-visible:ring-offset-background",
          "rounded-xl",
        ],
        /** Focus - Blue, for concentration states */
        focus: [
          "bg-gradient-focus text-white font-semibold",
          "shadow-md hover:shadow-lg",
          "focus-visible:ring-accent focus-visible:ring-offset-background",
          "rounded-xl",
        ],
        /** Success/Reward - Green, positive actions */
        success: [
          "bg-gradient-reward text-white font-semibold",
          "shadow-md hover:shadow-lg",
          "focus-visible:ring-success focus-visible:ring-offset-background",
          "rounded-xl",
        ],
        /** Destructive - Gentle red */
        destructive: [
          "bg-destructive/10 text-destructive border border-destructive/20",
          "hover:bg-destructive/20",
          "focus-visible:ring-destructive focus-visible:ring-offset-background",
          "rounded-xl",
        ],
        /** Link - Text link style */
        link: [
          "text-primary underline-offset-4 hover:underline",
          "p-0 h-auto",
        ],
      },
      size: {
        sm: "h-9 px-3.5 text-sm min-w-[44px]",
        md: "h-11 px-5 text-sm min-w-[44px]",
        lg: "h-13 px-6 text-base min-w-[44px]",
        xl: "h-14 px-8 text-base min-w-[44px]",
        icon: "h-11 w-11 p-0",
        "icon-sm": "h-9 w-9 p-0",
        "icon-lg": "h-13 w-13 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof buttonVariants> {
  /** Use child component as button (Radix Slot pattern) */
  asChild?: boolean;
  /** Enable Framer Motion hover/tap animations */
  withMotion?: boolean;
  /** Show loading spinner and disable interactions */
  isLoading?: boolean;
  /** Loading text to display */
  loadingText?: string;
  /** Icon to display on the left side */
  leftIcon?: LucideIcon;
  /** Icon to display on the right side */
  rightIcon?: LucideIcon;
  /** Icon size in pixels */
  iconSize?: number;
  /** Button content */
  children?: React.ReactNode;
}

/**
 * Button Component
 *
 * DopaLive's primary button with ADHD-friendly design:
 * - Satisfying click feedback
 * - Clear loading states
 * - High contrast variants
 * - Large tap targets
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      withMotion = true,
      isLoading = false,
      loadingText,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      iconSize = 16,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    // Content with icons
    const buttonContent = (
      <>
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={iconSize} aria-hidden="true" />
            {loadingText && <span>{loadingText}</span>}
          </>
        ) : (
          <>
            {LeftIcon && <LeftIcon size={iconSize} aria-hidden="true" />}
            {children}
            {RightIcon && <RightIcon size={iconSize} aria-hidden="true" />}
          </>
        )}
      </>
    );

    // Use Radix Slot for asChild pattern
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref as React.Ref<HTMLElement>}
          {...(props as React.HTMLAttributes<HTMLElement>)}
        >
          {children}
        </Slot>
      );
    }

    // Animated button with Framer Motion
    if (withMotion && !isDisabled) {
      return (
        <motion.button
          ref={ref}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15, ease: [0.25, 0.8, 0.25, 1] }}
          className={cn(buttonVariants({ variant, size, className }))}
          disabled={isDisabled}
          aria-busy={isLoading}
          {...(props as HTMLMotionProps<"button">)}
        >
          {buttonContent}
        </motion.button>
      );
    }

    // Standard button
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
