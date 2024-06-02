import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useAppSelector } from '@/app/redux/hooks';
import NftContract from '@/app/contracts/NftContract';

interface ModalCreateProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateNFT: (address: string) => void;
}

export default function ModalCreate({ isOpen, onClose, onCreateNFT }: ModalCreateProps) {
    const { web3Provider, wallet } = useAppSelector((state) => state.account);
    const [address, setAddress] = React.useState<string>('');

    return (
        <div>
            <Modal open={isOpen}>
                <div className="flex items-center justify-center w-full h-full">
                    <div className="lg:w-[40%] lg:h-[15%] bg-white w-[400px] h-[150px] rounded-md p-4 flex flex-col justify-between">
                        <input
                            type="text"
                            className="border border-gray-500 text-black w-full p-2 rounded-md"
                            placeholder="Address 0x..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <div className="flex flex-row justify-between">
                            <button
                                onClick={onClose}
                                className="w-[48%] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#ff1616] before:to-[rgb(184,105,105)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
                                Cancel
                            </button>
                            <button
                                onClick={() => onCreateNFT(address)}
                                className="w-[48%] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
