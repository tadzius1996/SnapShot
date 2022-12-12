/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'scontent.fhan4-3.fna.fbcdn.net'],
  }
}

module.exports = nextConfig
