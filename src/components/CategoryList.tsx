'use client';

import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Category } from '@/lib/markdown';
import type { BlogPost } from '@/lib/markdown';

interface CategoryListProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  className?: string;
  isMobile?: boolean;
  posts: Omit<BlogPost, 'content'>[];
}

export function CategoryList({
  categories,
  selectedCategoryId,
  onSelectCategory,
  className = '',
  isMobile = false,
  posts
}: CategoryListProps) {
  // Count posts in each category
  const getCategoryCount = (categoryId: string): number => {
    if (categoryId === 'all') {
      return posts.length;
    }
    return posts.filter(post => post.category === categoryId).length;
  };
  if (isMobile) {
    return (
      <div className={`mb-6 ${className}`}>
        <ScrollArea className="w-full whitespace-nowrap pb-2">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategoryId === category.id ? "default" : "outline"}
                className={`cursor-pointer px-3 py-1 text-sm ${
                  selectedCategoryId === category.id 
                    ? 'bg-primary hover:bg-primary/90' 
                    : 'hover:bg-secondary'
                }`}
                onClick={() => onSelectCategory(category.id)}
              >
                {category.name} ({getCategoryCount(category.id)})
              </Badge>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="text-lg font-medium mb-3">Danh mục</h3>
      <div className="space-y-1">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`px-3 py-2 rounded-md cursor-pointer transition-colors flex justify-between items-center ${
              selectedCategoryId === category.id
                ? 'bg-primary/10 text-primary font-medium'
                : 'hover:bg-secondary/50'
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            <span>{category.name}</span>
            <span className="text-xs px-2 py-1 rounded-full bg-secondary/50">
              {getCategoryCount(category.id)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 