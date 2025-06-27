import { format } from 'date-fns';
import { getPostData, getAllPostIds, getCategories, getSortedPostsData } from '@/lib/markdown';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { Metadata } from 'next';
import OniImage from '@/components/ui/oni-image';
import { Suspense } from 'react';
import { PlaceholderImage } from '@/components/ui/placeholder-image';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { RelatedPosts } from '@/components/RelatedPosts';
import { SocialShare } from '@/components/SocialShare';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TableOfContents } from '@/components/TableOfContents';

// Define correct type for Next.js 15
interface PageProps {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // In Next.js 15, we need to await params
  const paramData = await params;
  const id = paramData.id;
  const post = await getPostData(id);
  
  return {
    title: post.title,
    description: post.excerpt || post.content.slice(0, 160),
    keywords: [post.category || ''].filter(Boolean),
    authors: [{ name: post.author || 'Oni Biocare Team' }],
    publisher: 'Oni Biocare',
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.slice(0, 160),
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'Oni Biocare Team'],
      images: post.coverImage ? [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.content.slice(0, 160),
      images: post.coverImage ? [post.coverImage] : [],
    },
    alternates: {
      canonical: `/blog/${id}`,
    },
  };
}

export async function generateStaticParams() {
  const fileNames = fs.readdirSync(path.join(process.cwd(), 'content/blog'));
  return fileNames.map((fileName) => ({
    id: fileName.replace(/\.md$/, '')
  }));
}

export default async function BlogPost({ params }: PageProps) {
  // In Next.js 15, we need to await params
  const paramData = await params;
  const id = paramData.id;
  const post = await getPostData(id);
  const categories = getCategories();
  const allPosts = getSortedPostsData();
  
  // Find category name
  const getCategoryName = (categoryId: string | undefined) => {
    if (!categoryId) return '';
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || categoryId;
  };
  
  const categoryName = getCategoryName(post.category);

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'Oni Biocare Team',
    },
    image: post.coverImage || 'https://onibiocare.com/og-image.jpg',
    publisher: {
      '@type': 'Organization',
      name: 'Oni Biocare',
      logo: {
        '@type': 'ImageObject',
        url: 'https://onibiocare.com/logo.png'
      }
    },
    description: post.excerpt || post.content.slice(0, 160),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://onibiocare.com/blog/${id}`,
    },
    articleBody: post.content,
    wordCount: post.content.split(/\s+/).length,
    articleSection: categoryName || 'Blog',
    inLanguage: 'vi-VN',
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          {/* Category (centered tooltip) */}
          {categoryName && (
            <div className="flex justify-center mb-4">
              <Badge variant="default" className="font-medium">
                {categoryName}
              </Badge>
            </div>
          )}
          
          {/* Centered title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {post.title}
          </h1>
          
          {/* Centered datetime */}
          <div className="flex justify-center items-center mb-8 text-muted-foreground">
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
            
            {post.author && (
              <>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
              </>
            )}
          </div>
          
          {/* Full width cover image with radius */}
          <div className="w-full mb-10">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
              {post.coverImage ? (
                <OniImage
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
              ) : (
                <PlaceholderImage 
                  title={post.title} 
                  className="w-full h-full rounded-2xl" 
                />
              )}
            </div>
          </div>
          
          {/* Content columns */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Menu (TOC) - hidden on mobile */}
            <div className="hidden md:block md:w-1/4 lg:w-1/5">
              <div className="sticky top-24">
                <TableOfContents content={post.content} />
              </div>
            </div>
            
            {/* Article content */}
            <div className="flex-1">
              {post.excerpt && (
                <div className="text-lg text-muted-foreground mb-8 italic">
                  {post.excerpt}
                </div>
              )}
              
              <div 
                className="prose prose-lg max-w-none article-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Social Share */}
              <div className="flex justify-center mt-10 pt-6 border-t">
                <Suspense fallback={<div className="h-10"></div>}>
                  <SocialShare 
                    title={post.title} 
                    description={post.excerpt} 
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recommended Articles (max 3) */}
        <div className="mt-16 max-w-7xl mx-auto">
          <RelatedPosts 
            currentPost={post} 
            allPosts={allPosts} 
            getCategoryName={getCategoryName} 
          />
        </div>
      </article>
    </>
  );
}