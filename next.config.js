/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    BBVS_API_URL: process.env.BBVS_API_URL,
    COMPILER_URL: process.env.COMPILER_URL,
    BLOCKCHAIN_URL: process.env.BLOCKCHAIN_URL,
    HOST_URL: process.env.HOST_URL,
  },
};

module.exports = nextConfig;
