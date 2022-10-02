import React, { useEffect, useState, useContext } from 'react';
import Router from 'next/router';
import { candidates, posts } from '../../../dummy/data';
import { CandidateDto } from '../../../models/dto/ServerOpDtos';
import { AdminContextDto, CandidateContextDto } from '../../../models/dto/ContextDtos';
import CandidateContext from '../../../context/candidate/CandidateContext';
import ServerOp from '../../../services/ServerOp';
import CandidateCard from '../cards/CandidateCard';
import CachService from '../../../services/CacheService';
import { CachNamesEnum } from '../../../models/enums/CacheEnums';
import AdminContext from '../../../context/admin/AdminContext';

export default function CandidatesDetails() {
  // const [candidates, setCandidates] = useState<CandidateDto[]>([]);
  // @ts-ignore
  const candidateProvider = useContext(CandidateContext) as CandidateContextDto;
  // @ts-ignore

  return (
    <div className="flex flex-col">
      {/* title */}
      <p className="font-medium text-[#575353] text-lg ">Candidate Details</p>

      {/* container card*/}
      <div className="flex flex-col bg-white rounded-xl shadow-md mt-20">
        <p className="font-bold text-lg py-7 px-11 text-black">Candidate Details</p>

        {/* filters */}
        {/* <div className="flex space-x-6 bg-[#F6F6F6] py-3 px-12">
          <div className="flex justify-center items-center rounded-full px-4 py-1 text-sm font-medium text-primary bg-menuItemHighlight">
            CR
          </div>

          <div className="flex justify-center items-center rounded-full px-4 py-1 text-sm font-medium text-[#7D7D7D] bg-[#E7E7E7]">
            Vice-CR
          </div>
        </div> */}

        {/* candidate list */}
        <div className="flex flex-col divide-y-2 divide-gray-50  px-12">
          {/* candidate card */}
          {candidateProvider.candidates.map((e: CandidateDto) => (
            <CandidateCard key={e.candidate_id} candidate={e} />
          ))}
        </div>
      </div>
    </div>
  );
}
