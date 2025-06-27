'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { CategoryList } from '@/components/CategoryList';
import { BlogPostCard } from '@/components/BlogPostCard';
import { Pagination } from '@/components/Pagination';
import type { BlogPost, Category } from '@/lib/markdown';

interface CategoryFilterProps {
  posts: Omit<BlogPost, 'content'>[];
  categories: Category[];
}

export function CategoryFilter({ posts, categories }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Get category from URL or default to 'all'
  const categoryParam = searchParams.get('category');
  const pageParam = searchParams.get('page');
  
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categoryParam && categories.some(cat => cat.id === categoryParam) 
      ? categoryParam 
      : 'all'
  );
  const [currentPage, setCurrentPage] = useState(
    pageParam ? parseInt(pageParam, 10) || 1 : 1
  );
  const [isMobile, setIsMobile] = useState(false);
  
  const POSTS_PER_PAGE = 6;

  // Detect mobile view
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategoryId]);

  // Update URL when category changes
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    
    // Create new search params
    const params = new URLSearchParams(searchParams);
    if (categoryId === 'all') {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }
    
    // Reset page to 1 when changing category
    params.delete('page');
    
    // Update URL without refreshing the page
    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newUrl, { scroll: false });
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    
    // Create new search params
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    
    // Update URL without refreshing the page
    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newUrl, { scroll: false });
  };

  // Filter posts by category
  const filteredByCategory = selectedCategoryId === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategoryId);
    
  // Calculate pagination
  const totalPages = Math.ceil(filteredByCategory.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = filteredByCategory.slice(startIndex, endIndex);

  // Find category name by id
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || '';
  };

  return (
    <>
      {/* Mobile: Category chips */}
      {isMobile && (
        <CategoryList 
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={handleCategoryChange}
          isMobile={true}
          posts={posts}
        />
      )}
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop: Category sidebar */}
        {!isMobile && (
          <div className="md:w-1/4 lg:w-1/5">
            <CategoryList 
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={handleCategoryChange}
              posts={posts}
            />
          </div>
        )}
        
        {/* Blog posts grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => (
              <BlogPostCard 
                key={post.id} 
                post={post} 
                categoryName={post.category ? getCategoryName(post.category) : undefined}
              />
            ))}
          </div>
          
          {filteredByCategory.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Không tìm thấy bài viết nào.</p>
            </div>
          )}
          
          {/* Pagination */}
          {filteredByCategory.length > 0 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  );
} 