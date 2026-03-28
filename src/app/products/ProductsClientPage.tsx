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
import { useCart, CartItem } from '@/lib/cartStore';
import { Product } from '@/lib/products';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ChevronRight, ShoppingCart, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

  useEffect(() => {
    if (!bannerCarouselApi) return;
    const onSelect = () => setActiveSlide(bannerCarouselApi.selectedScrollSnap());
    bannerCarouselApi.on("select", onSelect);
    setActiveSlide(bannerCarouselApi.selectedScrollSnap());
    return () => { bannerCarouselApi.off("select", onSelect); };
  }, [bannerCarouselApi]);

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

  return (
    <div className="mb-12 relative">
      <Carousel
        className="w-full"
        opts={{ loop: true, align: "start" }}
        setApi={setBannerCarouselApi}
      >
        <CarouselContent>
          {bannerImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-[400px] relative overflow-hidden rounded-2xl">
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
              className={`h-2 rounded-full transition-all duration-300 border-0 cursor-pointer ${
                activeSlide === index
                  ? 'bg-primary w-6'
                  : 'bg-muted-foreground/30 w-2'
              }`}
              onClick={() => bannerCarouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}

// ─── Product Card ───────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Omit<Product, 'content'> }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const cartItem: Omit<CartItem, 'quantity'> = {
    id: product.id,
    title: product.title,
    price: product.price,
    coverImage: product.coverImage,
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(cartItem);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    // Does NOT navigate — just adds to cart and shows badge feedback
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(cartItem);
    router.push('/cart');
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden border hover:border-primary/40 hover:shadow-xl transition-all duration-300 group cursor-pointer rounded-2xl">
      {/* Product image */}
      {product.coverImage && (
        <div className="w-full h-48 relative overflow-hidden flex-shrink-0">
          <img
            src={product.coverImage}
            alt={product.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          {/* Category badge */}
          {product.category && (
            <span className="absolute top-3 left-3 rounded-full bg-background/80 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-medium text-foreground/80 border border-border/50">
              {product.category}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <CardHeader className="pb-2">
        <Link href={`/products/${product.id}`} className="group/title">
          <h3 className="text-base font-semibold line-clamp-2 leading-snug group-hover/title:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        {product.price && (
          <div className="text-primary font-bold text-lg mt-1">{product.price}</div>
        )}
      </CardHeader>

      <CardContent className="pb-3 flex-1">
        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
          {product.description}
        </p>
      </CardContent>

      {/* Action buttons */}
      <CardFooter className="pt-0 pb-4 px-6 flex gap-2 mt-auto">
        {/* Mua ngay */}
        <button
          type="button"
          onClick={handleBuyNow}
          className="flex-1 rounded-xl bg-primary text-primary-foreground text-sm font-semibold py-2.5 flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
        >
          <Zap className="h-3.5 w-3.5" />
          Mua ngay
        </button>

        {/* Thêm vào giỏ */}
        <button
          type="button"
          onClick={handleAddToCart}
          title="Thêm vào giỏ"
          className={`rounded-xl border px-3 py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
            added
              ? 'bg-green-600 border-green-600 text-white'
              : 'border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground'
          }`}
        >
          <ShoppingCart className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline">{added ? 'Đã thêm' : 'Thêm vào giỏ'}</span>
        </button>
      </CardFooter>
    </Card>
  );
}

// ─── Category section ────────────────────────────────────────────────────────
function ProductCategory({ category, products }: { category: string; products: Omit<Product, 'content'>[] }) {
  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold pb-2 border-b">{category}</h2>
        <Button variant="ghost" asChild>
          <Link href={`/categories/${category.toLowerCase()}`}>
            Tất cả <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          </Link>
        </Button>
      </div>

      <Carousel
        opts={{ align: "start", loop: false }}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-5 flex justify-end gap-2">
          <CarouselPrevious className="static translate-y-0 mr-2" variant="outline" />
          <CarouselNext className="static translate-y-0" variant="outline" />
        </div>
      </Carousel>
    </div>
  );
}

// ─── Page root ───────────────────────────────────────────────────────────────
export default function ProductsClientPage({ productsByMainCategory, mainCategories }: ProductsClientPageProps) {
  const [autoAnimateRef] = useAutoAnimate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Auto-scrolling banner */}
        <ProductBanner />

        <h1 className="text-4xl font-bold mb-2">Sản phẩm &amp; Dịch vụ</h1>
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