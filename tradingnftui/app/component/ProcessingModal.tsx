import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useAppSelector } from '@/app/redux/hooks';
import NftContract from '@/app/contracts/NftContract';
import { showTransactionHash } from '../utils';
import { PulseLoader } from 'react-spinners';

interface ProcessingModalProps {
    isProcessing: boolean;
}

export default function ProcessingModal({ isProcessing }: ProcessingModalProps) {
    return (
        <div>
            <Modal open={isProcessing}>
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <div
                        className="loader border-t-2 rounded-full border-yellow-500 bg-yellow-300 animate-spin aspect-square w-12 flex justify-center items-center text-yellow-700">
                        <p className='text-2xl'>€</p>
                    </div>
                    <div className='flex items-end justify-center'>
                        <p className='mt-5'>Wait the transaction for a moment </p>
                        <PulseLoader color="#fde046" size={10} margin={4}/> 
                    </div>
                    
                </div>
            </Modal>
        </div>
    );
}
