import { ChangeEvent, useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useWeb3Transfer } from 'react-moralis';
import { Moralis } from 'moralis';
import { TabContainer, ErrorAlert } from 'src/components/common';

function SendEthTab() {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState(0);
  const [open, setError] = useState(false);

  const { fetch, isFetching } = useWeb3Transfer({
    amount: Moralis.Units.ETH(amount),
    receiver,
    type: 'native',
  });
  const handleClick = (value: number) => {
    setAmount((amount) => amount + value / 10);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReceiver(e.target.value);
  };
  const handleSend = async () => {
    await Moralis.enableWeb3();
    fetch({
      onSuccess: () => {
        setReceiver('');
      },
      onError: () => setError(true),
    })
      .then()
      .catch((e) => console.error(e));

    setReceiver('');
  };
  return (
    <TabContainer>
      <ErrorAlert open={open} setError={setError} />
      <Typography>
        <b>Send ETH</b>
      </Typography>
      <Typography variant="caption"> Amount of eth</Typography>
      <Stack p={2} spacing={3} direction="row" justifyContent="center">
        <Button
          color="secondary"
          variant="contained"
          disabled={amount <= 0.1}
          onClick={() => handleClick(-1)}
        >
          -
        </Button>
        <TextField type="number" value={amount} variant="standard" />
        <Button variant="contained" onClick={() => handleClick(1)}>
          +
        </Button>
      </Stack>

      <Typography variant="caption"> Send to</Typography>
      <TextField
        sx={{ m: 4 }}
        value={receiver}
        onChange={handleChange}
        label="Eth addresse to send 0xEA674fd..."
        variant="standard"
      />
      <Button
        disabled={isFetching}
        sx={{ m: 4 }}
        color="secondary"
        variant="contained"
        onClick={handleSend}
      >
        send
      </Button>
    </TabContainer>
  );
}

export default SendEthTab;
