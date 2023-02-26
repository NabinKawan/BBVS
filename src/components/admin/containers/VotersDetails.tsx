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
      <div className="flex flex-col bg-white rounded-xl shadow-md mt-20">
        <p className="font-bold text-lg pt-7 px-11 text-black">Voter Details</p>
        <div className="px-11">
          <SearchView handleSearch={handleSearch} />
        </div>

        {/* candidate list */}
        <div className="flex flex-col divide-y-2 divide-gray-50  px-12">
          {/* candidate card */}
          {filteredVoters.map((e: VoterDto) => (
            <VoterCard key={e.voter_id} voter={e} />
          ))}
        </div>
      </div>
    </div>
  );
}
