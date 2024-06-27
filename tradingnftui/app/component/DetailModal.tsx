import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, Typography, Backdrop } from '@mui/material';
import Image from 'next/image';
import { useAppSelector } from '@/app/redux/hooks';
import NftContract from '@/app/contracts/NftContract';
import { showSortAddress, showTransactionHash } from '../utils';
import { INftItem } from '../_types_';

interface DetailModalProps {
    isOpen: boolean;
    nft: INftItem;
    handleClose: () => void;
}

export default function DetailModal({ isOpen, nft, handleClose }: DetailModalProps) {
    return (
        <div>
            <Modal
                open={isOpen}
                BackdropComponent={(props) => (
                    <Backdrop
                        {...props}
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                        onClick={handleClose}
                    />
                )}>
                <div className="flex items-center justify-center w-full h-full">
                    <div
                        className="lg:w-[50%] lg:h-[70%] w-[400px] h-[300px] rounded-md p-4 relative"
                        style={{ backgroundColor: '#141823' }}>
                        <button
                            className="hover:bg-black-10 rounded-full absolute top-1 right-2 bg-black/20"
                            onClick={handleClose}>
                            <p className="px-2 rounded-full flex items-center justify-center font-bold">x</p>
                        </button>
                        <div className="flex flex-row space-x-5 mt-[3%]">
                            <div className="w-[50%] space-y-5">
                                <img
                                    src={nft.image}
                                    style={{ borderRadius: 8 }}
                                    alt="NFT"
                                />

                                <p className="font-bold text-xl">Information</p>

                                <div className="flex flex-row space-x-2">
                                    <p className="text-gray-400 font-semibold">Name:</p>
                                    <p className="font-semibold">{nft.name}</p>
                                </div>

                                <div className="flex flex-row space-x-2">
                                    <p className="text-gray-400 font-semibold">Author:</p>
                                    <p className="font-semibold">{showSortAddress(nft.author)}</p>
                                </div>

                                <div className="flex flex-row space-x-2">
                                    <p className="text-gray-400 font-semibold">Price:</p>
                                    <p className="font-semibold">{nft.price?.toLocaleString('en-US')} USDT</p>
                                </div>
                            </div>
                            <div className="w-[50%] max-h-[580px] overflow-y-auto border border-gray-300 rounded-lg p-4 space-y-5">
                                <p className="font-bold text-lg text-center mb-4">Attributes</p>
                                <div>
                                    <p className="tracking-wide text-gray-400 ml-1">Level</p>
                                    <input
                                        readOnly
                                        type="text"
                                        placeholder={
                                            nft?.attributes?.find((attr) => attr.trait_type === 'Level')
                                                ?.value as string
                                        }
                                        className="border border-gray-300 rounded p-2 w-full text-white bg-gray-900 cursor-default"
                                        style={{ pointerEvents: 'none' }}
                                    />
                                </div>
                                <div>
                                    <p className="tracking-wide text-gray-400 ml-1">Move speed</p>
                                    <input
                                        readOnly
                                        type="text"
                                        placeholder={
                                            nft?.attributes?.find((attr) => attr.trait_type === 'Move Speed')
                                                ?.value as string
                                        }
                                        className="border border-gray-300 rounded p-2 w-full text-white bg-gray-900 cursor-default"
                                        style={{ pointerEvents: 'none' }}
                                    />
                                </div>
                                <div>
                                    <p className="tracking-wide text-gray-400 ml-1">Attack speed</p>
                                    <input
                                        readOnly
                                        type="text"
                                        placeholder={
                                            nft?.attributes?.find((attr) => attr.trait_type === 'Attack Speed')
                                                ?.value as string
                                        }
                                        className="border border-gray-300 rounded p-2 w-full text-white bg-gray-900 cursor-default"
                                        style={{ pointerEvents: 'none' }}
                                    />
                                </div>
                                <div>
                                    <p className="tracking-wide text-gray-400 ml-1">Strength</p>
                                    <input
                                        readOnly
                                        type="text"
                                        placeholder={
                                            nft?.attributes?.find((attr) => attr.trait_type === 'Strength')
                                                ?.value as string
                                        }
                                        className="border border-gray-300 rounded p-2 w-full text-white bg-gray-900 cursor-default"
                                        style={{ pointerEvents: 'none' }}
                                    />
                                </div>
                                <div>
                                    <p className="tracking-wide text-gray-400 ml-1">Stamina</p>
                                    <input
                                        readOnly
                                        type="text"
                                        placeholder={
                                            nft?.attributes?.find((attr) => attr.trait_type === 'Stamina')
                                                ?.value as string
                                        }
                                        className="border border-gray-300 rounded p-2 w-full text-white bg-gray-900 cursor-default"
                                        style={{ pointerEvents: 'none' }}
                                    />
                                </div>
                                <div>
                                    <p className="tracking-wide text-gray-400 ml-1">Blood</p>
                                    <input
                                        readOnly
                                        type="text"
                                        placeholder={
                                            nft?.attributes?.find((attr) => attr.trait_type === 'Blood')
                                                ?.value as string
                                        }
                                        className="border border-gray-300 rounded p-2 w-full text-white bg-gray-900 cursor-default"
                                        style={{ pointerEvents: 'none' }}
                                    />
                                </div>
                                <div>
                                    <p className="tracking-wide text-gray-400 ml-1">Win Count</p>
                                    <input
                                        readOnly
                                        type="text"
                                        placeholder={
                                            nft?.attributes?.find((attr) => attr.trait_type === 'WinCount')
                                                ?.value as string
                                        }
                                        className="border border-gray-300 rounded p-2 w-full text-white bg-gray-900 cursor-default"
                                        style={{ pointerEvents: 'none' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
