'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogPost, categoryLabels, categoryColors } from '@/lib/blog-data';
import { cn } from '@/lib/utils';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-20 pt-16 border-t border-white/[0.06]"
    >
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-semibold text-white font-syne">
          Related Articles
        </h2>
        <Link 
          href="/blog"
          className="text-[#f5d4a0] text-sm font-medium flex items-center gap-1.5 hover:gap-2.5 transition-all duration-300"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post, index) => {
          const categoryStyle = categoryColors[post.category];

          return (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group h-full"
              >
                <div className="relative overflow-hidden rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#f5d4a0]/20 transition-all duration-500 h-full flex flex-col">
                  {/* Image placeholder */}
                  <div className="relative h-36 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f5d4a0]/10 via-transparent to-purple-500/5" />
                    <div className="absolute inset-0 bg-[url('/placeholder-blog.jpg')] bg-cover bg-center opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm",
                        categoryStyle.bg,
                        categoryStyle.text,
                        categoryStyle.border
                      )}>
                        {categoryLabels[post.category]}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-base font-medium text-white mb-2 group-hover:text-[#f5d4a0] transition-colors duration-300 line-clamp-2 font-syne">
                      {post.title}
                    </h3>

                    <p className="text-white/40 text-sm leading-relaxed line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 mt-4 text-white/30 text-xs">
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            </Link>
          );
        })}
      </div>
    </motion.section>
  );
}

