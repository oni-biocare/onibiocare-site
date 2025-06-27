import { BlogPost } from '@/lib/markdown';
import { BlogPostCard } from '@/components/BlogPostCard';

interface RelatedPostsProps {
  currentPost: Omit<BlogPost, 'content'>;
  allPosts: Omit<BlogPost, 'content'>[];
  getCategoryName: (categoryId: string | undefined) => string;
}

export function RelatedPosts({ currentPost, allPosts, getCategoryName }: RelatedPostsProps) {
  // Function to get related posts based on category or date proximity
  const getRelatedPosts = () => {
    // First try to get posts from the same category
    if (currentPost.category) {
      const sameCategoryPosts = allPosts.filter(post => 
        post.id !== currentPost.id && 
        post.category === currentPost.category
      );
      
      if (sameCategoryPosts.length >= 3) {
        return sameCategoryPosts.slice(0, 3);
      }
    }
    
    // If not enough posts from the same category, get recent posts
    const otherPosts = allPosts
      .filter(post => post.id !== currentPost.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return otherPosts.slice(0, 3);
  };
  
  const relatedPosts = getRelatedPosts();
  
  if (relatedPosts.length === 0) {
    return null;
  }
  
  return (
    <section className="mt-16 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map(post => (
          <BlogPostCard 
            key={post.id} 
            post={post} 
            categoryName={post.category ? getCategoryName(post.category) : undefined}
          />
        ))}
      </div>
    </section>
  );
} 