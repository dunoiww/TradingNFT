'use client';
import React from 'react';
import { useAppSelector } from '../redux/hooks';
import NftContract from '../contracts/NftContract';
import { INftItem } from '../_types_';
import MarketContract from '../contracts/MarketContract';
import NftItem from './component/NftItem';
import UsdtContract from '../contracts/UsdtContract';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Market() {
    const { web3Provider, wallet } = useAppSelector((state) => state.account);
    const [nfts, setNfts] = React.useState<INftItem[]>([]);
    const [nft, setNft] = React.useState<INftItem>({} as INftItem);
    const [nftListed, setNftListed] = React.useState<INftItem[]>([]);
    const [txHast, setTxHast] = React.useState<string>();

    const [isProcessing, setIsProcessing] = React.useState(false);

    const getListNft = React.useCallback(async () => {
        const nftContract = new NftContract(web3Provider);
        const marketContract = new MarketContract(web3Provider);
        const ids = await marketContract.getNFTListedOnMarketplace();
        const listedNfts = await nftContract.getNftInfo(ids);
        setNftListed(listedNfts);
    }, []);

    React.useEffect(() => {
        getListNft();
    }, [getListNft]);

    const handleBuy = React.useCallback(
        async (nft: INftItem) => {
            if (!web3Provider || !nft.price) {
                toast.error('Please connect your wallet', {
                    position: 'top-right',
                    theme: 'light',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
            }
            try {
                const marketContract = new MarketContract(web3Provider);
                const usdtContract = new UsdtContract(web3Provider);
                await usdtContract.approve(marketContract._contractAddress, nft.price);
                const tx = await marketContract.buyNft(nft.id, nft.price);
                setTxHast(tx);
            } catch (error) {
                console.log(error);
            }
        },
        [web3Provider]
    );

    const handleTransfer = async (toAddress: string) => {
        setIsProcessing(true);
        try {
            if (!nft || !web3Provider || !wallet) return;

            const nftContract = new NftContract(web3Provider);
            await nftContract.approve(toAddress, nft.id);

            const tx = await nftContract.safeTransferFrom(wallet.address, toAddress, nft.id);
            setTxHast(tx);
        } catch (err) {
            console.log(err);
        }

        setIsProcessing(false);
    };

    return (
        <div className="container mx-auto">
            <div className="grid lg:grid-cols-3 gap-2 md:grid-cols-2 grid-cols-1 xl:grid-cols-4">
                {nftListed &&
                    nftListed.map((nft) => {
                        return (
                            <NftItem
                                key={nft.id}
                                nft={nft}
                                onBuy={() => handleBuy(nft)}
                            />
                        );
                    })
                }
                <ToastContainer />
            </div>
        </div>
    );
}
