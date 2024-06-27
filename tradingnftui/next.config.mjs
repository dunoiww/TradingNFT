/** @type {import('next').NextConfig} */
import 'dotenv/config'
const nextConfig = {
    env: {
        INFURA_KEY: process.env.INFURA_KEY,
        USDT_ADDRESS: process.env.USDT_ADDRESS,
        NFT_ADDRESS: process.env.NFT_ADDRESS,
        MARKET_ADDRESS: process.env.MARKET_ADDRESS,
    },
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'storage.googleapis.com',
              port: '',
            },
          ],
      
    }
};

export default nextConfig;
