'use client';

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

/**
 * DopaLive Card Variants
 * 
 * ADHD-Friendly Design:
 * - Clear visual boundaries
 * - Warm, inviting appearance
 * - Subtle hover feedback
 * - Reward glow for achievements
 */
const cardVariants = cva(
  "rounded-2xl transition-all duration-300",
  {
    variants: {
      variant: {
        /** Default - Clean, subtle */
        default: [
          "bg-card border border-border",
        ],
        /** Glass - Frosted effect */
        glass: [
          "bg-card/80 backdrop-blur-xl border border-border/50",
        ],
        /** Elevated - More prominent */
        elevated: [
          "bg-card border border-border",
          "shadow-card",
        ],
        /** Warm - Brand accent */
        warm: [
          "bg-primary/5 border border-primary/10",
        ],
        /** Focus - Blue accent for concentration */
        focus: [
          "bg-accent/5 border border-accent/10",
        ],
        /** Success/Reward - Green accent */
        reward: [
          "bg-success/5 border border-success/10",
        ],
        /** Interactive - For clickable cards */
        interactive: [
          "bg-card border border-border",
          "hover:border-primary/30 hover:shadow-warm-md",
          "cursor-pointer",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Enable hover animation */
  withHover?: boolean;
  /** Add reward glow effect */
  withRewardGlow?: boolean;
}

/**
 * Card Component
 *
 * DopaLive's flexible card container with ADHD-friendly design.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      withHover = false,
      withRewardGlow = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      cardVariants({ variant }),
      withRewardGlow && "shadow-reward-glow animate-reward-pop",
      className
    );

    if (withHover) {
      return (
        <motion.div
          ref={ref}
          initial={{ y: 0 }}
          whileHover={{ 
            y: -4,
            transition: { duration: 0.2, ease: [0.25, 0.8, 0.25, 1] }
          }}
          className={cn(baseClasses, "cursor-pointer")}
          {...(props as HTMLMotionProps<"div">)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={baseClasses} {...props}>
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

/**
 * Card Header
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * Card Title
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold font-display tracking-tight text-foreground",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * Card Description
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/**
 * Card Content
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * Card Footer
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
};
