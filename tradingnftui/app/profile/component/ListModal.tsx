import { Clarity, INftItem } from '@/app/_types_';
import { Button, Modal } from '@mui/material';
import React from 'react';

interface IProps {
    nft: INftItem;
    isOpen: boolean;
    handleCloseListModal: () => void;
    handleListNFT: (price: number) => void;
    handleTransfer: (toAddress: string) => void;
}

export default function ListModal({ nft, isOpen, handleCloseListModal, handleListNFT, handleTransfer }: IProps) {
    const [price, setPrice] = React.useState<number>(0);
    return (
        <Modal open={isOpen}>
            <div className="flex justify-center items-center h-full">
                <div
                    className="relative p-2 space-y-2"
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
                    </div>

                    <div className="relative">
                        <input
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            type="text"
                            className="border border-gray-300 rounded p-2 w-full text-white pr-16"
                            style={{ backgroundColor: '#212121' }}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">USDC</span>
                    </div>

                    <div className="w-full">
                        <Button
                            onClick={() => handleListNFT(price)}
                            variant="contained"
                            style={{ width: '100%' }}>
                            List now
                        </Button>
                    </div>

                    <div className="absolute top-3 right-4 flex flex-row space-x-2 items-center justify-center">
                        <div
                            className="p-1 px-3 rounded-lg"
                            style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                            <p>Id: {nft?.id?.toString().padStart(5, '0')}</p>
                        </div>

                        <div>
                            <button
                                className="hover:bg-black-10 rounded-full  bg-black/20"
                                onClick={handleCloseListModal}>
                                <p className="px-2 rounded-full flex items-center justify-center">x</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
