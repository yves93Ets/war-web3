import { SyntheticEvent, useState } from 'react';
import { Box, Tab, Tabs, Button } from '@mui/material';
import TabPanel from 'src/components/common/TabPanel';
import NavBar from 'src/components/common/NavBar';

interface ownProps {
  isAuth: boolean;
  logout: Function;
}

export default function Header({ isAuth, logout }: ownProps) {
  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      {!isAuth ? (
        <>
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
            <Tab></Tab>
          </Tabs>
          <TabPanel value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Button variant="contained" onClick={() => logout()}>
              Logout
            </Button>
          </TabPanel>
        </>
      ) : (
        <NavBar />
      )}
    </Box>
  );
}
