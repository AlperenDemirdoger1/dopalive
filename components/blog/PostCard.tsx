'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost, categoryLabels, categoryColors } from '@/lib/blog-data';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
  index?: number;
}

export default function PostCard({ post, featured = false, index = 0 }: PostCardProps) {
  const categoryStyle = categoryColors[post.category];
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group relative"
      >
        <Link href={`/blog/${post.slug}`}>
          <div className="relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#f5d4a0]/20 transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-64 md:h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f5d4a0]/20 via-transparent to-purple-500/10" />
                <div className="absolute inset-0 bg-[url('/placeholder-blog.jpg')] bg-cover bg-center opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700" />
                
                {/* Featured Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#f5d4a0]/20 text-[#f5d4a0] border border-[#f5d4a0]/30 backdrop-blur-sm">
                    ✦ Featured
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                {/* Category */}
                <span className={cn(
                  "inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium border mb-4",
                  categoryStyle.bg,
                  categoryStyle.text,
                  categoryStyle.border
                )}>
                  {categoryLabels[post.category]}
                </span>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3 group-hover:text-[#f5d4a0] transition-colors duration-300 font-syne">
                  {post.title}
                </h2>

                {/* Subtitle */}
                {post.subtitle && (
                  <p className="text-white/40 text-lg mb-4">{post.subtitle}</p>
                )}

                {/* Excerpt */}
                <p className="text-white/60 text-base leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-white/40 text-sm mb-6">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>

                {/* Author & CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f5d4a0]/30 to-purple-500/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-white/80">
                        {post.author.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm font-medium">{post.author.name}</p>
                      <p className="text-white/40 text-xs">{post.author.role}</p>
                    </div>
                  </div>

                  <span className="flex items-center gap-2 text-[#f5d4a0] text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    Read more <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative overflow-hidden rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#f5d4a0]/20 hover:bg-white/[0.04] transition-all duration-500 h-full flex flex-col">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f5d4a0]/10 via-transparent to-purple-500/5" />
            <div className="absolute inset-0 bg-[url('/placeholder-blog.jpg')] bg-cover bg-center opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />
            
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm",
                categoryStyle.bg,
                categoryStyle.text,
                categoryStyle.border
              )}>
                {categoryLabels[post.category]}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            {/* Title */}
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#f5d4a0] transition-colors duration-300 line-clamp-2 font-syne">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#f5d4a0]/20 to-purple-500/10 flex items-center justify-center">
                  <span className="text-xs font-medium text-white/70">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <span className="text-white/50 text-xs">{post.author.name}</span>
              </div>

              <div className="flex items-center gap-3 text-white/40 text-xs">
                <span>{formatDate(post.publishedAt)}</span>
                <span>·</span>
                <span>{post.readingTime} min</span>
              </div>
            </div>

            {/* Read More */}
            <div className="mt-4 flex items-center gap-1.5 text-[#f5d4a0]/70 text-sm font-medium group-hover:text-[#f5d4a0] group-hover:gap-2.5 transition-all duration-300">
              Read more <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

