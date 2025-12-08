'use client';

import * as React from "react";

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 5000;

type ToastVariant = "default" | "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  action?: React.ReactNode;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
}

type ToastAction =
  | { type: "ADD_TOAST"; toast: Toast }
  | { type: "UPDATE_TOAST"; toast: Partial<Toast> & { id: string } }
  | { type: "DISMISS_TOAST"; toastId: string }
  | { type: "REMOVE_TOAST"; toastId: string };

let count = 0;

function generateId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function addToRemoveQueue(toastId: string, duration: number = TOAST_REMOVE_DELAY) {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatchToast({
      type: "REMOVE_TOAST",
      toastId,
    });
  }, duration);

  toastTimeouts.set(toastId, timeout);
}

function reducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((t) => {
          addToRemoveQueue(t.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? { ...t }
            : t
        ),
      };
    }

    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };

    default:
      return state;
  }
}

const listeners: Array<(state: ToastState) => void> = [];
let memoryState: ToastState = { toasts: [] };

function dispatchToast(action: ToastAction) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  action?: React.ReactNode;
  duration?: number;
}

/**
 * Create a toast notification
 */
function toast(options: ToastOptions) {
  const id = generateId();
  const duration = options.duration || TOAST_REMOVE_DELAY;

  dispatchToast({
    type: "ADD_TOAST",
    toast: {
      id,
      ...options,
    },
  });

  addToRemoveQueue(id, duration);

  return {
    id,
    dismiss: () => dispatchToast({ type: "DISMISS_TOAST", toastId: id }),
    update: (props: Partial<ToastOptions>) =>
      dispatchToast({ type: "UPDATE_TOAST", toast: { ...props, id } }),
  };
}

/**
 * Convenience methods for different toast types
 */
toast.success = (options: Omit<ToastOptions, "variant">) =>
  toast({ ...options, variant: "success" });

toast.error = (options: Omit<ToastOptions, "variant">) =>
  toast({ ...options, variant: "error" });

toast.warning = (options: Omit<ToastOptions, "variant">) =>
  toast({ ...options, variant: "warning" });

toast.info = (options: Omit<ToastOptions, "variant">) =>
  toast({ ...options, variant: "info" });

/**
 * Hook to access toast state
 */
function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) =>
      dispatchToast({ type: "DISMISS_TOAST", toastId: toastId || "" }),
  };
}

export { useToast, toast };
export type { Toast, ToastOptions, ToastVariant };



