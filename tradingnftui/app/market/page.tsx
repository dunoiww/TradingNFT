'use client';
import React, { useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import NftContract from '../contracts/NftContract';
import { INftItem } from '../_types_';
import MarketContract from '../contracts/MarketContract';
import NftItem from './component/NftItem';
import UsdtContract from '../contracts/UsdtContract';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuccessModal from '../component/SuccessModal';
import ProcessingModal from '../component/ProcessingModal';
import LoadingModal from '../component/LoadingModal';
import ShowToast from '../component/Toast';
import DetailModal from '../component/DetailModal';

export default function Market() {
    const { web3Provider, wallet } = useAppSelector((state) => state.account);
    const [nfts, setNfts] = React.useState<INftItem[]>([]);
    const [nft, setNft] = React.useState<INftItem>({} as INftItem);
    const [nftListed, setNftListed] = React.useState<INftItem[]>([]);
    const [balanceUser, setBalanceUser] = React.useState<string>();
    const [txHash, setTxHash] = React.useState<string>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [isDetail, setIsDetail] = React.useState(false);

    const getListNft = React.useCallback(async () => {
        try {
            setIsLoading(true);
            const nftContract = new NftContract(web3Provider);
            const marketContract = new MarketContract(web3Provider);
            const ids = await marketContract.getNFTListedOnMarketplace();
            const listedNfts = await nftContract.getNftInfo(ids);
            setNftListed(listedNfts);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, [web3Provider, wallet]);

    React.useEffect(() => {
        getListNft();
    }, [getListNft]);

    const handleBuy = React.useCallback(
        async (nft: INftItem) => {
            if (!web3Provider || !nft.price) {
                ShowToast('Please connect your wallet')
                return;
            }
            try {
                setIsProcessing(true);
                const marketContract = new MarketContract(web3Provider);
                const usdtContract = new UsdtContract(web3Provider);
                await usdtContract.approve(marketContract._contractAddress, nft.price);
                const tx = await marketContract.buyNft(nft.id, nft.price);
                setTxHash(tx);
                setIsSuccess(true);
                setIsProcessing(false);
                await getListNft();
                await handleGetBalance();
            } catch (error) {
                setIsProcessing(false);
                ShowToast('User rejected the transaction')
                console.log(error);
            }
        },
        [web3Provider, getListNft]
    );

    const handleGetBalance = React.useCallback(async () => {
        if (!web3Provider || !wallet) return;
        try {
            const usdtContract = new UsdtContract(web3Provider);
            const balance = await usdtContract.getBalanceUser(wallet.address);
            setBalanceUser((balance / 10 ** 18).toLocaleString('en-US'));
        } catch (error) {
            console.log(error);
        }
    }, [web3Provider, wallet]);

    React.useEffect(() => {
        handleGetBalance();
    }, [handleGetBalance]);

    const handleClick = (nft: INftItem) => {
        setIsDetail(true);
        setNft(nft);
    }

    const handleClose = () => {
        setIsDetail(false);
    }

    return (
        <div className="container mx-auto px-4">
            <div className='my-[2%] w-full flex justify-end px-10'>
                <div className='border border-gray-500 rounded-lg'>
                    <p className='p-2'>Balance: <span>{balanceUser} USDT</span></p>
                </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-2 md:grid-cols-2 grid-cols-1 xl:grid-cols-4">
                {nftListed &&
                    nftListed.map((nft) => {
                        return (
                                <NftItem
                                    key={nft.id}
                                    nft={nft}
                                    onBuy={() => handleBuy(nft)}
                                    onDetail={() => handleClick(nft)}
                                />
                        );
                    })
                }
            </div>

            <SuccessModal isOpenSuccess={isSuccess} title="Buy NFT" hash={txHash || ''} handleCloseListModal={() => setIsSuccess(false)} />

            <ProcessingModal isProcessing={isProcessing} />

            <LoadingModal isLoading={isLoading} />

            <DetailModal isOpen={isDetail} nft={nft} handleClose={handleClose}/>

            <ToastContainer />
        </div>
    );
}
