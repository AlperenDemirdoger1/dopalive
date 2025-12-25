'use client';

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

/**
 * Toast Viewport
 * Container for toast notifications
 */
const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-0 right-0 z-[100]",
      "flex max-h-screen w-full flex-col-reverse gap-2 p-4",
      "sm:bottom-0 sm:right-0 sm:flex-col sm:max-w-md",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

/**
 * Toast variant styles
 */
const toastVariants = cva(
  [
    "group pointer-events-auto relative flex w-full items-center justify-between gap-4",
    "overflow-hidden rounded-xl border p-4",
    "shadow-lg transition-all",
    // Animation
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full",
    "data-[state=open]:slide-in-from-bottom-full sm:data-[state=open]:slide-in-from-bottom-full",
    "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
    "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[#111] border-white/[0.1]",
          "text-white",
        ],
        success: [
          "bg-emerald-500/10 border-emerald-500/20",
          "text-emerald-400",
        ],
        error: [
          "bg-red-500/10 border-red-500/20",
          "text-red-400",
        ],
        warning: [
          "bg-amber-500/10 border-amber-500/20",
          "text-amber-400",
        ],
        info: [
          "bg-blue-500/10 border-blue-500/20",
          "text-blue-400",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Toast Component
 */
const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => (
  <ToastPrimitives.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  />
));
Toast.displayName = ToastPrimitives.Root.displayName;

/**
 * Toast Action
 * Button for toast actions
 */
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center",
      "rounded-lg border border-white/[0.1] bg-white/[0.05]",
      "px-3 text-sm font-medium",
      "transition-colors",
      "hover:bg-white/[0.1]",
      "focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

/**
 * Toast Close Button
 */
const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2",
      "rounded-md p-1",
      "text-white/40 hover:text-white",
      "transition-colors",
      "focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]",
      "opacity-0 group-hover:opacity-100",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

/**
 * Toast Title
 */
const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

/**
 * Toast Description
 */
const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-80", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;

/**
 * Toast Icon Helper
 * Returns appropriate icon based on variant
 */
const ToastIcon = ({
  variant,
  className,
}: {
  variant?: "default" | "success" | "error" | "warning" | "info";
  className?: string;
}) => {
  const iconClass = cn("h-5 w-5", className);

  switch (variant) {
    case "success":
      return <CheckCircle className={iconClass} />;
    case "error":
      return <AlertCircle className={iconClass} />;
    case "warning":
      return <AlertTriangle className={iconClass} />;
    case "info":
      return <Info className={iconClass} />;
    default:
      return null;
  }
};

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastIcon,
  toastVariants,
};






