'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    // Ellipsis after first if needed
    if (currentPage > 3) {
      pages.push('ellipsis');
    }

    // Pages around current
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }

    // Ellipsis before last if needed
    if (currentPage < totalPages - 2) {
      pages.push('ellipsis');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <motion.nav
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
          "border",
          currentPage === 1
            ? "border-border/50 text-muted-foreground/40 cursor-not-allowed"
            : "border-border/70 text-muted-foreground hover:border-primary/40 hover:text-foreground"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-muted-foreground"
              >
                ···
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "relative w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300",
                "flex items-center justify-center",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activePage"
                  className="absolute inset-0 rounded-lg bg-primary/12 border border-primary/25"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{page}</span>
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
          "border",
          currentPage === totalPages
            ? "border-border/50 text-muted-foreground/40 cursor-not-allowed"
            : "border-border/70 text-muted-foreground hover:border-primary/40 hover:text-foreground"
        )}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </motion.nav>
  );
}

// Alternative: Load More Button
interface LoadMoreProps {
  onLoadMore: () => void;
  hasMore: boolean;
  loading?: boolean;
}

export function LoadMoreButton({ onLoadMore, hasMore, loading = false }: LoadMoreProps) {
  if (!hasMore) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center mt-12"
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onLoadMore}
        disabled={loading}
        className={cn(
          "px-8 py-3 rounded-xl font-medium transition-all duration-300",
          "bg-white/[0.03] border border-white/[0.08] text-white/70",
          "hover:bg-white/[0.06] hover:border-white/[0.15] hover:text-white",
          loading && "opacity-50 cursor-not-allowed"
        )}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-white/30 border-t-white/70 rounded-full"
            />
            Loading...
          </span>
        ) : (
          'Load more articles'
        )}
      </motion.button>
    </motion.div>
  );
}


