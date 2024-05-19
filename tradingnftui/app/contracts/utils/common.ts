require('dotenv').config({ path: '../../../.env'});

const { INFURA_KEY } = process.env;

export const getRPC = () => {
    return `https://sepolia.infura.io/v3/${INFURA_KEY}`
}

export const SMC_ADDRESS = {
    USDT: '0x086f0ff14858901eFe9d5AA6FCa693dC2dE6Ee64',
    NFT: '0x118c1042bf28Cc7Ec70921f9687A71aB58dCD77b',
    MARKET: '0x008A1cBbb3dd2F40dCd41dDA08E7fBa2F2eC20A3'
}