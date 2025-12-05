'use client';

import { motion } from 'framer-motion';
import { BlogCategory, categoryLabels, categoryColors } from '@/lib/blog-data';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selectedCategory: BlogCategory | 'all';
  onSelectCategory: (category: BlogCategory | 'all') => void;
}

const categories: Array<{ value: BlogCategory | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'advice', label: 'Advice' },
  { value: 'case-studies', label: 'Case Studies' },
  { value: 'research', label: 'Research' },
  { value: 'tools', label: 'Tools' },
];

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-wrap gap-2"
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category.value;
        const categoryStyle = category.value !== 'all' 
          ? categoryColors[category.value as BlogCategory] 
          : null;

        return (
          <button
            key={category.value}
            onClick={() => onSelectCategory(category.value)}
            className={cn(
              "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              "border backdrop-blur-sm",
              isSelected 
                ? category.value === 'all'
                  ? "bg-[#f5d4a0]/20 border-[#f5d4a0]/40 text-[#f5d4a0]"
                  : `${categoryStyle?.bg} ${categoryStyle?.border} ${categoryStyle?.text}`
                : "bg-white/[0.03] border-white/[0.08] text-white/50 hover:text-white/70 hover:border-white/[0.15]"
            )}
          >
            {/* Active indicator */}
            {isSelected && (
              <motion.div
                layoutId="categoryIndicator"
                className={cn(
                  "absolute inset-0 rounded-full -z-10",
                  category.value === 'all'
                    ? "bg-[#f5d4a0]/10"
                    : categoryStyle?.bg
                )}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            <span className="relative flex items-center gap-1.5">
              {category.value !== 'all' && (
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  isSelected 
                    ? categoryStyle?.text?.replace('text-', 'bg-') 
                    : "bg-white/30"
                )} />
              )}
              {category.label}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}

