/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: false,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://c8l-bot-server.onrender.com',
    NEXT_PUBLIC_APP_NAME: 'C8L Agency',
    NEXT_PUBLIC_APP_VERSION: '21.0.0',
  },
}
module.exports = nextConfig
