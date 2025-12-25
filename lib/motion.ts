/**
 * DopaLive Motion Utilities
 * 
 * ADHD-Friendly Animation System:
 * - Subtle, purposeful animations
 * - Dopamine-rewarding feedback
 * - Respects reduced motion preferences
 * - Consistent timing for predictability
 */

import { Variants, Transition } from "framer-motion";

/**
 * Easing curves - Smooth and calming
 */
export const easings = {
  /** Gentle deceleration - main easing for most animations */
  gentle: [0.25, 0.8, 0.25, 1],
  /** Smooth deceleration - for enter animations */
  easeOut: [0.22, 1, 0.36, 1],
  /** Smooth acceleration - for exit animations */
  easeIn: [0.4, 0, 1, 1],
  /** Subtle bounce - for reward feedback */
  bounce: [0.34, 1.56, 0.64, 1],
  /** Spring - for playful interactions */
  spring: [0.175, 0.885, 0.32, 1.275],
};

/**
 * Standard durations - Consistent for predictability
 */
export const durations = {
  quick: 0.15,
  normal: 0.3,
  slow: 0.5,
  gentle: 0.6,
};

// ============================================
// ENTER ANIMATIONS
// ============================================

/**
 * Fade in from below - Main content reveal
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.slow,
    },
  },
};

/**
 * Fade in from above
 */
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.slow,
    },
  },
};

/**
 * Simple fade - No movement
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.normal,
    },
  },
};

/**
 * Scale in - Subtle pop effect
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.normal,
    },
  },
};

// ============================================
// STAGGER ANIMATIONS
// ============================================

/**
 * Stagger container for lists
 */
export const staggerContainer = (
  staggerChildren: number = 0.08,
  delayChildren: number = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/**
 * Stagger item - Use inside stagger containers
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
    },
  },
};

// ============================================
// INTERACTIVE ANIMATIONS
// ============================================

/**
 * Hover scale - Subtle feedback
 */
export const hoverScale: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: durations.quick,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: durations.quick,
    },
  },
};

/**
 * Hover lift - Card interactions
 */
export const hoverLift: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  hover: {
    y: -4,
    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
    transition: {
      duration: durations.normal,
    },
  },
};

/**
 * Button press - Satisfying click feedback
 */
export const buttonPress = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: durations.quick },
};

// ============================================
// DOPAMINE REWARD ANIMATIONS
// ============================================

/**
 * Reward pop - For achievements and completions
 */
export const rewardPop: Variants = {
  initial: { scale: 1 },
  reward: {
    scale: [1, 1.15, 1],
    transition: {
      duration: 0.4,
    },
  },
};

/**
 * Success check animation
 */
export const successCheck: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 0.4,
      },
      opacity: {
        duration: 0.2,
      },
    },
  },
};

/**
 * Confetti burst - For major achievements
 */
export const confettiBurst = (index: number): Variants => ({
  hidden: {
    opacity: 0,
    scale: 0,
    x: 0,
    y: 0,
  },
  visible: {
    opacity: [0, 1, 0],
    scale: [0, 1, 0.5],
    x: Math.cos((index * 360) / 8 * Math.PI / 180) * 50,
    y: Math.sin((index * 360) / 8 * Math.PI / 180) * 50,
    transition: {
      duration: 0.6,
    },
  },
});

// ============================================
// PANEL & MODAL ANIMATIONS
// ============================================

/**
 * Slide in from right - Mobile menus, drawers
 */
export const slideInRight: Variants = {
  hidden: {
    x: "100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: durations.normal,
    },
  },
};

/**
 * Modal overlay
 */
export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.normal },
  },
  exit: {
    opacity: 0,
    transition: { duration: durations.quick },
  },
};

/**
 * Modal content
 */
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: {
      duration: durations.quick,
    },
  },
};

// ============================================
// ACCORDION ANIMATIONS
// ============================================

/**
 * Accordion content expand
 */
export const accordionContent: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: durations.normal, ease: "easeOut" },
      opacity: { duration: durations.quick },
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: durations.normal, ease: "easeOut" },
      opacity: { duration: durations.normal, delay: 0.1 },
    },
  },
};

/**
 * Chevron rotation
 */
export const rotate180: Variants = {
  collapsed: { rotate: 0 },
  expanded: {
    rotate: 180,
    transition: { duration: durations.normal, ease: "easeOut" },
  },
};

// ============================================
// LIVE INDICATOR ANIMATIONS
// ============================================

/**
 * Breathing dot - For live status
 */
export const breathingDot: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Pulse ring - For active sessions
 */
export const pulseRing: Variants = {
  animate: {
    scale: [1, 1.5],
    opacity: [0.5, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
    },
  },
};

// ============================================
// LOADING ANIMATIONS
// ============================================

/**
 * Spinner rotation
 */
export const spin: Variants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "linear",
    },
  },
};

/**
 * Dots loading
 */
export const loadingDot = (index: number): Variants => ({
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      delay: index * 0.1,
    },
  },
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Standard spring transition
 */
export const springTransition: Transition = {
  type: "spring",
  damping: 25,
  stiffness: 300,
};

/**
 * Quick transition for micro-interactions
 */
export const quickTransition: Transition = {
  duration: durations.quick,
  ease: "easeOut",
};

/**
 * Generate viewport animation props
 */
export const viewportAnimation = (
  variants: Variants,
  options?: {
    once?: boolean;
    margin?: string;
    amount?: "some" | "all" | number;
  }
) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: {
    once: options?.once ?? true,
    margin: options?.margin ?? "-50px",
    amount: options?.amount,
  },
  variants,
});

/**
 * Generate staggered animation props
 */
export const staggeredAnimation = (
  staggerDelay: number = 0.08,
  initialDelay: number = 0
) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true },
  variants: staggerContainer(staggerDelay, initialDelay),
});
