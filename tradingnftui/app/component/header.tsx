"use client";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setWalletInfo, setWeb3Provider } from "../redux/accounts/account.slices";
import { numberFormat, showSortAddress } from "../utils";

export default function Header() {
    const pathname = usePathname();

    const dispatch = useAppDispatch();
    const { wallet } = useAppSelector(state => state.account)

    const onConnectWallet = async () => {
        if ((window as any).ethereum) {
            const provider = new ethers.providers.Web3Provider(
                (window as any).ethereum,
                undefined
            );
            const account = await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            const bigBalance = await provider.getBalance(account[0]);
            const balance = Number.parseFloat(ethers.utils.formatEther(bigBalance));

            dispatch(setWalletInfo({ address, balance }));
            dispatch(setWeb3Provider(provider));
        }
    };

    return (
        <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b sticky border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link
                    href="market/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <Image
                        src={require("../icon.png")}
                        style={{ width: 32, height: 36 }}
                        alt="Flowbite Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Open Fire
                    </span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {!wallet && (
                        <button
                            onClick={onConnectWallet}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Connect Wallet
                        </button>

                    )}

                    {
                        wallet && (
                            <button className="flex flex-row space-x-2 p-2 rounded-lg bg-yellow-600 hover:bg-yellow-700">
                                <span className="text-white">{showSortAddress(wallet.address)}</span>
                                <Image src={require("../ethIcon.png")} style={{ width: 24, height: 24 }} alt="ETH" />
                                <span className="text-white">{numberFormat(wallet.balance)}</span>
                            </button>
                        )
                    }
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link
                                href="/market"
                                className={`text-white hover:text-blue-600 ${
                                    pathname === "/market"
                                        ? "text-blue-600"
                                        : ""
                                }`}
                                aria-current="page"
                            >
                                Market
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/profile"
                                className={`text-white hover:text-blue-600 ${
                                    pathname === "/profile"
                                        ? "text-blue-600"
                                        : ""
                                }`}
                            >
                                Profile
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
