require('dotenv').config()

export const getRPC = () => {
    return `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`
}

export const SMC_ADDRESS = {
    USDT: process.env.USDT_ADDRESS,
    NFT: process.env.NFT_ADDRESS,
    MARKET: process.env.MARKET_ADDRESS
}