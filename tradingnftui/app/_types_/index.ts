export interface IWalletInfo {
    address: string;
    balance: number;
}

export interface IMenu {
    name: string;
    url: string;
}

export type ActionType = 'LIST' | 'UNLIST' | 'TRANSFER';

export interface IAttribute {
    trait_type: string;
    value: string | number;
}

export interface INftItem {
    id: number;
    name?: string;
    description?: string;
    image: string;
    attributes?: IAttribute[];
    price?: number;
    author?: string;
}

export enum Clarity {
    'A',
    'B',
    'C',
    'D',
    'E',
    'S',
    'SS',
    'SSS',
}
