import { format } from 'date-fns';
import Link from 'next/link';
import OniImage from '@/components/ui/oni-image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import type { BlogPost } from '@/lib/markdown';

interface BlogPostCardProps {
  post: Omit<BlogPost, 'content'>;
  categoryName?: string;
}

export function BlogPostCard({ post, categoryName }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-200 overflow-hidden">
        <div className="w-full h-48 relative overflow-hidden">
          {categoryName && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="default" className="font-medium">
                {categoryName}
              </Badge>
            </div>
          )}
          <div className="relative w-full h-full">
            {post.coverImage ? (
              <OniImage
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={false}
              />
            ) : (
              <PlaceholderImage 
                title={post.title} 
                className="w-full h-full" 
              />
            )}
          </div>
        </div>
        <CardHeader className="pb-2 ">
          <h2 className="text-xl font-semibold line-clamp-2 hover:text-primary transition-colors">
            {post.title}
          </h2>
          <div className="text-sm text-muted-foreground">
            {format(new Date(post.date), 'MMMM d, yyyy')}
          </div>
        </CardHeader>
        {post.excerpt && (
          <CardContent className="pt-0">
            <p className="text-muted-foreground line-clamp-2">
              {post.excerpt}
            </p>
          </CardContent>
        )}
      </Card>
    </Link>
  );
} 