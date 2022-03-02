import { SyntheticEvent, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import {
  TabItemPanel,
  ProfileTab,
  BalanceTab,
  TransactionsTab,
  NftTab,
  SendEthTab,
} from 'src/components/tabs';
import { TAB_TITLE_LIST } from 'utils/constants';
import { useMoralis } from 'react-moralis';

export default function Dashboard() {
  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { user } = useMoralis();

  const tabList = [
    <ProfileTab user={user} key="0" />,
    <BalanceTab key="1" />,
    <TransactionsTab key="2" />,
    <NftTab key="3" />,
    <SendEthTab key="4" />,
  ];

  return (
    <Box sx={{ alignSelf: 'flex-start' }}>
      <>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          onChange={handleChange}
          value={value}
          selectionFollowsFocus
        >
          {TAB_TITLE_LIST.map((title) => {
            return <Tab key={title} label={title} />;
          })}
        </Tabs>
        {tabList.map((tab, i) => (
          <TabItemPanel key={i} value={value} index={i}>
            {tab}
          </TabItemPanel>
        ))}
      </>
    </Box>
  );
}
