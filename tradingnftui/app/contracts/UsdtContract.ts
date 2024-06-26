import { ethers } from "ethers";
import { getRPC } from "./utils/common";
import { getUsdtAbi } from "./utils/getAbis";
import { getMarketAddress, getUsdtAddress } from "./utils/getAddress";
import { Erc20 } from "./interfaces";

export default class UsdtContract extends Erc20 {
    constructor(provider: ethers.providers.Web3Provider) {
        const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
        super(provider || rpcProvider, getUsdtAddress(), getUsdtAbi());
        if (!provider) {
            this._contract = new ethers.Contract(this._contractAddress, this._abis, rpcProvider);
        }
    }

    getBalance = async () => {
        return this._contract.balanceOf(getMarketAddress());
    }
}