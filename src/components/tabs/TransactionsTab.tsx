import { useState, ChangeEvent } from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import { MoralisUser } from 'utils/types';
import { useMoralis } from 'react-moralis';

interface ownProps {
  user: MoralisUser;
}

function TransactionsTab({ user }: ownProps) {
  const { setUserData, isUserUpdating } = useMoralis();
  const [inputValue, setInputValue] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleClick = () => {
    setUserData({ username: inputValue }).then(() => setInputValue(''));
  };

  return (
    <>
      <Typography> {user?.getUsername()}</Typography>
      <Typography> {user?.get('ethAddress')}</Typography>
      <Paper sx={{ mt: 4, display: 'flex' }} elevation={3}>
        <TextField
          sx={{ m: 4 }}
          value={inputValue}
          onChange={handleChange}
          label="Set username"
          variant="standard"
        />
        <Button
          disabled={isUserUpdating}
          sx={{ m: 4 }}
          color="secondary"
          variant="contained"
          onClick={handleClick}
        >
          Save
        </Button>
      </Paper>
    </>
  );
}

export default TransactionsTab;
