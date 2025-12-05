'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, Clock } from 'lucide-react';
import { BlogPost, categoryColors } from '@/lib/blog-data';
import { cn } from '@/lib/utils';

interface PopularPostsProps {
  posts: BlogPost[];
}

export default function PopularPosts({ posts }: PopularPostsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6"
    >
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp className="w-4 h-4 text-[#f5d4a0]" />
        <h4 className="text-base font-semibold text-white font-syne">Popular Articles</h4>
      </div>

      <div className="space-y-4">
        {posts.map((post, index) => {
          const categoryStyle = categoryColors[post.category];
          
          return (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <motion.article
                whileHover={{ x: 4 }}
                className="group flex gap-4 py-3 border-b border-white/[0.04] last:border-0 last:pb-0"
              >
                {/* Number */}
                <span className="text-2xl font-bold text-white/10 font-syne w-6 shrink-0">
                  {index + 1}
                </span>

                <div className="flex-1 min-w-0">
                  {/* Category */}
                  <span className={cn(
                    "inline-block text-xs font-medium mb-1.5",
                    categoryStyle.text
                  )}>
                    {post.category.replace('-', ' ')}
                  </span>

                  {/* Title */}
                  <h5 className="text-sm font-medium text-white/80 group-hover:text-[#f5d4a0] transition-colors duration-300 line-clamp-2 leading-snug">
                    {post.title}
                  </h5>

                  {/* Meta */}
                  <div className="flex items-center gap-2 mt-1.5 text-white/30 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
              </motion.article>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

