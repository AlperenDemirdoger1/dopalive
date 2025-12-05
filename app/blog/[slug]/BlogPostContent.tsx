'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { BlogPost, categoryLabels, categoryColors } from '@/lib/blog-data';
import { ShareButtons, RelatedPosts, NewsletterSignup } from '@/components/blog';
import { cn } from '@/lib/utils';

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
    const elements: JSX.Element[] = [];
    let inList = false;
    let listItems: string[] = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Empty line
      if (!trimmedLine) {
        if (inList && listItems.length > 0) {
          elements.push(
            <ul key={`list-${index}`} className="list-disc list-inside space-y-2 text-white/70 mb-6 ml-4">
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
          <h1 key={index} className="text-3xl md:text-4xl font-bold text-white mb-6 font-syne">
            {trimmedLine.slice(2)}
          </h1>
        );
        return;
      }

      if (trimmedLine.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl font-semibold text-white mt-10 mb-4 font-syne">
            {trimmedLine.slice(3)}
          </h2>
        );
        return;
      }

      if (trimmedLine.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl font-semibold text-white/90 mt-8 mb-3 font-syne">
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
          <ul key={`list-${index}`} className="list-disc list-inside space-y-2 text-white/70 mb-6 ml-4">
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
          className="text-white/70 leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: formatInlineStyles(trimmedLine) }}
        />
      );
    });

    // Handle remaining list items
    if (listItems.length > 0) {
      elements.push(
        <ul key="list-final" className="list-disc list-inside space-y-2 text-white/70 mb-6 ml-4">
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
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0a0a0a]">
      {/* Ambient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f] via-[#0a0a0a] to-[#050505]" />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute w-[600px] h-[300px] bg-[#f5d4a0] opacity-[0.03] top-[-100px] left-1/2 -translate-x-1/2 rounded-full blur-[120px]"
        />
        
        <div className="absolute w-[400px] h-[400px] bg-[#4a3f2f] opacity-[0.02] top-[20%] left-[-150px] rounded-full blur-[100px]" />
        
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-5 md:px-8 py-5 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.04]"
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link href="/hero" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center"
            >
              <div className="w-3 h-3 rounded-full border border-[#f5d4a0]/60" />
            </motion.div>
            <span className="text-white/80 text-base font-light tracking-tight">LaunchPod</span>
          </Link>

          <Link 
            href="/blog"
            className="flex items-center gap-2 text-white/50 text-sm hover:text-white/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All articles
          </Link>
        </div>
      </motion.nav>

      {/* Article */}
      <article className="pt-32 pb-16 px-5 md:px-8">
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
              <span className="text-white/30 text-sm">·</span>
              <span className="text-white/40 text-sm flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readingTime} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-syne tracking-tight leading-tight">
              {post.title}
            </h1>

            {/* Subtitle */}
            {post.subtitle && (
              <p className="text-xl md:text-2xl text-white/40 mb-8">
                {post.subtitle}
              </p>
            )}

            {/* Author & Date */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 pb-8 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f5d4a0]/30 to-purple-500/20 flex items-center justify-center">
                  <span className="text-lg font-medium text-white/80">
                    {post.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">{post.author.name}</p>
                  <p className="text-white/40 text-sm">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-white/40 text-sm">
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
            <div className="absolute inset-0 bg-gradient-to-br from-[#f5d4a0]/20 via-purple-500/10 to-[#f5d4a0]/5" />
            <div className="absolute inset-0 bg-[url('/placeholder-blog.jpg')] bg-cover bg-center opacity-30" />
            
            {/* Featured badge if applicable */}
            {post.featured && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#f5d4a0]/20 text-[#f5d4a0] border border-[#f5d4a0]/30 backdrop-blur-sm">
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
            className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-white/[0.06]"
          >
            <Tag className="w-4 h-4 text-white/30" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs text-white/50 bg-white/[0.03] border border-white/[0.06]"
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
            className="xl:hidden mt-10 pt-8 border-t border-white/[0.06]"
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
      <footer className="border-t border-white/[0.06] py-12 px-5 md:px-8">
        <div className="max-w-[900px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              © 2024 LaunchPod. Built for ADHD creators.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/hero" className="text-white/30 text-sm hover:text-white/50 transition-colors">
                Home
              </Link>
              <Link href="/blog" className="text-white/30 text-sm hover:text-white/50 transition-colors">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

