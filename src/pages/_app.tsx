// pages/_app.tsx

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import TopBar from '../components/TopBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <TopBar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
