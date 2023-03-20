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
    BBVS_API_URL: process.env.BBVS_API_URL || 'https://bbvs-api.sireto.dev',
    COMPILER_URL: process.env.COMPILER_URL || 'http://compiler:80',
    BLOCKCHAIN_URL: process.env.BLOCKCHAIN_URL || 'http://satyatathya:80',
    HOST_URL: process.env.HOST_URL || 'https://bbvs.sireto.dev',
    ELECTION_CONTRACT_ADDRESS:
      process.env.ELECTION_CONTRACT_ADDRESS ||
      '3c4094f0849fae61fc3c8c782e5d08392d3a52ef05f4cb7c6293e95808311012',
  },
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production',
  // },
};

console.log(process.env);
module.exports = nextConfig;
