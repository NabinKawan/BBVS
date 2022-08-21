import React, { useEffect, useState, useContext } from 'react';
import { candidates, posts } from '../../../dummy/data';
import { CandidateDto, VoterDto } from '../../../models/dto/ServerOpDtos';
import { CandidateContextDto, VoterContextDto } from '../../../models/dto/ContextDtos';
import CandidateContext from '../../../context/candidate/CandidateContext';
import ServerOp from '../../../services/ServerOp';
import CandidateCard from '../cards/CandidateCard';
import VotingContext from '../../../context/voting/VotingContext';
import VoterCard from '../cards/VoterCard';
import VoterContext from '../../../context/voter/VoterContext';

export default function VotersDetails() {
  // @ts-ignore
  const voterProvider = useContext(VoterContext) as VoterContextDto;

  return (
    <div className="flex flex-col">
      {/* title */}
      <p className="font-medium text-[#575353] text-xl ">Voter Details</p>

      {/* container card*/}
      <div className="flex flex-col bg-white rounded-xl shadow-md mt-20">
        <p className="font-bold text-xl py-7 px-11">Voter Details</p>

        {/* candidate list */}
        <div className="flex flex-col divide-y-2 divide-gray-50  px-12">
          {/* candidate card */}
          {voterProvider.voters.map((e: VoterDto) => (
            <VoterCard key={e.voter_id} voter={e} />
          ))}
        </div>
      </div>
    </div>
  );
}
