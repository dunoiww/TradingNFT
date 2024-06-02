import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useAppSelector } from '@/app/redux/hooks';
import NftContract from '@/app/contracts/NftContract';
import { showTransactionHash } from '../utils';
import { HashLoader, PulseLoader } from 'react-spinners';

interface LoadingModalProps {
    isLoading: boolean;
}

export default function LoadingModal({ isLoading }: LoadingModalProps) {
    return (
        <div>
            <Modal open={isLoading}>
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className='flex items-end justify-center'>
                        <HashLoader color="#fde046" />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
