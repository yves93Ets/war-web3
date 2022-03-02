import Image from 'next/image';
import { Box, Typography, Card, CardContent } from '@mui/material';

interface ownProps {
  token_uri: string;
  image: string;
  name: string;
}

export default function NFTCard({ token_uri, image, name }: ownProps) {
  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {token_uri}
          </Typography>
        </CardContent>
      </Box>
      <Image alt={token_uri} width={90} height={60} src={image} />
    </Card>
  );
}
