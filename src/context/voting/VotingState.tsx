import React, { useState } from 'react';
import { CandidateDto, VoterDto } from '../../models/dto/ServerOpDtos';
import VotingContext from './VotingContext';

export default function VotingState({ children }: { children: any }) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [votes, setVotes] = useState({});
  const [state, setState] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [voter, setVoter] = useState<VoterDto>({
    voter_id: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    image: '',
  });

  const addStep = (step: string) => {
    let completedStepsCopy = completedSteps;
    if (!completedStepsCopy.includes(step)) {
      completedStepsCopy.push(step);
      setCompletedSteps(completedStepsCopy);
    }
  };

  const addVote = (post: string, candidate: CandidateDto | null) => {
    // @ts-ignore
    votes[post] = candidate;
    setVotes(votes);
    setState(!state);
  };

  const clearVotes = () => {
    setVotes({});
    setCompletedSteps([]);
  };

  return (
    // @ts-ignore
    <VotingContext.Provider
      // @ts-ignore
      value={{
        completedSteps,
        accessToken,
        votes,
        voter,
        setVoter,
        setAccessToken,
        addVote,
        addStep,
        clearVotes,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
}
