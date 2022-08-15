import React from 'react';
import CandidateCard from '../CandidateCard';

export default function CandidateDetails() {
  return (
    <div className="flex flex-col">
      {/* title */}
      <p className="font-medium text-[#575353] text-xl ">Candidate Details</p>

      {/* container card*/}
      <div className="flex flex-col bg-white rounded-xl shadow-md mt-20">
        <p className="font-bold text-xl py-7 px-11">Candidate Details</p>

        {/* filters */}
        <div className="flex space-x-6 bg-[#F6F6F6] py-3 px-12">
          <div className="flex justify-center items-center rounded-full px-4 py-1 text-sm font-medium text-primary bg-menuItemHighlight">
            CR
          </div>

          <div className="flex justify-center items-center rounded-full px-4 py-1 text-sm font-medium text-[#7D7D7D] bg-[#E7E7E7]">
            Vice-CR
          </div>
        </div>

        {/* candidate list */}
        <div className="flex flex-col divide-y-2 px-12">
          {/* candidate card */}
          <CandidateCard />
        </div>
      </div>
    </div>
  );
}
