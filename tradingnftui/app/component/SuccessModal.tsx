import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useAppSelector } from '@/app/redux/hooks';
import NftContract from '@/app/contracts/NftContract';
import { showTransactionHash } from '../utils';

interface SuccessModalProps {
    isOpenSuccess: boolean;
    title: string;
    hash: string;
    handleCloseListModal: () => void;
}

export default function SuccessModal({ isOpenSuccess, title, hash, handleCloseListModal }: SuccessModalProps) {
    const onNavigation = () => {
        if (window) {
            window.open(`https://sepolia.etherscan.io/tx/${hash}`)
        }
    }

    return (
        <div>
            <Modal open={isOpenSuccess}>
                <div className="flex items-center justify-center w-full h-full">
                    <div
                        className="lg:w-[25%] lg:h-[25%] w-[400px] h-[150px] rounded-md p-4 relative"
                        style={{ backgroundColor: '#141823' }}>
                        <button
                            className="hover:bg-black-10 rounded-full  bg-black/20"
                            onClick={handleCloseListModal}>
                            <p className="px-2 rounded-full flex items-center justify-center">x</p>
                        </button>
                        <p className="font-semibold text-white text-center text-xl">{title}</p>
                        <p className="text-center text-base text-gray-400">Your Transaction Successfully!</p>

                        <div className="mt-[10%]">
                            <Button
                                onClick={onNavigation}
                                fullWidth
                                variant="contained"
                                sx={{
                                    backgroundColor: '#deb640',
                                    '&:hover': {
                                        backgroundColor: '#FFCB2D', // Change this to your desired hover color
                                    },
                                    padding: 2,
                                }}>
                                {showTransactionHash(hash || '')}
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
