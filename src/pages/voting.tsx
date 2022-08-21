import React, { useEffect, useState, useContext } from 'react';
import { candidates } from '../dummy/data';
import Router from 'next/router';
import VotingContainer from '../components/vote/VotingContainer';
import VotingMenu from '../components/vote/VotingMenu';
import Swal from 'sweetalert2';
import 'animate.css';
import CachService from '../services/CacheService';
import { CachNamesEnum } from '../models/enums/CacheEnums';
import VotingContext from '../context/voting/VotingContext';
import { CandidateContextDto, VoterContextDto, VotingContextDto } from '../models/dto/ContextDtos';
import VoterContext from '../context/voter/VoterContext';
import ServerOp from '../services/ServerOp';
import CandidateContext from '../context/candidate/CandidateContext';
import { VoterDto } from '../models/dto/ServerOpDtos';

export default function Voting() {
  // @ts-ignore
  const votingProvider = useContext(VotingContext) as VotingContextDto;
  //@ts-ignore
  const candidateProvider = useContext(CandidateContext) as CandidateContextDto;

  useEffect(() => {
    CachService.getCacheData(CachNamesEnum.Voter).then((value) => {
      if (value) {
        votingProvider.setAccessToken(value.access_token);

        // fetching candidates datas
        ServerOp.getAllCandidates(value.access_token).then((value) => {
          if (value) {
            if (value !== 'unauthorized') {
              candidateProvider.setPosts([...value.posts]);
              candidateProvider.setCandidates([...value.content]);
              console.log(value.content);
            } else {
              CachService.deleteCache(CachNamesEnum.Voter).then((value) => {
                if (value) {
                  Router.push('/login');
                }
              });
            }
          }
        });

        // fetching voter profile
        ServerOp.getVoter(value.user_id, value.access_token).then((value: VoterDto | any) => {
          if (value) {
            if (value !== 'unauthorized') {
              console.log({ value });
              votingProvider.setVoter({ ...value[0] });
            } else {
              CachService.deleteCache(CachNamesEnum.Voter).then((value) => {
                if (value) {
                  Router.push('/login');
                }
              });
            }
          }
        });
      } else {
        Router.push('/login');
      }
    });
  }, []);
  return (
    votingProvider.accessToken !== '' && (
      <div className="flex h-screen w-screen font-sans bg-AdminBg">
        <VotingMenu />
        <VotingContainer />
      </div>
    )
  );
}
