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
    COMPILER_URL: process.env.COMPILER_URL || 'https://bbvs-compiler.sireto.dev',
    BLOCKCHAIN_URL: process.env.BLOCKCHAIN_URL || 'https://satyatathya.sireto.dev',
    HOST_URL: process.env.HOST_URL || 'https://bbvs.sireto.dev',
    ELECTION_CONTRACT_ADDRESS:
      process.env.ELECTION_CONTRACT_ADDRESS ||
      '2568376c23d44fba61a0758712352c43a422b160d77990cb43741ea7b70cc7ec',
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

console.log(process.env);
module.exports = nextConfig;
