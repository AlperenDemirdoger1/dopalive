'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost, categoryLabels, categoryColors } from '@/lib/blog-data';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerItem } from '@/lib/motion';

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
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="group relative"
      >
        <Link href={`/blog/${post.slug}`} className="block h-full">
          <div className="relative overflow-hidden rounded-2xl glass hover:border-primary/30 transition-all duration-400 h-full">
            <div className="grid md:grid-cols-2 gap-0 h-full">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-gradient-warm" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/30 backdrop-blur-sm">
                    ✦ Öne Çıkan
                  </span>
                </div>
              </div>

              <div className="p-8 md:p-10 flex flex-col justify-center space-y-4">
                <span className={cn(
                  "inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold border",
                  categoryStyle.bg,
                  categoryStyle.text,
                  categoryStyle.border
                )}>
                  {categoryLabels[post.category]}
                </span>

                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                  {post.title}
                </h2>

                {post.subtitle && (
                  <p className="text-muted-foreground text-body-lg">{post.subtitle}</p>
                )}

                <p className="text-muted-foreground/90 text-body-md leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 text-muted-foreground text-body-sm">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{post.readingTime} dk</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center font-semibold">
                      {post.author.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-foreground text-sm font-semibold">{post.author.name}</p>
                      <p className="text-muted-foreground text-xs">{post.author.role}</p>
                    </div>
                  </div>

                  <span className="flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                    Oku <ArrowRight className="w-4 h-4" />
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
      variants={staggerItem}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.05 }}
      className="group h-full"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative overflow-hidden rounded-xl glass hover:border-primary/30 hover:bg-white/5 transition-all duration-300 h-full flex flex-col">
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-accent/10 to-transparent" />
            <div className="absolute inset-0 bg-[url('/placeholder-blog.jpg')] bg-cover bg-center opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-500" />
            <div className="absolute top-3 left-3">
              <span className={cn(
                "px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm",
                categoryStyle.bg,
                categoryStyle.text,
                categoryStyle.border
              )}>
                {categoryLabels[post.category]}
              </span>
            </div>
          </div>

          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-border/60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-semibold">
                  {post.author.name.charAt(0)}
                </div>
                <span className="text-muted-foreground text-xs">{post.author.name}</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <span>{formatDate(post.publishedAt)}</span>
                <span>·</span>
                <span>{post.readingTime} dk</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-2.5 transition-all duration-200">
              Oku <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}


