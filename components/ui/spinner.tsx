'use client';

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      size: {
        xs: "w-3 h-3",
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12",
      },
      color: {
        default: "text-white/60",
        coral: "text-[#FF6B6B]",
        white: "text-white",
        muted: "text-white/30",
      },
    },
    defaultVariants: {
      size: "md",
      color: "default",
    },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /** Screen reader label */
  label?: string;
}

/**
 * Spinner Component
 *
 * A loading spinner with multiple sizes and colors.
 *
 * @example
 * ```tsx
 * <Spinner size="lg" color="coral" />
 * <Spinner size="sm" label="Loading content..." />
 * ```
 */
const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, color, label = "Loading...", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        className={cn("inline-flex", className)}
        {...props}
      >
        <svg
          className={cn(spinnerVariants({ size, color }))}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className="sr-only">{label}</span>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";

/**
 * Pulse Dots Loader
 * Alternative loading indicator with animated dots
 */
export interface PulseDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  dotCount?: number;
  dotSize?: "sm" | "md" | "lg";
  color?: "default" | "coral" | "white";
}

const dotSizeClasses = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2",
  lg: "w-3 h-3",
};

const dotColorClasses = {
  default: "bg-white/60",
  coral: "bg-[#FF6B6B]",
  white: "bg-white",
};

const PulseDots = React.forwardRef<HTMLDivElement, PulseDotsProps>(
  (
    {
      className,
      dotCount = 3,
      dotSize = "md",
      color = "default",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn("inline-flex items-center gap-1", className)}
        {...props}
      >
        {Array.from({ length: dotCount }).map((_, i) => (
          <motion.span
            key={i}
            className={cn(
              "rounded-full",
              dotSizeClasses[dotSize],
              dotColorClasses[color]
            )}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

PulseDots.displayName = "PulseDots";

/**
 * Skeleton Loader
 * Placeholder animation for loading content
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of the skeleton (can be any CSS value) */
  width?: string | number;
  /** Height of the skeleton (can be any CSS value) */
  height?: string | number;
  /** Make skeleton circular */
  circle?: boolean;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, width, height, circle = false, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white/[0.06] animate-pulse",
          circle ? "rounded-full" : "rounded-lg",
          className
        )}
        style={{
          width: width,
          height: height,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export { Spinner, spinnerVariants, PulseDots, Skeleton };

