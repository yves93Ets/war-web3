import { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { useMoralis, useNFTBalances } from 'react-moralis';
import { getBalanceOptions } from 'utils/functions';
import { Nfts } from 'utils/types';
import { NFT_LIST } from 'utils/constants';
import { TabContainer, NFTCard } from 'src/components/common';

function NftTab() {
  const { getNFTBalances, data } = useNFTBalances();
  const { user } = useMoralis();
  const [nfts, setNfts] = useState<Nfts>([]);
  const balanceOptions = getBalanceOptions(user);

  useEffect(() => {
    getNFTBalances({ params: balanceOptions });
    if (data && data.result) {
      setNfts(data.result as Nfts);
      setNfts(NFT_LIST);
    } else {
      setNfts(NFT_LIST);
    }
  }, []);
  return (
    <TabContainer>
      <Typography>My nfts</Typography>
      {nfts &&
        nfts.map((nft) => (
          <Box key={nft.name}>
            {nft.image && (
              <Stack p={2} direction="row" justifyContent="center">
                <NFTCard {...nft} />
              </Stack>
            )}
          </Box>
        ))}
    </TabContainer>
  );
}

export default NftTab;
