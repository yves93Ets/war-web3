import { useEffect, useState } from 'react';
import { Paper, Typography, Link, Divider, Box } from '@mui/material';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { getBalanceOptions } from 'utils/functions';
import { TransactionResult, Transactions } from 'utils/types';
import { BASE_URL } from 'utils/constants';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
function TransactionsTab() {
  const { user } = useMoralis();
  const Web3API = useMoralisWeb3Api();
  const [transactions, setTransactions] = useState<Transactions>([]);
  const balanceOptions = getBalanceOptions(user);
  const fetchUserTransactions = async () => {
    const data = (await Web3API.account
      .getTransactions({ ...balanceOptions, limit: 5 })
      .catch((err) => console.error(err))) as TransactionResult;
    if (data && data.result) {
      setTransactions(data.result as Transactions);
    }
  };

  useEffect(() => {
    fetchUserTransactions();
  }, []);
  return (
    <Paper sx={{ mt: 4, display: 'flex' }} elevation={3}>
      <Typography variant="h4" mb="4" width="100%">
        My last 5 transactions
      </Typography>
      <Box width="100%">
        {transactions.map((trx) => {
          return (
            <div key={trx.hash}>
              <Link href={`${BASE_URL}${trx.hash}`}>
                <OpenInNewIcon fontSize="small" />
                {trx.hash}
              </Link>
              <Divider />
            </div>
          );
        })}
      </Box>
    </Paper>
  );
}

export default TransactionsTab;
