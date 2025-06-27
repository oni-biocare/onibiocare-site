import { Metadata } from 'next';
import ProductsClientPage from './ProductsClientPage';
import { getProductsByMainCategory } from '@/lib/products';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Sản phẩm & Dịch vụ | Onibiocare',
  description: 'Khám phá các sản phẩm và dịch vụ chăm sóc sức khỏe của chúng tôi được thiết kế để cung cấp dịch vụ chăm sóc đặc biệt và cải thiện kết quả điều trị cho bệnh nhân.',
  keywords: 'sản phẩm y tế, thiết bị y tế, dịch vụ chăm sóc sức khỏe, chăm sóc bệnh nhân, Onibiocare',
  openGraph: {
    title: 'Sản phẩm & Dịch vụ | Onibiocare',
    description: 'Khám phá các sản phẩm và dịch vụ chăm sóc sức khỏe của chúng tôi được thiết kế để cung cấp dịch vụ chăm sóc đặc biệt và cải thiện kết quả điều trị cho bệnh nhân.',
    type: 'website',
    url: '/products',
    siteName: 'Onibiocare',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sản phẩm & Dịch vụ | Onibiocare',
    description: 'Khám phá các sản phẩm và dịch vụ chăm sóc sức khỏe của chúng tôi được thiết kế để cung cấp dịch vụ chăm sóc đặc biệt và cải thiện kết quả điều trị cho bệnh nhân.',
  },
};

// Generate JSON-LD structured data for product listings
function generateStructuredData(productsByMainCategory: any) {
  const productItems = Object.values(productsByMainCategory)
    .flat()
    .map((product: any) => ({
      '@type': 'Product',
      name: product.title,
      description: product.description,
      image: product.coverImage,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://onibiocare.com'}/products/${product.id}`,
      ...(product.price && { offers: {
        '@type': 'Offer',
        price: product.price.replace(/[^0-9.]/g, ''),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      }}),
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: productItems.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: product
    }))
  };
}

export default function ProductsPage() {
  const productsByMainCategory = getProductsByMainCategory();
  const mainCategories = Object.keys(productsByMainCategory);
  
  // Since we can't generate this data directly in the metadata export
  // we'll insert it with a script tag
  const structuredData = generateStructuredData(productsByMainCategory);
  
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Interactive client components */}
      <ProductsClientPage productsByMainCategory={productsByMainCategory} mainCategories={mainCategories} />
    </>
  );
} 