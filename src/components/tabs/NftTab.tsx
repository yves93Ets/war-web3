import { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { useMoralis, useNFTBalances } from 'react-moralis';
import { getBalanceOptions } from 'utils/functions';
import { Nfts } from 'utils/types';
import { NFT_LIST } from 'utils/constants';
import { TabContainer } from 'src/components/common';
import Image from 'next/image';
import styles from 'styles/Header.module.css';

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
              <Stack p={2} direction="row">
                <Image
                  className={styles.rounded}
                  alt={nft.token_uri}
                  width={50}
                  height={50}
                  src={nft.image}
                />
                <Typography>{nft.token_uri}</Typography>
              </Stack>
            )}
          </Box>
        ))}
    </TabContainer>
  );
}

export default NftTab;
