import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AdminState from '../context/admin/AdminState';
import VotingState from '../context/voting/VotingState';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AdminState>
      <VotingState>
        <Component {...pageProps} />
      </VotingState>
    </AdminState>
  );
}

export default MyApp;
