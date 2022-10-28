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
import { CandidateDto, VoterDto } from '../models/dto/ServerOpDtos';
import ContractService from '../services/ContractService';
import { ContractCandidateDto } from '../models/dto/ContractDtos';

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
        // ServerOp.getAllCandidates(value.access_token).then((value) => {
        //   if (value) {
        //     if (value !== 'unauthorized') {
        //       candidateProvider.setPosts([...value.posts]);
        //       candidateProvider.setCandidates([...value.content]);
        //       console.log(value.content);
        //     } else {
        //       CachService.deleteCache(CachNamesEnum.Voter).then((value) => {
        //         if (value) {
        //           Router.push('/login');
        //         }
        //       });
        //     }
        //   }
        // });

        // fetching voter profile
        ServerOp.getVoter(value.user_id, value.access_token).then((value: VoterDto | any) => {
          if (value) {
            if (value !== 'unauthorized') {
              console.log({ value });
              votingProvider.setVoter({ ...value[0] });
              ContractService.getCandidateList().then((candidates) => {
                if (candidates) {
                  const posts: string[] = [];
                  const formatedCandidates: CandidateDto[] = [];
                  console.log({ candidates });
                  candidates.forEach((candidate: ContractCandidateDto) => {
                    console.log(candidate);
                    const names = candidate.name.split(' ');
                    const candidate_: CandidateDto = {
                      candidate_id: '',
                      first_name: '',
                      middle_name: '',
                      last_name: '',
                      post: '',
                      image: '',
                    };
                    console.log(candidate.name);
                    console.log(candidate.post);
                    posts.push(candidate.post);

                    if (names.length === 2) {
                      candidate_.first_name = names[0];
                      candidate_.last_name = names[1];
                    } else if (names.length > 2) {
                      candidate_.first_name = names[0];
                      candidate_.middle_name = names[1];
                      candidate_.last_name = names[2];
                    }
                    candidate_.post = candidate.post;
                    candidate_.candidate_id = candidate.candidateId;
                    candidate_.image = candidate.imageUrl;
                    formatedCandidates.push(candidate_);
                  });
                  const postsSet = new Set(posts);
                  const posts_ = Array.from(postsSet);
                  candidateProvider.setPosts([...posts_]);
                  candidateProvider.setCandidates([...formatedCandidates]);
                }
              });
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
