import { getProductData, getAllProductIds, getProductCategories, getSortedProductsData, getProductsByCategory } from '@/lib/products';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import RecommendedProducts from './RecommendedProducts';
import ProductDisplay from './ProductDisplay';

type Props = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const paramData = await params;
  const id = String(paramData.id);
  const product = await getProductData(id);
  
  return {
    title: `${product.title} | Products | Onibiocare`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      type: 'website',
      images: product.coverImage ? [
        {
          url: product.coverImage,
          width: 1200,
          height: 630,
          alt: product.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: product.coverImage ? [product.coverImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const fileNames = fs.readdirSync(path.join(process.cwd(), 'content/products'));
  return fileNames.map((fileName) => ({
    id: fileName.replace(/\.md$/, '')
  }));
}

export default async function ProductPage({ params }: Props) {
  const paramData = await params;
  const id = String(paramData.id);
  const product = await getProductData(id);
  const categories = getProductCategories();
  
  // Get recommended products (random selection excluding current product)
  const allProducts = getSortedProductsData();
  const recommendedProducts = allProducts
    .filter(p => p.id !== id)
    .sort(() => 0.5 - Math.random()) // Randomize the array
    .slice(0, 3); // Take first 3 products
    
  // Get related products from the same category if available
  const productsByCategory = getProductsByCategory();
  const relatedProducts = product.category && productsByCategory[product.category] 
    ? productsByCategory[product.category]
        .filter(p => p.id !== id)
        .slice(0, 3)
    : [];

  // Function to find the main category for a subcategory
  const getMainCategoryForSubcategory = (subcategory: string): string => {
    for (const category of categories) {
      if (category.subcategories.includes(subcategory)) {
        return category.name;
      }
    }
    return ""; // Default fallback
  };

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.coverImage || 'https://onibiocare.com/og-image.jpg',
    ...(product.price && {
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock',
      },
    }),
    brand: {
      '@type': 'Brand',
      name: 'Onibiocare',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center text-sm mb-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <Link href="/products" className="text-muted-foreground hover:text-foreground">
              Sản phẩm & Dịch vụ
            </Link>
            {product.category && (
              <>
                <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
                <Link 
                  href={`/categories/${getMainCategoryForSubcategory(product.category)?.toLowerCase()}`} 
                  className="text-muted-foreground hover:text-foreground"
                >
                  {getMainCategoryForSubcategory(product.category)}
                </Link>
              </>
            )}
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <span className="text-foreground">{product.title}</span>
          </div>

          {/* Use client component for interactive product display */}
          <ProductDisplay product={product} />
          
          {/* Product Content */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Chi tiết sản phẩm</h2>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          </div>
          
          {/* Recommended Products with Carousel */}
          {recommendedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-semibold mb-6">Sản phẩm liên quan</h2>
              <RecommendedProducts products={recommendedProducts} />
            </div>
          )}
          
          {/* Related Products from same category if available */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-semibold mb-6">Tương tự như {product.title}</h2>
              <RecommendedProducts products={relatedProducts} />
            </div>
          )}
        </div>
      </div>
    </>
  );
} 