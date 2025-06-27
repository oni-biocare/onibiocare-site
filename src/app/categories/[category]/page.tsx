import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductCategories, getProductsByMainCategory } from '@/lib/products';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const paramCategory = await params;
  const decodedCategory = decodeURIComponent(paramCategory.category);
  const categories = getProductCategories();
  const category = categories.find((cat) => cat.name.toLowerCase() === decodedCategory);
  
  if (!category) {
    return {
      title: 'Category Not Found | Onibiocare',
      description: 'The requested category could not be found.',
    };
  }
  
  return {
    title: `${category.name} Products | Onibiocare`,
    description: `Explore our range of ${category.name.toLowerCase()} products and services designed to provide exceptional care.`,
  };
}

export async function generateStaticParams() {
  const productsByMainCategory = getProductsByMainCategory();
  
  return Object.keys(productsByMainCategory).map((categoryName) => ({
    category: categoryName.toLowerCase(),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const paramCategory = await params;
  const decodedCategory = decodeURIComponent(paramCategory.category);
  const productsByMainCategory = getProductsByMainCategory();
  const categories = getProductCategories();
  
  // Find the main category that matches the URL parameter
  const categoryName = Object.keys(productsByMainCategory).find(
    (cat) => cat.toLowerCase() === decodedCategory
  );
  
  if (!categoryName || !productsByMainCategory[categoryName]) {
    notFound();
  }
  
  const products = productsByMainCategory[categoryName];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb navigation */}
        <div className="flex items-center text-sm mb-6">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link href="/products" className="text-muted-foreground hover:text-foreground">
            Sản phẩm & Dịch vụ
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <span className="text-foreground">{categoryName}</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
        <p className="text-muted-foreground mb-12">
          Khám phá toàn bộ sản phẩm và dịch vụ {categoryName.toLowerCase()}.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                {product.coverImage && (
                  <div className="w-full h-48 relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.coverImage}
                      alt={product.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <CardHeader>
                  <h3 className="text-xl font-semibold line-clamp-2 hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  {product.price && (
                    <div className="text-primary font-medium">{product.price}</div>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {product.description}
                  </p>
                  {product.category && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      Category: {product.category}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="text-sm text-primary">
                  Chi tiết
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 