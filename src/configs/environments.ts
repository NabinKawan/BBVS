import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const env = process.env.NODE_ENV;

const environments = {
  HOST_URL: publicRuntimeConfig.HOST_URL,
  BBVS_API_URL: publicRuntimeConfig.BBVS_API_URL,
  COMPILER_URL: publicRuntimeConfig.COMPILER_URL,
  BLOCKCHAIN_URL: publicRuntimeConfig.BLOCKCHAIN_URL,
  ELECTION_CONTRACT_ADDRESS: publicRuntimeConfig.ELECTION_CONTRACT_ADDRESS,
};

console.log({
  environment: env,
  api_url: environments.BBVS_API_URL,
  host_url: environments.HOST_URL,
  blockchain_url: environments.BLOCKCHAIN_URL,
  compiler_url: environments.COMPILER_URL,
  contract_address: environments.ELECTION_CONTRACT_ADDRESS,
});

export default environments;
