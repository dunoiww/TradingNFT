import React from 'react';
import Button from '@mui/material/Button';
import { Clarity, INftItem } from '@/app/_types_';
import { useAppSelector } from '@/app/redux/hooks';
import NftContract from '@/app/contracts/NftContract';
import MarketContract from '@/app/contracts/MarketContract';
import { showSortAddress } from '@/app/utils';

interface IProps {
    nft: INftItem;
    onBuy?: () => void;
}

export default function NftItem({ nft, onBuy }: IProps) {
    const { web3Provider, wallet } = useAppSelector((state) => state.account);
    const [txHash, setTxHash] = React.useState<string>();

    return (
        <div className="flex items-center justify-center transition ease-in-out transform hover:-translate-y-1 duration-300">
            <div
                className="relative p-2"
                style={{
                    backgroundColor: '#212121',
                    width: 290,
                    borderRadius: 8,
                    marginTop: 15,
                }}>
                <img
                    src={nft.image}
                    style={{ objectFit: 'contain', borderRadius: 8 }}
                    alt="NFT"
                />

                <div className="absolute top-3 left-4">
                    <p
                        style={{ fontSize: 40 }}
                        className="italic font-bold">
                        {Clarity[(nft.attributes?.find((p) => p.trait_type === 'Rarity')?.value as any) || 0]}
                    </p>
                </div>

                <div className="mt-2 space-y-2">
                    {nft.name ? (
                        <p className="text-center font-semibold">{nft.name}</p>
                    ) : (
                        <p className="text-center font-semibold">NO NAME</p>
                    )}

                    <div className="p-2 border border-gray-500 rounded-md">
                        <div className='flex flex-row justify-between items-center'>
                            <p className="text-sm font-semibold text-gray-500">Author:</p>
                            <p className="text-sm font-semibold text-gray-500">{showSortAddress(nft.author)}</p>
                        </div>
                    </div>

                    <div className="p-2 border border-gray-500 rounded-md">
                        <div className="flex flex-row justify-between items-center">
                            <p className="text-sm font-semibold text-gray-500">Price:</p>
                            <p className="text-sm font-semibold text-gray-500">{nft.price} USDT</p>
                        </div>
                    </div>
                    <Button
                        onClick={onBuy}
                        variant="contained"
                        className="p-3 w-full rounded-lg items-center justify-center mt-5">
                        Buy
                    </Button>
                </div>

                <div className="absolute top-3 right-4">
                    <div
                        className="p-1 px-3 rounded-lg"
                        style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                        <p>Id: {nft.id.toString().padStart(5, '0')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
