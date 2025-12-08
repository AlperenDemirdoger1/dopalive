'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function BlogSearch({ onSearch, placeholder = 'Yazı, etiket, konu ara...' }: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-xl"
    >
      <div
        className={cn(
          "relative flex items-center gap-3 px-5 py-4 rounded-xl",
          "glass transition-all duration-300",
          isFocused 
            ? "border-primary/40 bg-primary/5" 
            : "border-border/60 hover:border-border/80"
        )}
      >
        <Search className={cn(
          "w-5 h-5 transition-colors duration-300",
          isFocused ? "text-primary" : "text-muted-foreground"
        )} />
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-foreground text-base placeholder:text-muted-foreground focus:outline-none"
        />

        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="p-1 rounded-full hover:bg-border/60 transition-colors focus-ring"
            >
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Focus glow effect */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 -z-10 rounded-xl bg-primary/10 blur-xl"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Debounce helper
function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}


