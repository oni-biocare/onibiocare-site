"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Product } from '@/lib/products';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Placeholder banner images - replace with actual product banner images when available
const bannerImages = [
  "/images/banner/banner_1.png",
  "/images/banner/banner_2.png",
  "/images/banner/banner_3.png",
  "/images/banner/banner_4.png",
  "/images/banner/banner_5.png",
  "/images/banner/banner_6.png",
];

interface ProductsClientPageProps {
  productsByMainCategory: Record<string, Omit<Product, 'content'>[]>;
  mainCategories: string[];
}

// Banner carousel component with client-side functionality
function ProductBanner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [bannerCarouselApi, setBannerCarouselApi] = useState<any>(null);

  // Setup for banner carousel and sync with indicators
  useEffect(() => {
    if (!bannerCarouselApi) return;
    
    const onSelect = () => {
      setActiveSlide(bannerCarouselApi.selectedScrollSnap());
    };
    
    bannerCarouselApi.on("select", onSelect);
    
    // Initial selection
    setActiveSlide(bannerCarouselApi.selectedScrollSnap());
    
    return () => {
      bannerCarouselApi.off("select", onSelect);
    };
  }, [bannerCarouselApi]);
  
  // Auto-scroll banner logic
  useEffect(() => {
    if (!bannerCarouselApi) return;
    
    const interval = setInterval(() => {
      if (bannerCarouselApi.canScrollNext()) {
        bannerCarouselApi.scrollNext();
      } else {
        bannerCarouselApi.scrollTo(0);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [bannerCarouselApi]);

  const handleIndicatorClick = (index: number) => {
    if (bannerCarouselApi) {
      bannerCarouselApi.scrollTo(index);
    }
  };

  return (
    <div className="mb-12 relative">
      <Carousel 
        className="w-full"
        opts={{
          loop: true,
          align: "start",
        }}
        setApi={setBannerCarouselApi}
      >
        <CarouselContent>
          {bannerImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-[400px] relative overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`Product banner ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
        
        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full transition-colors border-0 ${
                activeSlide === index 
                  ? 'bg-primary' 
                  : 'bg-gray-400'
              }`}
              style={{
                backgroundColor: activeSlide === index ? '' : ''
              }}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}

// ProductCategory component with client-side animation
function ProductCategory({ category, products }: { category: string, products: Omit<Product, 'content'>[] }) {
  return (
    <div key={category} className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold pb-2 border-b">{category}</h2>
        <Button variant="ghost" asChild>
          <Link href={`/categories/${category.toLowerCase()}`}>
            Tất cả <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          </Link>
        </Button>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
              <Link href={`/products/${product.id}`}>
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
                  </CardContent>
                  <CardFooter className="text-sm text-primary">
                  Chi tiết
                  </CardFooter>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-4 flex justify-end gap-2">
          <CarouselPrevious 
            className="static translate-y-0 mr-2" 
            variant="outline"
          />
          <CarouselNext 
            className="static translate-y-0" 
            variant="outline"
          />
        </div>
      </Carousel>
    </div>
  );
}

export default function ProductsClientPage({ productsByMainCategory, mainCategories }: ProductsClientPageProps) {
  const [autoAnimateRef] = useAutoAnimate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Auto-scrolling banner */}
        <ProductBanner />
        
        <h1 className="text-4xl font-bold mb-2">Sản phẩm & Dịch vụ</h1>
        <p className="text-muted-foreground mb-8">Khám phá các sản phẩm và dịch vụ chăm sóc sức khỏe của chúng tôi.</p>
        
        {mainCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Không có sản phẩm nào.</p>
          </div>
        ) : (
          <div ref={autoAnimateRef} className="space-y-16">
            {mainCategories.map((category) => (
              <ProductCategory 
                key={category} 
                category={category} 
                products={productsByMainCategory[category]} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 