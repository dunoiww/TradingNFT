import { SMC_ADDRESS } from "./common";

interface AddressMap {
    [key: string]: string;
}

const getAddress = (name: string) => {
    return (SMC_ADDRESS as AddressMap)[name] || "";
};

export const getNftAddress = () => getAddress("NFT");
export const getUsdtAddress = () => getAddress("USDT");
export const getMarketAddress = () => getAddress("MARKET");