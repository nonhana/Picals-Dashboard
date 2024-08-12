/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  experimental: {
    optimizePackageImports: [],
    serverComponentsExternalPackages: ['@prisma/client'], // prisma support
  },
  images: {
    domains: ['dummyimage.com', 'moe.nonhana.pics'],
  },
};

export default nextConfig;
