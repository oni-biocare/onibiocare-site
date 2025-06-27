import { MetadataRoute } from 'next';
import { getSortedPostsData, getCategories } from '@/lib/markdown';

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://onibiocare.com';
  const posts = getSortedPostsData();
  const categories = getCategories();
  
  // Blog posts URLs
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog category URLs
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/blog?category=${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Main URLs
  const mainUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    // Add other main pages here
  ];

  return [...mainUrls, ...categoryUrls, ...postUrls];
} 