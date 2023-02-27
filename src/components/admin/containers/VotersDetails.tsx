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
import SearchView from '../../search-view';
import { isEmpty } from '../../../utils/helperUtils';
import { motion } from 'framer-motion';

export default function VotersDetails() {
  // @ts-ignore
  const voterProvider = useContext(VoterContext) as VoterContextDto;
  const [filteredVoters, setFilteredVoters] = useState(voterProvider.voters);

  const handleSearch = (searchValue: string) => {
    let voters = voterProvider.voters;
    voters = voters.filter((voter) => {
      const fullName = voter.first_name + voter.middle_name + voter.last_name;
      if (
        voter.voter_id.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        fullName.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return voter;
      }
    });
    setFilteredVoters([...voters]);
  };
  return (
    <div className="flex flex-col">
      {/* title */}
      <p className="font-medium text-[#575353] text-lg ">Voter Details</p>

      {/* container card*/}
      <div className="flex flex-col bg-white rounded-xl shadow-md mt-20 px-6 md:px-12">
        <p className="font-bold text-lg pt-7  text-black">Voter Details</p>
        <div>
          <SearchView handleSearch={handleSearch} />
        </div>

        {/* candidate list */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 32 }}
          exit={{ opacity: 0, y: -32 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col divide-y-2 divide-gray-50 mt-6 "
        >
          {/* candidate card */}
          {filteredVoters.map((e: VoterDto) => (
            <VoterCard key={e.voter_id} voter={e} />
          ))}
        </motion.div>

        {isEmpty(filteredVoters) && (
          <div className="flex items-center mb-4 space-x-4 mx-">
            <img className="h-10 " src="/images/record-not-found.png" />
            <p className="text-gray-700">No voters found</p>
          </div>
        )}
      </div>
    </div>
  );
}
