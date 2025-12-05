'use client';

import * as React from "react";
import { 
  ToastProvider, 
  ToastViewport, 
  Toast, 
  ToastTitle, 
  ToastDescription, 
  ToastClose,
  ToastIcon 
} from "@/components/ui/toast";
import { useToast } from "@/lib/use-toast";

/**
 * Toaster Component
 * Renders toast notifications from the toast store
 */
function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map((toast) => (
        <Toast key={toast.id} variant={toast.variant}>
          <div className="flex items-start gap-3">
            {toast.variant && toast.variant !== "default" && (
              <ToastIcon variant={toast.variant} className="mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
              {toast.description && (
                <ToastDescription>{toast.description}</ToastDescription>
              )}
            </div>
          </div>
          {toast.action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

/**
 * Root Providers Component
 *
 * Wraps the application with necessary context providers:
 * - Toast notifications
 * - Add more providers here as needed (Theme, Analytics, etc.)
 *
 * @example
 * ```tsx
 * // In layout.tsx
 * <Providers>{children}</Providers>
 * ```
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}

export { Toaster };

