"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { ShoppingBag } from 'lucide-react';

interface ProductDisplayProps {
  product: Product;
}

// Client component for image gallery interaction
function ProductGallery({ product }: { product: Product }) {
  // State to track the selected image
  const [selectedImage, setSelectedImage] = useState<string | undefined>(product.coverImage);

  // Use the first gallery image if coverImage doesn't exist
  const mainImage = selectedImage || (product.gallery && product.gallery.length > 0 ? product.gallery[0] : undefined);

  // Function to handle image selection
  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div>
      {mainImage && (
        <div className="rounded-lg overflow-hidden mb-4 border">
          <img
            src={mainImage}
            alt={product.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      
      {product.gallery && product.gallery.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {/* Add coverImage to the gallery selection if it exists */}
          {product.coverImage && (
            <div 
              className={`rounded-lg overflow-hidden cursor-pointer border-2 ${selectedImage === product.coverImage ? 'border-primary' : 'border-transparent'}`}
              onClick={() => handleImageSelect(product.coverImage!)}
            >
              <img
                src={product.coverImage}
                alt={`${product.title} - Cover`}
                className="w-full h-24 object-cover"
              />
            </div>
          )}
          
          {/* Display all gallery images */}
          {product.gallery.map((image, index) => (
            <div 
              key={index} 
              className={`rounded-lg overflow-hidden cursor-pointer border-2 ${selectedImage === image ? 'border-primary' : 'border-transparent'}`}
              onClick={() => handleImageSelect(image)}
            >
              <img
                src={image}
                alt={`${product.title} - Image ${index + 1}`}
                className="w-full h-24 object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Main product display component
export default function ProductDisplay({ product }: ProductDisplayProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Image/Gallery - Client component for interactivity */}
      <ProductGallery product={product} />

      {/* Product Info - Can be server rendered */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        
        {product.category && (
          <div className="text-sm text-muted-foreground mb-4">
            Category: {product.category}
          </div>
        )}
        
        {product.price && (
          <div className="text-2xl font-semibold text-primary mb-6">
            {product.price}
          </div>
        )}
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Mô tả</h2>
          <p className="text-muted-foreground">{product.description}</p>
        </div>
        
        {product.features && product.features.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Đặc điểm nổi bật</h2>
            <ul className="list-disc pl-5 space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-muted-foreground">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          {product.shopeeUrl ? (
            <Link 
              href={product.shopeeUrl} 
              target="_blank"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#EE4D2D] text-white rounded-md hover:bg-[#D73211] transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              Mua ngay trên Shopee
            </Link>
          ) : (
            <Link 
              href="https://shopee.vn" 
              target="_blank"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#EE4D2D] text-white rounded-md hover:bg-[#D73211] transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              Tìm trên Shopee
            </Link>
          )}
        </div>
      </div>
    </div>
  );
} 