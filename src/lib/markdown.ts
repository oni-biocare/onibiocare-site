import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'content/blog');
const categoriesFile = path.join(process.cwd(), 'content/category/categories.md');

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  author?: string;
  category?: string;
};

export async function getPostData(id: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(gfm)
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    content: contentHtml,
    ...(matterResult.data as { title: string; date: string; excerpt?: string; coverImage?: string; author?: string; category?: string; })
  };
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    };
  });
}

export function getSortedPostsData(): Omit<BlogPost, 'content'>[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { title: string; date: string; excerpt?: string; coverImage?: string; author?: string; category?: string; })
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getCategories(): Category[] {
  try {
    const fileContents = fs.readFileSync(categoriesFile, 'utf8');
    const matterResult = matter(fileContents);
    return matterResult.data.categories || [];
  } catch (error) {
    console.error("Error reading categories:", error);
    return [];
  }
} 