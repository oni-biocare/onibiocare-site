"use client";

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Product } from '@/lib/products';
import { ChevronRight } from 'lucide-react';

interface RecommendedProductsProps {
  products: Omit<Product, 'content'>[];
}

export default function RecommendedProducts({ products }: RecommendedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.id} className="sm:basis-1/2 lg:basis-1/3">
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
  );
} 