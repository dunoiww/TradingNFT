export interface IWalletInfo {
    address: string;
    balance: number;
}

export interface IMenu {
    name: string;
    url: string;
}

export type ActionType = "LIST" | "UNLIST" | "TRANSFER"

export interface INftItem {
    id: number;
    name?: string;
    description?: string;
    image: string;
    price?: number;
    author?: string;
}