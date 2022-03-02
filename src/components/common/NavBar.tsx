import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import styles from 'styles/Header.module.css';
import { useMoralis } from 'react-moralis';
import Link from 'next/link';
import Image from 'next/image';
const pages = ['home', 'stats', 'tutorial'];

const NavBar = () => {
  const { user, logout, isLoggingOut, isAuthenticated } = useMoralis();
  const btnSx = { my: 2, color: 'white', display: 'block' };
  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Image
              className={styles.rounded}
              src="/A.jpg"
              alt="spider man and iron man"
              width={50}
              height={50}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page} sx={btnSx}>
                <Link href={`/${page}`}>
                  <a>{page}</a>
                </Link>
              </Button>
            ))}
          </Box>
          {isAuthenticated && (
            <Box sx={{ flexGrow: 0, display: 'flex' }}>
              <IconButton sx={{ p: 0 }}>
                <Typography color="white" sx={{ fontWeight: 600, mr: 2 }}>
                  {user?.attributes.username}
                </Typography>
                <Avatar alt="Remy Sharp" src="/logo.jpg" />
              </IconButton>
              <Button
                disabled={isLoggingOut}
                sx={btnSx}
                onClick={() => logout()}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
