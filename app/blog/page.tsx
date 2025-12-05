'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { 
  PostCard, 
  BlogSearch, 
  CategoryFilter, 
  NewsletterSignup, 
  Pagination,
  PopularPosts 
} from '@/components/blog';
import { 
  blogPosts, 
  getFeaturedPost, 
  getPopularPosts, 
  BlogCategory,
  searchPosts 
} from '@/lib/blog-data';
import { cn } from '@/lib/utils';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const featuredPost = getFeaturedPost();
  const popularPosts = getPopularPosts(5);

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    let posts = blogPosts;

    // Filter by search
    if (searchQuery) {
      posts = searchPosts(searchQuery);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      posts = posts.filter(post => post.category === selectedCategory);
    }

    // Exclude featured from grid when no filters
    if (!searchQuery && selectedCategory === 'all' && featuredPost) {
      posts = posts.filter(post => !post.featured);
    }

    return posts;
  }, [searchQuery, selectedCategory, featuredPost]);

  // Paginate
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // Reset page when filters change
  const handleCategoryChange = (category: BlogCategory | 'all') => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const showFeatured = !searchQuery && selectedCategory === 'all' && featuredPost;

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
        <div className="absolute w-[400px] h-[400px] bg-[#3f4a4a] opacity-[0.02] top-[30%] right-[-150px] rounded-full blur-[100px]" />
        
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
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
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
            href="/hero"
            className="flex items-center gap-2 text-white/50 text-sm hover:text-white/70 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-5 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5d4a0]/10 border border-[#f5d4a0]/20 text-[#f5d4a0] text-xs font-medium mb-6">
              <Sparkles className="w-3 h-3" />
              ADHD Productivity Resources
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-syne tracking-tight">
              LaunchPod Stories{' '}
              <span className="text-[#f5d4a0]">&</span>{' '}
              Resources
            </h1>
            
            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Insights, strategies, and case studies for ADHD creators who want to finish what they start.
            </p>
          </motion.div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-12">
            <BlogSearch onSearch={handleSearch} />
            <CategoryFilter 
              selectedCategory={selectedCategory} 
              onSelectCategory={handleCategoryChange} 
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 px-5 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
            {/* Posts Column */}
            <div>
              {/* Featured Post */}
              {showFeatured && (
                <div className="mb-12">
                  <PostCard post={featuredPost} featured />
                </div>
              )}

              {/* Results count */}
              {(searchQuery || selectedCategory !== 'all') && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white/40 text-sm mb-6"
                >
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedCategory !== 'all' && ` in ${selectedCategory.replace('-', ' ')}`}
                </motion.p>
              )}

              {/* Post Grid */}
              {paginatedPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                  {paginatedPosts.map((post, index) => (
                    <PostCard key={post.slug} post={post} index={index} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <p className="text-white/40 text-lg mb-4">No articles found</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="text-[#f5d4a0] text-sm font-medium hover:underline"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block space-y-8">
              <NewsletterSignup variant="sidebar" />
              <PopularPosts posts={popularPosts} />
            </aside>
          </div>

          {/* Mobile Newsletter CTA */}
          <div className="lg:hidden mt-16">
            <NewsletterSignup variant="inline" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-12 px-5 md:px-8">
        <div className="max-w-[1400px] mx-auto">
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

