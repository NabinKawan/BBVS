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

  const getVotes = () => {
    const votesList = Object.values(votes);
    const votings: string[] = [];
    votesList.map((e: any) => {
      if (e) {
        votings.push(e.candidate_id);
      } else {
        votings.push('');
      }
    });
    return votings;
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
        getVotes,
        clearVotes,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
}
