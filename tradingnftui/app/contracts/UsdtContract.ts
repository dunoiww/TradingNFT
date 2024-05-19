import { ethers } from "ethers";
import { getRPC } from "./utils/common";
import { getUsdtAbi } from "./utils/getAbis";
import { getUsdtAddress } from "./utils/getAddress";
import { Erc20 } from "./interfaces";

export default class UsdtContract extends Erc20 {
    constructor(provider: ethers.providers.Web3Provider) {
        super(provider, getUsdtAddress(), getUsdtAbi());
    }
}