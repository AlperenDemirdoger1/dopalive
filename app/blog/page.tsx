'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
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
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/motion';

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
    <main className="min-h-screen bg-background text-foreground">
      <section className="section-padding px-5 md:px-8">
        <div className="container-default">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-body-sm font-semibold mb-4 focus-ring">
              <Sparkles className="w-4 h-4" />
              DEHB Odaklı İçerik Havuzu
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              DopaLive <span className="text-gradient">DEHB & Body Doubling</span>
            </h1>
            
            <p className="text-muted-foreground text-body-md max-w-2xl mx-auto leading-relaxed">
              En kapsamlı, en güncel DEHB içerik havuzu: bilim, deneyim, içgörü ve odak araçları bir arada. Body doubling’ı günlük ritüele çevir.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-12"
          >
            <motion.div variants={staggerItem}>
              <BlogSearch onSearch={handleSearch} />
            </motion.div>
            <motion.div variants={staggerItem}>
              <CategoryFilter 
                selectedCategory={selectedCategory} 
                onSelectCategory={handleCategoryChange} 
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 px-5 md:px-8">
        <div className="container-default">
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
            <div className="space-y-8">
              {showFeatured && (
                <motion.div variants={fadeInUp} initial="hidden" animate="visible">
                  <PostCard post={featuredPost} featured />
                </motion.div>
              )}

              {(searchQuery || selectedCategory !== 'all') && (
                <motion.p
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="text-muted-foreground text-body-sm"
                >
                  {filteredPosts.length} içerik bulundu
                  {searchQuery && ` • arama: "${searchQuery}"`}
                  {selectedCategory !== 'all' && ` • kategori: ${selectedCategory.replace('-', ' ')}`}
                </motion.p>
              )}

              {paginatedPosts.length > 0 ? (
                <motion.div
                  variants={staggerContainer(0.08)}
                  initial="hidden"
                  animate="visible"
                  className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {paginatedPosts.map((post, index) => (
                    <PostCard key={post.slug} post={post} index={index} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="text-center py-16"
                >
                  <p className="text-muted-foreground text-lg mb-4">İçerik bulunamadı</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="text-primary text-sm font-semibold hover:underline focus-ring"
                  >
                    Filtreleri temizle
                  </button>
                </motion.div>
              )}

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>

            <aside className="hidden lg:block space-y-8">
              <NewsletterSignup variant="sidebar" />
              <PopularPosts posts={popularPosts} />
            </aside>
          </div>

          <div className="lg:hidden mt-16">
            <NewsletterSignup variant="inline" />
          </div>
        </div>
      </section>
    </main>
  );
}
