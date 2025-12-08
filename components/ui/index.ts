/**
 * UI Component Library
 *
 * This file exports all UI primitives for easy importing.
 * Import components like: import { Button, Card, Dialog } from '@/components/ui';
 */

// Button
export { Button, buttonVariants } from './button';
export type { ButtonProps } from './button';

// Card
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
} from './card';
export type { CardProps } from './card';

// Accordion
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  FAQAccordion,
} from './accordion';

// Tabs
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  AnimatedTabs,
  PillTabs,
} from './tabs';

// Dialog
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  AnimatedDialog,
} from './dialog';

// Toast
export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastIcon,
  toastVariants,
} from './toast';
export type { ToastProps, ToastActionElement } from './toast';

// Spinner & Loading
export {
  Spinner,
  spinnerVariants,
  PulseDots,
  Skeleton,
} from './spinner';
export type { SpinnerProps, PulseDotsProps, SkeletonProps } from './spinner';

