/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  reactStrictMode: true,
  images: {
    domains: ["static.zara.net"],
  },
};

module.exports = nextConfig;
