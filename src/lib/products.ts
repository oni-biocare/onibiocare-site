import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const productsDirectory = path.join(process.cwd(), 'content/products');
const productCategoriesFile = path.join(process.cwd(), 'content/category/product_categories.md');

export type Product = {
  id: string;
  title: string;
  description: string;
  content: string;
  price?: string;
  category?: string;
  subcategory?: string;
  features?: string[];
  coverImage?: string;
  gallery?: string[];
  order?: number;
  shopeeUrl?: string;
};

export type ProductCategory = {
  name: string;
  subcategories: string[];
};

export async function getProductData(id: string): Promise<Product> {
  const fullPath = path.join(productsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the product metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    content: contentHtml,
    ...(matterResult.data as { 
      title: string; 
      description: string; 
      price?: string;
      category?: string;
      features?: string[];
      coverImage?: string;
      gallery?: string[];
      order?: number;
      shopeeUrl?: string;
    })
  };
}

export function getAllProductIds() {
  const fileNames = fs.readdirSync(productsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    };
  });
}

export function getSortedProductsData(): Omit<Product, 'content'>[] {
  // Get file names under /products
  const fileNames = fs.readdirSync(productsDirectory);
  const allProductsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(productsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the product metadata section
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { 
        title: string; 
        description: string; 
        price?: string;
        category?: string;
        features?: string[];
        coverImage?: string;
        gallery?: string[];
        order?: number;
        shopeeUrl?: string;
      })
    };
  });

  // Sort products by order if available, then by title
  return allProductsData.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    } else if (a.order !== undefined) {
      return -1;
    } else if (b.order !== undefined) {
      return 1;
    } else {
      return a.title.localeCompare(b.title);
    }
  });
}

export function getProductsByCategory(): Record<string, Omit<Product, 'content'>[]> {
  const products = getSortedProductsData();
  const categories: Record<string, Omit<Product, 'content'>[]> = {};
  
  products.forEach(product => {
    const category = product.category || 'Other';
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(product);
  });
  
  return categories;
}

export function getProductCategories(): ProductCategory[] {
  try {
    const fileContents = fs.readFileSync(productCategoriesFile, 'utf8');
    const matterResult = matter(fileContents);
    return matterResult.data.categories || [];
  } catch (error) {
    console.error("Error reading product categories:", error);
    return [];
  }
}

export function getProductsByMainCategory(): Record<string, Omit<Product, 'content'>[]> {
  const products = getSortedProductsData();
  const productCategories = getProductCategories();
  const mainCategories: Record<string, Omit<Product, 'content'>[]> = {};
  
  // Initialize main categories
  productCategories.forEach(category => {
    mainCategories[category.name] = [];
  });
  
  // Add an "Other" category for products that don't match any defined category
  mainCategories["Other"] = [];
  
  products.forEach(product => {
    if (!product.category) {
      mainCategories["Other"].push(product);
      return;
    }
    
    // Find which main category this product belongs to
    let matched = false;
    for (const category of productCategories) {
      if (category.subcategories.includes(product.category)) {
        mainCategories[category.name].push(product);
        matched = true;
        break;
      }
    }
    
    // If no main category matched, put in "Other"
    if (!matched) {
      mainCategories["Other"].push(product);
    }
  });
  
  // Remove empty categories
  Object.keys(mainCategories).forEach(key => {
    if (mainCategories[key].length === 0) {
      delete mainCategories[key];
    }
  });
  
  return mainCategories;
} 