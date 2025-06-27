import Image, { ImageProps } from 'next/image';

/**
 * Custom Image component that handles path prefixing for GitHub Pages
 * Use this component instead of Next.js Image component for consistent image loading
 */
const OniImage = (props: ImageProps) => {
  // Get src from props
  let { src, ...rest } = props;
  
  // Use the environment variable for basePath
  const basePath = process.env.basePath || '';
  
  // Modify src if it's a relative path and not already prefixed
  // Skip for external URLs (starting with http or https)
  if (typeof src === 'string' && !src.startsWith('http') && !src.startsWith('data:')) {
    // Make sure src starts with a slash
    const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
    
    // Don't add basePath if it's empty or if src already starts with basePath
    if (basePath && !normalizedSrc.startsWith(basePath)) {
      src = `${basePath}${normalizedSrc}`;
    }
  }
  
  return <Image {...rest} src={src} />;
};

export default OniImage; 