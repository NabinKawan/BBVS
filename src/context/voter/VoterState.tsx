import React, { useState, useRef } from 'react';
import VoterContext from './VoterContext';
import { AdminContainerEnum } from '../../models/enums/ContainerEnums';
import { CandidateDto, VoterDto } from '../../models/dto/ServerOpDtos';

interface VoterstateProps {
  children: any;
}

export default function VoterState({ children }: VoterstateProps) {
  const votersRef = useRef([]);
  const [voters, setVoters] = useState<CandidateDto[]>([]);
  const accessTokenRef = useRef('');
  // const [recentlyvoters, setVoters] = useState<CandidateDto[]>([]);

  const addVoterRef = useRef<VoterDto>({
    voter_id: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    image: '',
  });

  const [clearAddVoterRef, setClearAddVoterRef] = useState(false);

  const getAllvoters = () => votersRef.current;

  const removeAllvoters = () => {
    votersRef.current = [];
  };

  const addVoterInfo = (key: string, value: string) => {
    setClearAddVoterRef(false);
    // @ts-ignore
    addVoterRef.current[`${key}`] = value;
  };

  const clearAddVoterInfo = () => {
    addVoterRef.current = {
      voter_id: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      image: '',
    };
    setClearAddVoterRef(true);
  };

  const getAddVoterInfo = () => addVoterRef.current;

  return (
    <VoterContext.Provider
      // @ts-ignore
      value={{
        voters,
        clearAddVoterRef,
        setVoters,
        addVoterInfo,
        getAddVoterInfo,
        clearAddVoterInfo,
      }}
    >
      {children}
    </VoterContext.Provider>
  );
}
