"use client";
import React from 'react';
import Button from '@mui/material/Button';
import Balance from './components/Balance';
import GrantRole from './components/GrantRole';
import Tax from './components/Tax';
import { useAppSelector } from '../redux/hooks';
import UsdtContract from '../contracts/UsdtContract';
import MarketContract from '../contracts/MarketContract';
import NftContract from '../contracts/NftContract';
import ProcessingModal from '../component/ProcessingModal';
import SuccessModal from '../component/SuccessModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShowToast from '../component/Toast';

export default function Setting() {
    const { web3Provider, wallet } = useAppSelector((state) => state.account);
    const [balance, setBalance] = React.useState<number>(0);
    const [txHash, setTxHash] = React.useState<string>('');
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
    const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
    const [title, setTitle] = React.useState<string>('');

    const handleWithdraw = async (amount: number) => {
        if (!web3Provider || !wallet) return;
        try {
            setIsProcessing(true);
            const marketContract = new MarketContract(web3Provider);
            const tx = await marketContract.withdraw(amount);
            setTitle('Withdraw Successfully');
            setIsSuccess(true);
            setTxHash(tx);
            setIsProcessing(false);
            await getBalance();
        } catch (error) {
            setIsProcessing(false);
            ShowToast('User rejected the transaction');
            console.log(error)
        }
    }

    const getBalance = async () => {
        if (!web3Provider || !wallet) return;
        try {
            const usdtContract = new UsdtContract(web3Provider);
            const balance = await usdtContract.getBalance();
            setBalance(balance / 10 ** 18);
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getBalance()
    })

    const handleGrantRole = async (role: string, account: string) => {
        if (!web3Provider || !wallet) return;
        try {
            setIsProcessing(true);
            const nftContract = new NftContract(web3Provider);
            const tx = await nftContract.grantRole(account, role);
            setTitle('Grant Role Successfully');
            setIsSuccess(true);
            setTxHash(tx);
            setIsProcessing(false);
        } catch (error) {
            setIsProcessing(false);
            ShowToast('User rejected the transaction');
            console.log(error)
        }
    }

    const handleSetTax = async (tax: number) => {
        if (!web3Provider || !wallet) return;
        try {
            setIsProcessing(true);
            const marketContract = new MarketContract(web3Provider);
            const tx = await marketContract.setTax(tax);
            setTitle('Set Tax Successfully');
            setIsSuccess(true);
            setTxHash(tx);
            setIsProcessing(false);
        } catch (error) {
            setIsProcessing(false);
            ShowToast('User rejected the transaction');
            console.log(error)
        }
    }

    return (
        <div className="container mx-auto px-4">
            <div className="text-center text-2xl font-semibold mt-2">Admin Page</div>

            <div className="mx-auto w-full mt-5">
                <div className="grid lg:grid-cols-3 gap-2 md:grid-cols-2 grid-cols-1 xl:grid-cols-3">
                    <Balance handleWithdraw={handleWithdraw} balance={balance}/>
                    <GrantRole handleGrantRole={handleGrantRole}/>
                    <Tax handleSetTax={handleSetTax}/>
                </div>
            </div>

            <ProcessingModal isProcessing={isProcessing} />
            <SuccessModal
                isOpenSuccess={isSuccess}
                title={title}
                hash={txHash}
                handleCloseListModal={() => setIsSuccess(false)}
            />
            <ToastContainer />
        </div>
    );
}
