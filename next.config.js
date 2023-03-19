/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  swcMinify: true,
  publicRuntimeConfig: {
    BBVS_API_URL: process.env.BBVS_API_URL,
    COMPILER_URL: process.env.COMPILER_URL,
    BLOCKCHAIN_URL: process.env.BLOCKCHAIN_URL,
    HOST_URL: process.env.HOST_URL,
    ELECTION_CONTRACT_ADDRESS: process.env.ELECTION_CONTRACT_ADDRESS,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
