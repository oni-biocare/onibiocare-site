import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  // Generate JSON-LD structured data for breadcrumbs
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@id': item.href || '#',
        'name': item.label
      }
    }))
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className={`flex items-center text-sm text-muted-foreground ${className}`}>
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
              {item.href && index !== items.length - 1 ? (
                <Link 
                  href={item.href} 
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={index === items.length - 1 ? "font-medium text-foreground" : ""}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      
      {/* Add JSON-LD structured data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
} 