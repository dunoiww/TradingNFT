import ShowToast from '@/app/component/Toast';
import MarketContract from '@/app/contracts/MarketContract';
import UsdtContract from '@/app/contracts/UsdtContract';
import { useAppSelector } from '@/app/redux/hooks';
import { Button } from '@mui/material';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BalanceProps {
    handleWithdraw: (amount: number) => void
    balance: number
} 

export default function Balance({handleWithdraw, balance}: BalanceProps) {
    const { web3Provider, wallet } = useAppSelector((state) => state.account);
    const [amount, setAmount] = React.useState<number>(0)

    const process = () => {
        if (amount == 0) {
            ShowToast('Amount must be greater than 0')
            return;
        }
        handleWithdraw(amount)
    }

    return (
        <div className="border border-gray-300 shadow-md w-full h-72 flex rounded-lg">
            <div className="p-5 w-full relative">
                <p className="font-semibold text-lg">Balance of the contract:</p>
                <div className="flex flex-row items-end justify-between w-full mt-[2%]">
                    <p className="text-2xl tracking-wide">{balance}</p>
                    <p className="text-2xl tracking-wide">USDT</p>
                </div>

                <div className="mt-[9%]">
                        <p className="tracking-wide text-gray-400 ml-1">Amount</p>
                    <div className="relative">
                        <input
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            type="text"
                            className="border border-gray-300 rounded p-2 w-full text-white pr-16"
                            style={{ backgroundColor: '#212121' }}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">USDT</span>
                    </div>
                </div>

                <div className='absolute bottom-5 w-full left-0 px-5'>
                    <div className="w-full flex justify-center">
                        <Button
                            onClick={process}
                            variant="contained"
                            sx={{
                                width: '100%',
                                padding: '0.5rem',
                                backgroundColor: '#ffbf00',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: '#e6ac00',
                                },
                            }}>
                            Withdraw
                        </Button>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}
