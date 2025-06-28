/** @type {import('next').NextConfig} */

// Determine if we're building for GitHub Pages
const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = '';
let basePath = '';

// if (isGithubActions) {
//   // Extract repository name from GITHUB_REPOSITORY (format: owner/repo)
//   const repo = "onibiocare-site";
//   assetPrefix = `/${repo}/`;
//   basePath = `/${repo}`;
// } else {
//   // For local development or other deployments, you might want to set these differently
//   // If deploying to a custom domain, leave these empty
//   assetPrefix = '';
//   basePath = '';
// }

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
      'onibiocare.com',
      'oni-biocare.github.io'
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
    basePath: basePath, // Make basePath available in environment
  },
};

module.exports = nextConfig; 
