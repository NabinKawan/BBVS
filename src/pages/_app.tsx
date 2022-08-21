import '../styles/globals.css';
import type { AppProps } from 'next/app';
import CandidateState from '../context/candidate/CandidateState';
import VotingState from '../context/voting/VotingState';
import AdminState from '../context/admin/AdminState';
import VoterState from '../context/voter/VoterState';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CandidateState>
      <AdminState>
        <VotingState>
          <VoterState>
            <Component {...pageProps} />
          </VoterState>
        </VotingState>
      </AdminState>
    </CandidateState>
  );
}

export default MyApp;
