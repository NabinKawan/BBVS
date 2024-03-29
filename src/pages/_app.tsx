import '../styles/globals.css';
import type { AppProps } from 'next/app';
import VoteCount from './voteCount';
import CandidateState from '../context/candidate/CandidateState';
import VotingState from '../context/voting/VotingState';
import AdminState from '../context/admin/AdminState';
import VoterState from '../context/voter/VoterState';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Drawer from '../components/drawer-view/container';
import DialogContainer from '../components/dialog-view.tsx/container';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CandidateState>
      <AdminState>
        <VotingState>
          <VoterState>
            <div>
              <ToastContainer />
              <Drawer />
              <DialogContainer />
              <Component {...pageProps} />
            </div>
          </VoterState>
        </VotingState>
      </AdminState>
    </CandidateState>

  );
}

export default MyApp;
