require('dotenv').config({ path: '../../../.env' });

const { INFURA_KEY } = process.env;

export const getRPC = () => {
    return `https://sepolia.infura.io/v3/3e55ba6c0e484b6ca3993d172041ac7d`
}

export const SMC_ADDRESS = {
    USDT: '0xba116C19bc8f7BB26c17563457DE20C6101690d2',
    NFT: '0x9c8195e66cE0cB1A49D3Bcd92c8bB897cA9b8f9f',
    MARKET: '0x308738C3EdCA063507CB9451c78D491ab08a4694'
}