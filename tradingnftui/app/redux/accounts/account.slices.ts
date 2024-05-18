import { IWalletInfo } from "@/app/_types_";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";

export interface AccountState {
    wallet?: IWalletInfo;
    web3Provider?: ethers.providers.Web3Provider;
}

const initialState: AccountState = {};

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setWeb3Provider: (state, action: PayloadAction<ethers.providers.Web3Provider>) => {
            state.web3Provider = action.payload;
        },

        setWalletInfo: (state, action: PayloadAction<IWalletInfo>) => {
            state.wallet = action.payload;  
        }
    }
})

export const { setWeb3Provider, setWalletInfo } = accountSlice.actions;
export default accountSlice.reducer;