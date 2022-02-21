interface IUser {
  getUsername: Function;
  get: Function;
  id: string;
}

export type MoralisUser = IUser | null;

export interface BalanceResult {
  balance: string;
}

export interface TransactionResult {
  total: number;
  page: number;
  page_size: number;
  result: Transactions;
}

export type Transactions = Transaction[];

export interface Transaction {
  gas: string;
  hash: string;
}
