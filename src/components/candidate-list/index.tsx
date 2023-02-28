import React from 'react';
import { CandidateDto } from '../../models/dto/ServerOpDtos';
import CandidateCard from '../admin/cards/CandidateCard';

interface ICandidateList {
  candidates: CandidateDto[];
}

export default function CandidateList({ candidates }: ICandidateList) {
  return (
    <div className="flex flex-col divide-y-2 divide-gray-50">
      {candidates.map((e: CandidateDto) => (
        <CandidateCard key={e.candidate_id} candidate={e} />
      ))}
    </div>
  );
}
