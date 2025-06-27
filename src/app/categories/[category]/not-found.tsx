import Link from 'next/link';

export default function CategoryNotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold mb-6">Category Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        We couldn't find the category you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link 
        href="/products" 
        className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Browse All Products
      </Link>
    </div>
  );
} 