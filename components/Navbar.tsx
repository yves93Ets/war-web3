import { SyntheticEvent, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

export default function NavBar() {
  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        textColor="secondary"
        indicatorColor="secondary"
        onChange={handleChange}
        value={value}
        aria-label="Tabs where selection follows focus"
        selectionFollowsFocus
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
      </Tabs>
    </Box>
  );
}
