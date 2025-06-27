import { Metadata } from 'next';
import { Suspense } from 'react';
import { getSortedPostsData, getCategories } from '@/lib/markdown';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export const metadata: Metadata = {
  title: 'Blog - Bài viết mới nhất',
  description: 'Khám phá những bài viết mới nhất về sức khỏe, công nghệ, và khoa học từ Oni Biocare.',
  openGraph: {
    title: 'Blog - Bài viết mới nhất',
    description: 'Khám phá những bài viết mới nhất về sức khỏe, công nghệ, và khoa học từ Oni Biocare.',
    type: 'website',
    images: [
      {
        url: '/images/og/blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Oni Biocare Blog',
      },
    ],
  },
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  const posts = getSortedPostsData();
  const categories = getCategories();

  // Structured data for Blog
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog - Oni Biocare',
    description: 'Khám phá những bài viết mới nhất về sức khỏe, công nghệ, và khoa học từ Oni Biocare.',
    url: 'https://onibiocare.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Oni Biocare',
      logo: {
        '@type': 'ImageObject',
        url: 'https://onibiocare.com/logo.png'
      }
    },
    blogPosts: posts.slice(0, 10).map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.date,
      author: {
        '@type': 'Person',
        name: post.author || 'Oni Biocare'
      },
      url: `https://onibiocare.com/blog/${post.id}`,
      description: post.excerpt || '',
      keywords: post.category || ''
    }))
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
      
        <h1 className="text-4xl font-bold mb-4">Bài viết</h1>
        <p className="text-muted-foreground mb-8">
          Khám phá những bài viết mới nhất về sức khỏe, công nghệ, và khoa học từ Oni Biocare.
        </p>
        
        <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
          <CategoryFilter posts={posts} categories={categories} />
        </Suspense>

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </div>
    </div>
  );
} 