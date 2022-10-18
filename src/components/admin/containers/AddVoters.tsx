import React, { useContext, useEffect, useRef, useState } from 'react';
import CandidateContext from '../../../context/candidate/CandidateContext';
import VoterContext from '../../../context/voter/VoterContext';
import { CandidateContextDto, VoterContextDto } from '../../../models/dto/ContextDtos';
import { CandidateDto, VoterDto } from '../../../models/dto/ServerOpDtos';
import AddCandidateForm from '../forms/AddCandidateForm';
import AddVoterForm from '../forms/AddVoterForm';
import CandidateCard from '../cards/CandidateCard';
import EditVoterForm from '../forms/EditVoterForm';
import EditvoterForm from '../forms/EditVoterForm';
import VoterCard from '../cards/VoterCard';

export default function AddVoters() {
  // const [candidates, setCandidates] = useState<CandidateDto[]>([]);
  // @ts-ignore already used dto to handle
  const voterProvider = useContext(VoterContext) as VoterContextDto;
  console.log('add candidate');

  return (
    <div className="flex flex-col">
      {/* title */}
      <p className="font-medium text-[#575353] text-lg ">Add Voters</p>

      {/* container card */}
      <div className="flex flex-col bg-white rounded-xl shadow-md mt-20 px-11 py-7">
        <p className="font-bold text-lg text-black">Add Voters Information</p>

        {/* form */}
        <AddVoterForm />
        {/* candidate list */}
        <div className="flex flex-col divide-y-2 divide-gray-50 mt-4">
          {/* candidate card */}
          {voterProvider.voters.map((e: VoterDto) => (
            <VoterCard key={e.voter_id} voter={e} />
          ))}
        </div>
      </div>
    </div>
  );
}
