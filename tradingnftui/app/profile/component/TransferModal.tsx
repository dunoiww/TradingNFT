import { Clarity, INftItem } from '@/app/_types_';
import { Button, Modal } from '@mui/material';
import React from 'react';

interface IProps {
    nft: INftItem;
    isOpen: boolean;
    handleCloseTransferModal: () => void;
    handleTransfer: (toAddress: string) => void;
}

export default function TransferModal({ nft, isOpen, handleCloseTransferModal, handleTransfer }: IProps) {
    const [address, setAddress] = React.useState<string>('');
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

                    <div>
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            placeholder='Address 0x...'
                            className="border border-gray-300 rounded p-2 w-full text-white"
                            style={{ backgroundColor: '#212121' }}
                        />
                    </div>

                    <div className="w-full">
                        <Button
                            onClick={() => handleTransfer(address)}
                            variant="contained"
                            style={{ width: '100%' }}>
                            Transfer
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
                                onClick={handleCloseTransferModal}>
                                <p className="px-2 rounded-full flex items-center justify-center">x</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
