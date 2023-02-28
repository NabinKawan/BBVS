import React, { useContext, useEffect, useRef, useState } from 'react';
import CandidateContext from '../../../context/candidate/CandidateContext';
import VoterContext from '../../../context/voter/VoterContext';
import { CandidateContextDto, VoterContextDto } from '../../../models/dto/ContextDtos';
import { CandidateDto, VoterDto } from '../../../models/dto/ServerOpDtos';
import AddCandidateForm from '../forms/AddCandidateForm';
import AddVoterForm from '../forms/AddVoterForm';
import CandidateCard from '../cards/CandidateCard';
import VoterCard from '../cards/VoterCard';
import { motion } from 'framer-motion';

export default function AddVoters() {
  // const [candidates, setCandidates] = useState<CandidateDto[]>([]);
  // @ts-ignore already used dto to handle
  const voterProvider = useContext(VoterContext) as VoterContextDto;

  return (
    <div className="flex flex-col">
      {/* title */}
      <p className="font-medium text-[#575353] text-lg ">Add Voters</p>

      {/* container card */}
      <div className="flex flex-col bg-white rounded-xl shadow-md mt-20 px-11 pt-7">
        <p className="font-bold text-lg text-black">Add Voters Information</p>

        {/* form */}
        <AddVoterForm />
        {/* candidate list */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 32 }}
          exit={{ opacity: 0, y: -32 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col divide-y-2 divide-gray-50 mt-10"
        >
          {/* candidate card */}
          {voterProvider.voters.map((e: VoterDto) => (
            <VoterCard key={e.voter_id} voter={e} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
