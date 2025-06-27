/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = '';
let basePath = '';

if (isGithubActions) {
  // Extract repository name from GITHUB_REPOSITORY (format: owner/repo)
  const repo = "onibiocare-site";
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
} else {
  // For local development or other deployments, you might want to set these differently
  // If deploying to a custom domain, leave these empty
  assetPrefix = '';
  basePath = '';
}

const nextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: assetPrefix,
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      }
    ],
  },
};

export default nextConfig;
