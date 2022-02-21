import { MoralisUser } from './types';

export const getBalanceOptions = (user: MoralisUser) => {
  return { chain: 'rinkeby' as 'rinkeby', address: user?.get('ethAddress') };
};
