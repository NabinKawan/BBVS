import React, { useState } from 'react';
import { VoterDto } from '../../models/dto/ServerOpDtos';
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
      console.log(completedSteps);
    }
  };

  const addVote = (post: string, candidateId: string) => {
    // @ts-ignore
    votes[post] = candidateId;
    console.log(votes);
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
