import { BigNumber, ethers } from 'ethers';
import { Erc721 } from './interfaces';
import { getRPC } from './utils/common';
import { getNftAddress } from './utils/getAddress';
import { getNftAbi } from './utils/getAbis';
import { INftItem } from '../_types_';

export default class NftContract extends Erc721 {
    constructor(provider?: ethers.providers.Web3Provider) {
        const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
        super(provider || rpcProvider, getNftAddress(), getNftAbi());
        if (!provider) {
            this._contract = new ethers.Contract(this._contractAddress, this._abis, rpcProvider);
        }
    }

    _createNft = async (address: string) => {
        const tx = await this._contract.mint(address, 1);
        return this._handleTransactionResponse(tx);
    };

    private _listTokenIds = async (address: string) => {
        const urls: BigNumber[] = await this._contract.listTokenIds(address);
        const ids = await Promise.all(urls.map((id) => this._toNumber(id)));
        return ids;
    };

    getListNFT = async (address: string): Promise<INftItem[]> => {
        const ids = await this._listTokenIds(address);
        return Promise.all(
            ids.map(async (id) => {
                const tokenUrl = await this._contract.tokenURI(id);
                const obj = await (await fetch(`${tokenUrl}.json`)).json();
                const item: INftItem = { ...obj, id };
                return item;
            })
        );
    };

    getNftInfo = async (nfts: Array<any>) => {
        return Promise.all(
            nfts.map(async (o: any) => {
                const tokenUrl = await this._contract.tokenURI(o.tokenId);
                const obj = await (await fetch(`${tokenUrl}.json`)).json();
                const item: INftItem = {
                    ...obj,
                    id: o.tokenId,
                    author: o.author,
                    price: o.price,
                };
                return item;
            })
        );
    };

    isMinter = async (address: string) => {
        return await this._contract.hasRole('0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6', address);
    }

    isAdmin = async (address: string) => {
        return await this._contract.hasRole('0x0000000000000000000000000000000000000000000000000000000000000000', address)
    }
}
