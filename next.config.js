/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL | 'http://localhost:5000/api',
  },
};

module.exports = nextConfig;
