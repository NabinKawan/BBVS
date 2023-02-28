import React, { useContext, useEffect, useRef, useState } from 'react';
import CandidateContext from '../../../context/candidate/CandidateContext';
import { CandidateContextDto } from '../../../models/dto/ContextDtos';
import { CandidateDto } from '../../../models/dto/ServerOpDtos';
import AddCandidateForm from '../forms/AddCandidateForm';
import CandidateCard from '../cards/CandidateCard';
import { motion } from 'framer-motion';

export default function AddCandidates() {
  // const [candidates, setCandidates] = useState<CandidateDto[]>([]);
  // @ts-ignore already used dto to handle
  const adminProvider = useContext(CandidateContext) as CandidateContextDto;

  return (
    <div className="flex flex-col">
      {/* title */}
      <p className="font-medium text-[#575353] text-lg ">Add Candidates</p>

      {/* container card */}
      <div className="flex flex-col bg-white rounded-xl shadow-md mt-20 px-11 pt-7">
        <p className="font-bold text-lg text-black">Add Candidates Information</p>

        {/* form */}
        <AddCandidateForm />
        {/* candidate list */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 32 }}
          exit={{ opacity: 0, y: -32 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col divide-y-2 divide-gray-50 mt-10"
        >
          {/* candidate card */}
          {adminProvider.candidates.map((e: CandidateDto) => (
            <CandidateCard key={e.candidate_id} candidate={e} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
