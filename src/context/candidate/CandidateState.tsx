import React, { useState, useRef } from 'react';
import CandidateContext from './CandidateContext.js';
import { AdminContainerEnum } from '../../models/enums/ContainerEnums';
import { CandidateDto } from '../../models/dto/ServerOpDtos';

interface CandidateStateProps {
  children: any;
}

export default function CandidateState({ children }: CandidateStateProps) {
  const candidatesRef = useRef([]);
  const [candidates, setCandidates] = useState<CandidateDto[]>([]);
  const [posts, setPosts] = useState<string[]>([]);
  // const [recentlycandidates, setCandidates] = useState<CandidateDto[]>([]);

  const addCandidateRef = useRef<CandidateDto>({
    candidate_id: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    post: '',
    image: '',
  });
  const [clearAddCandidateRef, setClearAddCandidateRef] = useState(false);

  const getAllCandidates = () => candidatesRef.current;

  const removeAllCandidates = () => {
    candidatesRef.current = [];
  };

  const addCandidateInfo = (key: string, value: string) => {
    setClearAddCandidateRef(false);
    // @ts-ignore
    addCandidateRef.current[`${key}`] = value;
    // console.log(addCandidateRef.current);
  };

  const clearAddCandidateInfo = () => {
    addCandidateRef.current = {
      candidate_id: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      post: '',
      image: '',
    };
    setClearAddCandidateRef(true);
  };

  const getAddCandidateInfo = () => addCandidateRef.current;

  return (
    <CandidateContext.Provider
      // @ts-ignore
      value={{
        candidates,
        clearAddCandidateRef,
        posts,
        setPosts,
        setCandidates,
        addCandidateInfo,
        getAddCandidateInfo,
        clearAddCandidateInfo,
      }}
    >
      {children}
    </CandidateContext.Provider>
  );
}
