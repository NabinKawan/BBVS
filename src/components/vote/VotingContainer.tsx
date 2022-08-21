import React, { useContext, useEffect } from 'react';
import { candidates, posts } from '../../dummy/data';
import VotingCard from './VotingCard';
import VotingContext from '../../context/voting/VotingContext';
import CandidateContext from '../../context/candidate/CandidateContext';
import { VotingContextDto, CandidateContextDto } from '../../models/dto/ContextDtos';
import ServerOp from '../../services/ServerOp';
import { CandidateDto } from '../../models/dto/ServerOpDtos';

export default function VotingContainer() {
  // @ts-ignore
  const votingProvider = useContext(VotingContext) as VotingContextDto;

  // @ts-ignore
  const candidateProvider = useContext(CandidateContext) as CandidateContextDto;

  console.log(Object.values(votingProvider.votes));
  console.log('voting container');

  return (
    <div className="w-3/4 h-screen bg-AdminBg py-8 px-20  overflow-y-scroll">
      {/* title */}
      <div className="font-medium text-[#575353] text-xl ">Class Election</div>

      <div className="flex flex-col mb-20 divide-y-2 divide-gray-200">
        {candidateProvider.posts.map((post) => (
          <div key={post} className="flex flex-col py-20">
            <div className="flex flex-col space-y-2">
              <p className="font-bold text-2xl">{`Vote for ${post}`}</p>
              <p className="font-medium text-base text-[#717171]">{`Choose your ${post}?`}</p>
            </div>

            <div className="flex flex-wrap space-x-14 mt-20">
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
  );
}
