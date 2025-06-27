/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configure images for static export
  images: {
    unoptimized: true,
    domains: [
      'localhost', 
      'localhost:3000', 
      'media.licdn.com', 
      'onibiocare.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  
  // Metadata configuration for SEO
  env: {
    siteUrl: 'https://onibiocare.com',
    siteName: 'Oni Biocare',
    siteDescription: 'Sản phẩm chăm sóc sức khỏe chất lượng cao',
    locale: 'vi_VN',
  },
};

module.exports = nextConfig; 