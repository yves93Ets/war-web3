import { useState, ChangeEvent } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { MoralisUser } from 'utils/types';
import { useMoralis } from 'react-moralis';
import { TabContainer } from 'src/components/common';

interface ownProps {
  user: MoralisUser;
}

function ProfileTab({ user }: ownProps) {
  const { setUserData, isUserUpdating } = useMoralis();
  const [inputValue, setInputValue] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleClick = () => {
    setUserData({ username: inputValue }).then(() => setInputValue(''));
  };

  return (
    <TabContainer>
      <Typography> {user?.getUsername()}</Typography>
      <Typography> {user?.get('ethAddress')}</Typography>
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
    </TabContainer>
  );
}

export default ProfileTab;
