import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useMoralis, useMoralisWeb3Api, useERC20Balances } from 'react-moralis';
import { Moralis } from 'moralis';
import { BalanceResult, Token } from 'utils/types';
import { getBalanceOptions } from 'utils/functions';
import { TabContainer, TokenLabel } from 'src/components/common';

const FromWei = Moralis.Units.FromWei;

function BalanceTab() {
  const { Web3API } = useMoralisWeb3Api();
  const { fetchERC20Balances, data: tokens } = useERC20Balances();
  const { user } = useMoralis();
  const [ethBalance, setethBalance] = useState('0');
  const balanceOptions = getBalanceOptions(user);

  const fetchNativeBalance = async () => {
    const result = (await Web3API.account
      .getNativeBalance(balanceOptions)
      .catch((err) => console.error(err))) as BalanceResult;
    if (result.balance) {
      setethBalance(FromWei(result.balance));
    }
  };

  useEffect(() => {
    fetchNativeBalance();
    fetchERC20Balances({ params: balanceOptions });
  }, []);

  return (
    <TabContainer>
      <Typography>ERC20 Tokens</Typography>
      <Box p={2}>
        <TokenLabel balance={ethBalance} symbol={'Eth'} />
        {tokens &&
          tokens.map((token) => (
            <TokenLabel
              key={token.symbol}
              balance={FromWei(token.balance)}
              symbol={token.symbol}
            />
          ))}
      </Box>
    </TabContainer>
  );
}

export default BalanceTab;
