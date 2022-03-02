import { Divider, Typography } from '@mui/material';

interface ownProps {
  balance: string;
  symbol: string;
}

export default function TokenLabel({ balance, symbol }: ownProps) {
  return (
    <>
      <Typography key={symbol}>
        {balance}
        <b>&nbsp;{symbol}</b>
      </Typography>
      <Divider />
    </>
  );
}
