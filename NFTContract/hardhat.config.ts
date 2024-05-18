import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: 'https://sepolia.infura.io/v3/27751eae5f47427689aa0d340be58945',
      accounts: [process.env.PRIVATE_KEY ?? '']
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY ?? '',
    }
  }

};

export default config;
