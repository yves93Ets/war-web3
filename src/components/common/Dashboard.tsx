import { CardMedia, Card, Box, Button, Container } from '@mui/material/';
import { VpnKey } from '@mui/icons-material';
import { useMoralis } from 'react-moralis';

export default function Dashboard() {
  const { authenticate } = useMoralis();
  const handleLogin = () => {
    authenticate({ signingMessage: 'Sign in to A wars' });
  };
  return (
    <Container maxWidth="sm">
      <Card sx={{ display: 'flex', margin: 6, width: 'fit-content' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pl: 4,
            pr: 4,
          }}
        >
          <Button
            onClick={handleLogin}
            color="secondary"
            variant="contained"
            startIcon={<VpnKey />}
          >
            Logged in
          </Button>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="/avengers.jpg"
          alt="Live from space album cover"
        />
      </Card>
    </Container>
  );
}
