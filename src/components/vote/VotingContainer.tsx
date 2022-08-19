import React, { useContext } from 'react';
import { candidates, posts } from '../../dummy/data';
import VotingCard from './VotingCard';
import VotingContext from '../../context/voting/VotingContext';
import { VotingContextDto } from '../../models/dto/ContextDtos';

export default function VotingContainer() {
  // @ts-ignore
  const votingProvider = useContext(VotingContext) as VotingContextDto;

  console.log(Object.values(votingProvider.votes));
  console.log('voting container');

  return (
    <div className="w-3/4 h-screen bg-AdminBg py-8 px-20  overflow-y-scroll">
      {/* title */}
      <div className="font-medium text-[#575353] text-xl ">Class Election</div>

      <div className="flex flex-col mb-20 divide-y-2 divide-gray-200">
        {posts.map((post) => (
          <div className="flex flex-col py-20">
            <div className="flex flex-col space-y-2">
              <p className="font-bold text-2xl">{`Vote for ${post}`}</p>
              <p className="font-medium text-base text-[#717171]">{`Choose your ${post}?`}</p>
            </div>

            <div className="flex flex-wrap space-x-14 mt-20">
              {
                // @ts-ignore
                candidates[`${post}`].map((e) => (
                  <VotingCard
                    name={e.first_name + ' ' + e.last_name}
                    crn={e.id}
                    image={e.image}
                    isSelected={Object.values(votingProvider.votes).includes(e.crn)}
                    onClick={() => {
                      votingProvider.addVote(post, e.crn);
                      votingProvider.addStep(post);
                    }}
                  />
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
