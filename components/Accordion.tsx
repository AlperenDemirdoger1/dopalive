'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
}

const Accordion = ({ items, allowMultiple = false, defaultOpen = [] }: AccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id);
        
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              'rounded-xl border transition-all duration-300',
              isOpen
                ? 'bg-white/[0.03] border-[#f5d4a0]/20'
                : 'bg-white/[0.015] border-white/[0.05] hover:border-white/10'
            )}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full p-5 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-4">
                {item.icon && (
                  <div className={cn(
                    'p-2.5 rounded-lg transition-colors',
                    isOpen ? 'bg-[#f5d4a0]/10' : 'bg-white/[0.03]'
                  )}>
                    {item.icon}
                  </div>
                )}
                <span className={cn(
                  'text-base font-medium transition-colors',
                  isOpen ? 'text-[#f5d4a0]' : 'text-white/80'
                )}>
                  {item.title}
                </span>
              </div>
              
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ChevronDown className={cn(
                  'w-5 h-5 transition-colors',
                  isOpen ? 'text-[#f5d4a0]' : 'text-white/30'
                )} />
              </motion.div>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-0">
                    <div className="pl-0 md:pl-14 text-white/50 text-sm leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Accordion;

