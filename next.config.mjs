/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Exclude authentication pages from static generation
  async generateBuildId() {
    return 'build-' + Date.now();
  },
}

export default nextConfig
