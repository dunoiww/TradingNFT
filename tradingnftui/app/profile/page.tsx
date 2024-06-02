'use client';
import React, { useEffect } from 'react';
import NftItem from './component/NftItem';
import Add from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ModalCreate from './component/ModalCreate';
import { useAppSelector } from '../redux/hooks';
import NftContract from '../contracts/NftContract';
import { INftItem } from '../_types_';
import MarketContract from '../contracts/MarketContract';
import ListModal from './component/ListModal';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import TransferModal from './component/TransferModal';
import SuccessModal from '../component/SuccessModal';
import ProcessingModal from '../component/ProcessingModal';

export default function Profile() {
    const { web3Provider, wallet } = useAppSelector((state) => state.account);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpenList, setIsOpenList] = React.useState(false);
    const [isOpenTransfer, setIsOpenTransfer] = React.useState(false);
    const [nfts, setNfts] = React.useState<INftItem[]>([]);
    const [nft, setNft] = React.useState<INftItem>({} as INftItem);
    const [txHash, setTxHash] = React.useState<string>('');
    const [defaultValue, setDefaultValue] = React.useState<string>('unlist');
    const [isList, setIsList] = React.useState<boolean>(false);
    const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
    const [title, setTitle] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleCloseTransfer = () => {
        setIsOpenTransfer(false);
    }

    const handleCloseSuccess = () => {
        setIsSuccess(false);
    }

    const handleCreateNFT = async (address: string) => {
        if (!wallet || !web3Provider) return;
        try {
            setIsLoading(true);
            handleClose();
            let tx = '';
            const nftContract = new NftContract(web3Provider);
            tx = await nftContract._createNft(address);

            setTxHash(tx);
            setTitle('Create NFT');
            setIsSuccess(true);
            setIsLoading(false);
            await getListNft();
        } catch (error) {
            console.log(error);
        }
    };

    const getListNft = React.useCallback(async () => {
        if (!web3Provider || !wallet) return;
        const nftContract = new NftContract(web3Provider);
        const marketContract = new MarketContract(web3Provider);
        if (defaultValue === 'unlist') {
            const nfts = await nftContract.getListNFT(wallet.address);
            setIsList(false);
            setNfts(nfts);
        } else {
            const listedList = await marketContract.getNFTListedOnMarketplace();
            const nftList = await nftContract.getNftInfo(listedList);
            setIsList(true);
            setNfts(nftList);
        }
    }, [web3Provider, wallet, defaultValue]);

    React.useEffect(() => {
        getListNft();
    }, [getListNft]);

    const handleClickList = async (nft: INftItem) => {
        setNft(nft);
        if (!isList) {
            setIsOpenList(true);
        } else {
            const marketContract = new MarketContract(web3Provider);
            await marketContract.unListNft(nft.id);
        }
    };

    const handleClickTransfer = async (nft: INftItem) => {
        setNft(nft);
        setIsOpenTransfer(true);
    }

    const handleCloseListModal = () => {
        setIsOpenList(false);
    };

    const handleListNFT = async (price: number) => {
        if (!wallet || !web3Provider || !price || !nft) return;

        try {
            setIsLoading(true);
            handleCloseListModal();
            const nftContract = new NftContract(web3Provider);
            let tx = '';
            const marketContract = new MarketContract(web3Provider);
            await nftContract.approve(marketContract._contractAddress, nft.id);

            tx = await marketContract.listNft(nft.id, price);

            setTxHash(tx);
            setIsSuccess(true);
            setTitle('List NFT');
            setIsLoading(false);
            await getListNft();
        } catch (error) {
            console.log(error);
        }
    };

    const handleTransfer = async (toAddress: string) => {
        if (!web3Provider || !wallet) return;
        try {
            setIsLoading(true);
            handleCloseTransfer();
            const nftContract = new NftContract(web3Provider);
            await nftContract.approve(toAddress, nft.id);
            const tx = await nftContract.safeTransferFrom(wallet.address, toAddress, nft.id);
            setIsSuccess(true);
            setTxHash(tx);
            setTitle('Transfer NFT');
            setIsLoading(false);
            await getListNft();
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        setDefaultValue(event.target.value as string);
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-row items-center justify-between py-4">
                <Select
                    sx={{
                        // backgroundColor: 'white',
                        background: 'linear-gradient(to right, #4e54c8, #8f94fb)',
                        color: 'black',
                        width: {
                            xs: '40%',
                            sm: '30%',
                            md: '30%',
                            lg: '25%',
                            xl: '20%',
                        },
                        height: '40px',
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'transparent',
                        },
                        borderRadius: 2,
                        fontSize: 18,
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                background: 'linear-gradient(to right, #4e54c8, #8f94fb)', // Gradient for dropdown menu
                            },
                        },
                    }}
                    value={defaultValue}
                    onChange={handleChange}
                    label="Status">
                    <MenuItem value="unlist">Your unlist NFT</MenuItem>
                    <MenuItem value="list">Your list NFT</MenuItem>
                </Select>

                <button
                    onClick={handleOpen}
                    className="rounded-lg relative w-[180px] h-10 cursor-pointer flex items-center border border-blue-500 bg-blue-500 group hover:bg-blue-500 active:bg-blue-500 active:border-blue-500">
                    <span className="text-gray-200 font-semibold ml-8 transform group-hover:translate-x-14 transition-all duration-300">
                        Create NFT
                    </span>
                    <span className="absolute right-0 h-full w-10 rounded-lg bg-blue-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                        <svg
                            className="svg w-8 text-white"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg">
                            <line
                                x1="12"
                                x2="12"
                                y1="5"
                                y2="19"></line>
                            <line
                                x1="5"
                                x2="19"
                                y1="12"
                                y2="12"></line>
                        </svg>
                    </span>
                </button>
            </div>

            <div className="p-[2px] bg-gray-600"></div>

            <div className="mx-auto w-full">
                {/* <div className="flex flex-col items-center justify-center md:flex-row md:justify-between md:flex-wrap w-full"> */}
                <div className="grid lg:grid-cols-3 gap-2 md:grid-cols-2 grid-cols-1 xl:grid-cols-4">
                    {nfts &&
                        nfts.map((nft, index) => {
                            return (
                                <NftItem
                                    key={index}
                                    nft={nft}
                                    isListed={isList}
                                    onClickList={handleClickList}
                                    onClickTransfer={handleClickTransfer}
                                />
                            );
                        })}
                </div>
            </div>

            <ModalCreate
                isOpen={isOpen}
                onClose={handleClose}
                onCreateNFT={handleCreateNFT}
            />

            <ListModal
                nft={nft}
                isOpen={isOpenList}
                handleCloseListModal={handleCloseListModal}
                handleListNFT={handleListNFT}
                handleTransfer={handleTransfer}
            />

            <TransferModal nft={nft} isOpen={isOpenTransfer} handleCloseTransferModal={handleCloseTransfer} handleTransfer={handleTransfer}/>

            <SuccessModal isOpenSuccess={isSuccess} title={title} hash={txHash} handleCloseListModal={handleCloseSuccess}/>

            <ProcessingModal isLoading={isLoading}/>
        </div>
    );
}
