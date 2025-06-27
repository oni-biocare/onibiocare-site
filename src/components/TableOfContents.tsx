'use client';

import { useEffect, useState, useRef } from 'react';
import { Link as LinkIcon } from 'lucide-react';

interface TableOfContentsProps {
  content: string;
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Extract headings from content when component mounts
  useEffect(() => {
    if (!content) return;
    
    // Parse content to extract headings
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3, h4');
    
    const extractedHeadings: TOCItem[] = Array.from(headingElements).map((el, index) => {
      const id = el.id || `heading-${index}`;
      const level = parseInt(el.tagName.substring(1));
      return {
        id,
        text: el.textContent || '',
        level
      };
    });
    
    setHeadings(extractedHeadings);
  }, [content]);
  
  // Add IDs to headings in the actual DOM
  useEffect(() => {
    if (!contentRef.current) return;
    
    // Find heading elements in the actual DOM (in the content div)
    const articleContent = document.querySelector('.article-content');
    if (!articleContent) return;
    
    const headingElements = articleContent.querySelectorAll('h2, h3, h4');
    
    // Add IDs to the headings if they don't have them
    headingElements.forEach((el, index) => {
      if (!el.id) {
        el.id = `heading-${index}`;
      }
    });
  }, []);
  
  // Track active heading on scroll
  useEffect(() => {
    if (headings.length === 0) return;
    
    const handleScroll = () => {
      // Get heading elements by their IDs
      const headingElements = headings
        .map(heading => document.getElementById(heading.id))
        .filter(Boolean) as HTMLElement[];
      
      if (headingElements.length === 0) return;
      
      // Find the heading that's currently visible
      const scrollPosition = window.scrollY + 100; // Offset for better UX
      
      // Find the last heading that's above the current scroll position
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveHeading(headings[i].id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);
  
  // Handle click on TOC item
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for navbar
        behavior: 'smooth'
      });
      setActiveHeading(id);
    }
  };
  
  if (headings.length === 0) {
    return null;
  }
  
  return (
    <div className="relative">
      <h2 className="text-lg font-semibold mb-4">Mục lục</h2>
      <nav className="toc-nav">
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`cursor-pointer transition-colors ${
                heading.level === 3 ? 'ml-4' : heading.level === 4 ? 'ml-8' : ''
              }`}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`flex items-start text-left w-full hover:text-primary hover:underline ${
                  activeHeading === heading.id
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                {activeHeading === heading.id && (
                  <LinkIcon className="mr-1 h-3 w-3 mt-1 flex-shrink-0" />
                )}
                <span className="text-left">{heading.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div ref={contentRef} className="hidden" />
    </div>
  );
} 