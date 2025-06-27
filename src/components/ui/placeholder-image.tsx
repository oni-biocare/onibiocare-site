import React from 'react';

interface PlaceholderImageProps {
  title?: string;
  className?: string;
}

export function PlaceholderImage({ title, className = '' }: PlaceholderImageProps) {
  // Generate a color based on the title (for consistency)
  const getColor = (text: string) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  };
  
  const bgColor = title ? getColor(title) : 'hsl(210, 70%, 80%)';
  const displayText = title?.slice(0, 30) || 'Placeholder Image';
  
  return (
    <div 
      className={`flex items-center justify-center bg-gradient-to-br from-[${bgColor}] to-[${bgColor}]/70 text-center p-4 ${className}`}
      style={{ background: `linear-gradient(to bottom right, ${bgColor}, ${bgColor}90)` }}
    >
      <p className="text-gray-800 font-medium text-sm">
        {displayText}
      </p>
    </div>
  );
} 