'use client';

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accordion Root
 * Container for accordion items
 */
const Accordion = AccordionPrimitive.Root;

/**
 * Accordion Item
 * Individual expandable section
 */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "rounded-xl border transition-all duration-300",
      "bg-white/[0.015] border-white/[0.05]",
      "hover:border-white/[0.1]",
      "data-[state=open]:bg-white/[0.03] data-[state=open]:border-[#f5d4a0]/20",
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

/**
 * Accordion Trigger
 * Button to expand/collapse item
 */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    icon?: React.ReactNode;
  }
>(({ className, children, icon, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between p-5",
        "text-left font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B6B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
        "[&[data-state=open]>svg]:rotate-180",
        "[&[data-state=open]]:text-[#f5d4a0]",
        "text-white/80 hover:text-white",
        className
      )}
      {...props}
    >
      <span className="flex items-center gap-4">
        {icon && (
          <span className={cn(
            "p-2.5 rounded-lg transition-colors",
            "bg-white/[0.03]",
            "group-data-[state=open]:bg-[#f5d4a0]/10"
          )}>
            {icon}
          </span>
        )}
        {children}
      </span>
      <ChevronDown
        className={cn(
          "h-5 w-5 shrink-0 transition-transform duration-300 ease-out-expo",
          "text-white/30 group-data-[state=open]:text-[#f5d4a0]"
        )}
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

/**
 * Accordion Content
 * The expandable content area
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden transition-all",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    )}
    {...props}
  >
    <div className={cn("px-5 pb-5 pt-0 text-foreground text-sm leading-relaxed", className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

/**
 * FAQ Accordion - Pre-styled for FAQ sections
 */
interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
  icon?: React.ReactNode;
}

interface FAQAccordionProps {
  items: FAQItem[];
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  className?: string;
}

const FAQAccordion = ({
  items,
  type = "single",
  defaultValue,
  className,
}: FAQAccordionProps) => {
  return (
    <Accordion
      type={type as any}
      defaultValue={defaultValue as any}
      collapsible={type === "single"}
      className={cn("space-y-3", className)}
    >
      {items.map((item, index) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger icon={item.icon}>
            <span className="text-base">{item.question}</span>
          </AccordionTrigger>
          <AccordionContent>
            {typeof item.answer === "string" ? (
              <p>{item.answer}</p>
            ) : (
              item.answer
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  FAQAccordion,
};


