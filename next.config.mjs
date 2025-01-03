/** @type {import('next').NextConfig} */
const config = {
  trailingSlash: true,
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['emirhanakdeniz.com'],
    unoptimized: true
  },
  experimental: {
    optimizeCss: true
  }
};

export default config; 