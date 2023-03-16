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
import { ContractCandidateDto } from '../models/dto/ContractDtos';
import CompilerService from '../services/CompilerService';

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
        //
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
              votingProvider.setVoter({ ...value[0] });
              CompilerService.getCandidateList().then((candidates) => {
                if (candidates) {
                  const posts: string[] = [];
                  const formatedCandidates: CandidateDto[] = [];
                  candidates.forEach((candidate: ContractCandidateDto) => {
                    const names = candidate.name.split(' ');
                    const candidate_: CandidateDto = {
                      candidate_id: '',
                      first_name: '',
                      middle_name: '',
                      last_name: '',
                      post: '',
                      logo: '',
                      image: '',
                    };
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
                    candidate_.logo = candidate.logo;
                    candidate_.candidate_id = candidate.candidate_id;
                    candidate_.image = candidate.image_url;
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
        <VotingMenu className="hidden lg:flex flex-col bg-white drop-shadow-2xl shadow-blue-900 h-screen w-fit p-8" />
        <VotingContainer />
      </div>
    )
  );
}
