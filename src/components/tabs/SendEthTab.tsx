import { ChangeEvent, useState } from 'react';
import {
  Button,
  Paper,
  TextField,
  Typography,
  Alert,
  IconButton,
  Collapse,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useWeb3Transfer } from 'react-moralis';
import { Moralis } from 'moralis';

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
    <>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Something went wrong
        </Alert>
      </Collapse>
      <Typography>
        <b>Send ETH</b>
      </Typography>
      <Typography variant="caption"> Amount of eth</Typography>
      <Paper sx={{ mt: 4, display: 'flex' }} elevation={3}>
        <TextField
          type="number"
          sx={{ m: 4 }}
          value={amount}
          variant="standard"
        />
        <Button
          sx={{ m: 4 }}
          color="secondary"
          variant="contained"
          onClick={() => handleClick(-1)}
        >
          -
        </Button>
        <Button
          sx={{ m: 4 }}
          variant="contained"
          onClick={() => handleClick(1)}
        >
          +
        </Button>
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
      </Paper>
    </>
  );
}

export default SendEthTab;
