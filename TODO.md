# SEO Checklist for Oni Biocare Website

## Global Metadata Files

### 1. `src/app/layout.tsx`
- [ ] Update site title for better SEO impact (currently "Oni Biocare")
- [ ] Create more descriptive meta description (currently generic "Sản phẩm chăm sóc sức khỏe chất lượng cao")
- [ ] Expand keywords list with more specific, relevant terms
- [ ] Add Google Search Console verification code (replace "your-google-verification-code")
- [ ] Set up Facebook/Meta pixel ID for tracking
- [ ] Add structured data for organization/business
- [ ] Consider adding alternate language versions if multilingual support is planned

### 2. `src/app/robots.ts`
- [ ] Review and update disallowed paths if needed
- [ ] Consider adding crawl-delay directive if server load is a concern

### 3. `src/app/sitemap.ts`
- [ ] Add all product pages to sitemap
- [ ] Add all category pages to sitemap
- [ ] Set appropriate priority values for different page types
- [ ] Ensure lastModified dates are accurate and updated
- [ ] Add all static pages (About, Contact, etc.)

### 4. `public/robots.txt`
- [ ] Ensure consistency with robots.ts configuration
- [ ] Update with absolute sitemap URL (currently just "/sitemap.xml")

### 5. `public/manifest.json`
- [ ] Create and add missing icon files (icon-192x192.png, icon-512x512.png)
- [ ] Update description for better brand representation
- [ ] Add more icon sizes for better device compatibility

## Image Optimization

### 6. `public/images/` directory
- [ ] Optimize all images for web (compress without quality loss)
- [ ] Add descriptive filenames for all images
- [ ] Ensure all images have appropriate alt text in the code
- [ ] Consider adding WebP versions of images for better performance
- [ ] Resize large images to appropriate dimensions for their usage

## Content Files

### 7. `content/blog/` directory
- [ ] Update all sample blog posts with real, valuable content
- [ ] Ensure each blog post has:
  - [ ] Descriptive title with target keywords
  - [ ] Optimized meta description in frontmatter
  - [ ] Properly structured headings (H1, H2, H3)
  - [ ] Internal links to relevant products/categories
  - [ ] Alt text for all images
  - [ ] Proper keyword density without keyword stuffing
  - [ ] At least 800-1000 words for substantial content

### 8. `content/products/` directory
- [ ] Optimize all product descriptions with relevant keywords
- [ ] Add schema markup for products (price, availability, ratings)
- [ ] Ensure consistent product naming convention
- [ ] Add detailed product specifications
- [ ] Include high-quality product images with descriptive alt text

### 9. `content/category/` directory
- [ ] Optimize category descriptions with relevant keywords
- [ ] Add proper meta descriptions for category pages
- [ ] Create logical hierarchy for categories if applicable

## Performance & Technical SEO

### 10. Next.js Configuration
- [ ] Configure image optimization in `next.config.js`
- [ ] Set up proper caching headers for static assets
- [ ] Implement proper redirects for any old URLs
- [ ] Configure internationalization if needed

### 11. Analytics & Tracking
- [ ] Set up Google Analytics 4 integration
- [ ] Implement event tracking for key user interactions
- [ ] Set up conversion tracking for important actions
- [ ] Create custom dimensions for better data segmentation

### 12. Social Media Integration
- [ ] Add Open Graph image for social sharing (1200×630 pixels)
- [ ] Create Twitter card image (1200×675 pixels)
- [ ] Add social sharing buttons to blog posts and products
- [ ] Ensure consistent branding across all social previews

### 13. Additional Technical Improvements
- [ ] Implement breadcrumbs for better navigation and SEO
- [ ] Add structured data for FAQ sections if applicable
- [ ] Set up XML sitemap ping to search engines when updated
- [ ] Implement proper canonical URLs for all pages
- [ ] Configure proper 404 page with helpful navigation
- [ ] Set up 301 redirects for any changed URLs
- [ ] Implement lazy loading for images and videos
- [ ] Add a search functionality with proper indexing

## Regular Maintenance Tasks

### 14. Ongoing SEO Work
- [ ] Regular content updates (at least 1 blog post per week)
- [ ] Monitor and fix broken links
- [ ] Review and update existing content for freshness
- [ ] Check search console for errors and fix them
- [ ] Monitor site performance and optimize as needed
- [ ] Track keyword rankings and adjust strategy accordingly
- [ ] Analyze user behavior and optimize based on findings
- [ ] Review competitor websites for SEO strategies

## Next Steps

1. Start with global metadata files as they affect the entire site
2. Then move to content optimization of key pages
3. Finally implement technical SEO improvements
4. Set up analytics and monitoring
5. Create a regular maintenance schedule 