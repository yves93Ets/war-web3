import { ReactNode, useEffect } from 'react';
import Navbar from './Header';
import Footer from './Footer';
import { useMoralis } from 'react-moralis';
import { useRouter } from 'next/router';

interface ownProps {
  children: ReactNode;
}

export default function Layout({ children }: ownProps) {
  const { isUnauthenticated, logout } = useMoralis();
  const router = useRouter();
  const needsToAuth = isUnauthenticated && router.pathname !== '/';
  useEffect(() => {
    if (needsToAuth) {
      router.push('/');
    }
  });

  return (
    <>
      <Navbar isAuth={!isUnauthenticated} logout={logout} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
