import React, { useContext, useEffect, useRef, useState } from 'react';
import CandidateContext from '../../../context/candidate/CandidateContext';
import { CandidateContextDto } from '../../../models/dto/ContextDtos';
import { CandidateDto } from '../../../models/dto/ServerOpDtos';
import AddCandidateForm from '../forms/AddCandidateForm';
import CandidateCard from '../cards/CandidateCard';

export default function AddCandidates() {
  // const [candidates, setCandidates] = useState<CandidateDto[]>([]);
  // @ts-ignore already used dto to handle
  const adminProvider = useContext(CandidateContext) as CandidateContextDto;
  console.log('add candidate');

  return (
    <div className="flex flex-col">
      {/* title */}
      <p className="font-medium text-[#575353] text-lg ">Add Candidates</p>

      {/* container card */}
      <div className="flex flex-col bg-white rounded-xl shadow-md mt-20 px-11 py-7">
        <p className="font-bold text-lg text-black">Add Candidates Information</p>

        {/* form */}
        <AddCandidateForm />
        {/* candidate list */}
        <div className="flex flex-col divide-y-2 divide-gray-50 mt-4">
          {/* candidate card */}
          {adminProvider.candidates.map((e: CandidateDto) => (
            <CandidateCard key={e.candidate_id} candidate={e} />
          ))}
        </div>
      </div>
    </div>
  );
}
