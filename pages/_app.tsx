import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MoralisProvider } from 'react-moralis';
import Layout from 'src/components/Layout/Layout';
function MyApp({ Component, pageProps }: AppProps) {
  const appid = process.env.NEXT_PUBLIC_APP_ID || '';
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';
  return (
    <MoralisProvider appId={appid} serverUrl={serverUrl}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MoralisProvider>
  );
}

export default MyApp;
