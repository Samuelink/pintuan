/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true, // 开发环境下可以添加这个选项
  },
  reactStrictMode: true,
}

module.exports = nextConfig 