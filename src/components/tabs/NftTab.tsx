import { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useMoralis, useNFTBalances } from 'react-moralis';
import { Moralis } from 'moralis';
import { getBalanceOptions } from 'utils/functions';
import { Nfts } from 'utils/types';
import Image from 'next/image';

const FromWei = Moralis.Units.FromWei;

function NftTab() {
  const { getNFTBalances, data } = useNFTBalances();
  const { user } = useMoralis();
  const [nfts, setNfts] = useState<Nfts>([]);
  const balanceOptions = getBalanceOptions(user);

  useEffect(() => {
    getNFTBalances({ params: balanceOptions });
    if (data && data.result) {
      setNfts(data.result as Nfts);
      setNfts([
        {
          image: 'https://picsum.photos/200/300?grayscale',
          name: 'focas',
          token_uri: 'https://picsum.photos/',
        },
        {
          image: 'https://picsum.photos/seed/picsum/200/300',
          name: 'nieve',
          token_uri: 'https://picsum.photos/',
        },
        {
          image: 'https://picsum.photos/id/237/200/300',
          name: 'perro',
          token_uri: 'https://picsum.photos/',
        },
      ]);
    } else {
      setNfts([
        {
          image: 'https://picsum.photos/200/300?grayscale',
          name: 'focas',
          token_uri: 'https://picsum.photos/',
        },
        {
          image: 'https://picsum.photos/seed/picsum/200/300',
          name: 'nieve',
          token_uri: 'https://picsum.photos/',
        },
        {
          image: 'https://picsum.photos/id/237/200/300',
          name: 'perro',
          token_uri: 'https://picsum.photos/',
        },
      ]);
    }
  }, []);
  return (
    <Paper
      sx={{ mt: 4, display: 'flex', minHeight: 300, flexDirection: 'column' }}
      elevation={3}
    >
      <Typography sx={{ m: 4 }}>My nfts</Typography>

      {nfts &&
        nfts.map((nft) => (
          <Box
            sx={{ m: 2, p: 2, border: 'solid 1px gray', borderRadius: 4 }}
            key={nft.name}
          >
            {nft.image && (
              <Box>
                {/* <Image
                  alt={nft.token_uri}
                  width={50}
                  height={50}
                  src={nft.image}
                /> */}
                <Typography>{nft.token_uri}</Typography>
              </Box>
            )}
          </Box>
        ))}
    </Paper>
  );
}

export default NftTab;
