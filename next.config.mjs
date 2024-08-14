/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  experimental: {
    optimizePackageImports: [],
    serverComponentsExternalPackages: ['@prisma/client'], // prisma support
  },
  images: {
    remotePatterns: [
      { hostname: 'dummyimage.com' },
      { hostname: 'moe.nonhana.pics' },
    ],
  },
};

export default nextConfig;
