/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  experimental: {
    optimizePackageImports: [],
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    remotePatterns: [{ hostname: 'moe.nonhana.pics' }],
  },
};

export default nextConfig;
