import Navbar from './Navbar';
import Footer from './Footer';
import { useMoralis } from 'react-moralis';

interface ownProps {
  children: React.ReactNode;
}
export default function Layout({ children }: ownProps) {
  const { isAuthUndefined } = useMoralis();
  // if (!isAuthUndefined)
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/',
  //     },
  //   };
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
