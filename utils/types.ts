interface IUser {
  getUsername: Function;
  get: Function;
  id: string;
}

export type MoralisUser = IUser | null;

export interface BalanceResult {
  balance: string;
}

export interface MoralisResult {
  total: number;
  page: number;
  page_size: number;
  result: Transactions | Nfts;
}

export type Transactions = Transaction[];

export interface Transaction {
  gas: string;
  hash: string;
}

export type Nfts = Nft[];

export interface Nft {
  image: string;
  name: string;
  token_uri: string;
}

export interface Token {
  balance: string;
  symbol: string;
}
