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
import CandidateTabs from '../../candidate-tabs';
import TextInputField from '../TextInputField';
import RoundedIconBtn from '../../../shared/button/RoundedIconBtn';
import { FiSearch } from 'react-icons/fi';
import SearchView from '../../search-view';
import { isEmpty } from '../../../utils/helperUtils';
import { useIsMounted } from '../../../lib/hooks/use-is-mounted';

export default function CandidatesDetails() {
  // const [candidates, setCandidates] = useState<CandidateDto[]>([]);
  // @ts-ignore
  const candidateProvider = useContext(CandidateContext) as CandidateContextDto;
  const isMounted = useIsMounted();
  // @ts-ignore
  const [filteredCandidates, setFilteredCandidates] = useState(candidateProvider.candidates);
  const handleSearch = (searchValue: string) => {
    let candidates = candidateProvider.candidates;
    candidates = candidates.filter((candidate) => {
      const fullName = candidate.first_name + candidate.middle_name + candidate.last_name;
      if (
        candidate.candidate_id.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        fullName.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return candidate;
      }
    });
    setFilteredCandidates([...candidates]);
  };
  useEffect(() => {
    setFilteredCandidates([...candidateProvider.candidates]);
  }, [candidateProvider.candidates]);

  return (
    <div className="flex flex-col">
      {/* title */}
      <p className="font-medium text-[#575353] text-lg ">Candidate Details</p>
      {/* container card*/}
      <div className="flex flex-col bg-white rounded-xl shadow-md mt-20 px-6 md:px-12">
        <p className="font-bold text-lg pt-7  text-black">Candidate Details</p>
        <SearchView handleSearch={handleSearch} />
        <CandidateTabs candidates={filteredCandidates} />
        {isEmpty(filteredCandidates) && (
          <div className="flex items-center mt-3 mb-4 space-x-4">
            <img className="h-10 " src="/images/record-not-found.png" />
            <p className="text-gray-700">No candidates found</p>
          </div>
        )}
      </div>
    </div>
  );
}
