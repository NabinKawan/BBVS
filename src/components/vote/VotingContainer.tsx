import React, { useContext, useEffect } from 'react';
import { candidates, posts } from '../../dummy/data';
import VotingCard from './VotingCard';
import VotingContext from '../../context/voting/VotingContext';
import CandidateContext from '../../context/candidate/CandidateContext';
import { VotingContextDto, CandidateContextDto } from '../../models/dto/ContextDtos';
import ServerOp from '../../services/ServerOp';
import { CandidateDto } from '../../models/dto/ServerOpDtos';
import DrawerButton from '../ui/drawer-button';
import RoundedTextBtn from '../../shared/button/RoundedTextBtn';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function VotingContainer() {
  // @ts-ignore
  const votingProvider = useContext(VotingContext) as VotingContextDto;

  // @ts-ignore
  const candidateProvider = useContext(CandidateContext) as CandidateContextDto;

  console.log(Object.values(votingProvider.votes));
  console.log('voting container');

  return (
    <div className="w-full  h-screen overflow-y-auto bg-AdminBg px-16 py-8">
      <DrawerButton drawerType="VOTING" />
      <div className="w-full h-screen bg-AdminBg ">
        {/* title */}
        <div className=" font-medium text-[#575353] text-lg ">Class Election </div>
        <div className="flex justify-between my-12 -ml-1">
          <div className="flex text-gray-700 font-medium space-x-2 ">
            <IoIosArrowBack size={24} /> <p>Previous</p>
          </div>
          <div className="flex text-gray-700 font-medium space-x-2">
            <p>Next</p> <IoIosArrowForward size={24} />
          </div>
        </div>
        <div className="flex flex-col mb-20 divide-y-2 divide-gray-200">
          {candidateProvider.posts.map((post) => (
            <div key={post} className="flex flex-col pb-32">
              <div className="flex flex-col ">
                <p className="font-bold text-xl text-black">{`Vote for ${post}`}</p>
                <p className="font-medium text-sm text-[#717171] mt-2">{`Choose your ${post}?`}</p>
                <div className="w-28 mt-8">
                  <RoundedTextBtn
                    text={'No Vote'}
                    // loading={loading}
                    bgColor={'bg-red-300 '}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-8 mt-8">
                {
                  // @ts-ignore
                  candidateProvider.candidates.map(
                    (e: CandidateDto) =>
                      e.post === post && (
                        <VotingCard
                          key={e.candidate_id}
                          candidate={e}
                          isSelected={Object.values(votingProvider.votes).includes(e.candidate_id)}
                          onClick={() => {
                            votingProvider.addVote(post, e.candidate_id);
                            votingProvider.addStep(post);
                          }}
                        />
                      ),
                  )
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
