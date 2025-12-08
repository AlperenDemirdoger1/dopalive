'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { BlogPost, categoryLabels, categoryColors } from '@/lib/blog-data';
import { ShareButtons, RelatedPosts, NewsletterSignup } from '@/components/blog';
import { cn } from '@/lib/utils';
import { ReactElement } from 'react';

interface BlogPostContentProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const categoryStyle = categoryColors[post.category];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Simple markdown-to-html converter for demo
  const renderContent = (content: string) => {
    // This is a simple implementation - in production, use a proper MDX parser
    const lines = content.split('\n');
    const elements: ReactElement[] = [];
    let inList = false;
    let listItems: string[] = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Empty line
      if (!trimmedLine) {
        if (inList && listItems.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
              {listItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
          listItems = [];
          inList = false;
        }
        return;
      }

      // Headers
      if (trimmedLine.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-syne">
            {trimmedLine.slice(2)}
          </h1>
        );
        return;
      }

      if (trimmedLine.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl font-semibold text-foreground mt-10 mb-4 font-syne">
            {trimmedLine.slice(3)}
          </h2>
        );
        return;
      }

      if (trimmedLine.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl font-semibold text-foreground/90 mt-8 mb-3 font-syne">
            {trimmedLine.slice(4)}
          </h3>
        );
        return;
      }

      // List items
      if (trimmedLine.startsWith('- ')) {
        inList = true;
        listItems.push(formatInlineStyles(trimmedLine.slice(2)));
        return;
      }

      // Regular paragraph
      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`list-${index}`} className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
            {listItems.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }

      elements.push(
        <p 
          key={index} 
          className="text-muted-foreground leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: formatInlineStyles(trimmedLine) }}
        />
      );
    });

    // Handle remaining list items
    if (listItems.length > 0) {
      elements.push(
        <ul key="list-final" className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
          {listItems.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
    }

    return elements;
  };

  // Format inline styles (bold, italic)
  const formatInlineStyles = (text: string) => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-medium">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
      </div>

      {/* Navigation provided by global SiteHeader from layout */}

      {/* Article */}
      <article className="pt-8 pb-16 px-5 md:px-8">
        <div className="max-w-[900px] mx-auto">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            {/* Category & Reading Time */}
            <div className="flex items-center gap-3 mb-6">
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border",
                categoryStyle.bg,
                categoryStyle.text,
                categoryStyle.border
              )}>
                {categoryLabels[post.category]}
              </span>
              <span className="text-muted-foreground text-sm">·</span>
              <span className="text-muted-foreground text-sm flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readingTime} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-syne tracking-tight leading-tight">
              {post.title}
            </h1>

            {/* Subtitle */}
            {post.subtitle && (
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                {post.subtitle}
              </p>
            )}

            {/* Author & Date */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 pb-8 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-lg font-medium text-foreground/80">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-foreground font-medium">{post.author.name}</p>
                  <p className="text-muted-foreground text-sm">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            </div>
          </motion.header>

          {/* Share Buttons (Sticky on larger screens) */}
          <div className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2">
            <ShareButtons 
              title={post.title} 
              url={`https://launchpod.app/blog/${post.slug}`}
              variant="vertical" 
            />
          </div>

          {/* Cover Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative aspect-[2/1] rounded-2xl overflow-hidden mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5" />
            <div className="absolute inset-0 bg-[url('/placeholder-blog.jpg')] bg-cover bg-center opacity-30" />
            
            {/* Featured badge if applicable */}
            {post.featured && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
                  ✦ Featured Article
                </span>
              </div>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {renderContent(post.content)}
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-border"
          >
            <Tag className="w-4 h-4 text-muted-foreground" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs text-muted-foreground bg-card border border-border"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Share Section (Mobile/Tablet) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="xl:hidden mt-10 pt-8 border-t border-border"
          >
            <ShareButtons 
              title={post.title} 
              url={`https://launchpod.app/blog/${post.slug}`}
            />
          </motion.div>

          {/* Newsletter CTA */}
          <div className="mt-16">
            <NewsletterSignup variant="inline" />
          </div>

          {/* Related Posts */}
          <RelatedPosts posts={relatedPosts} />
        </div>
      </article>

      {/* Footer */}
      {/* Footer provided by global SiteFooter from layout */}
    </main>
  );
}

interface BlogPostContentProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

