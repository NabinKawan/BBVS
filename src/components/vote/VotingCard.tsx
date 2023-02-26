import React, { useContext, useState } from 'react';
import VotingContext from '../../context/voting/VotingContext';
import { VotingContextDto } from '../../models/dto/ContextDtos';
import { MdCheckCircle } from 'react-icons/md';
import { CandidateDto } from '../../models/dto/ServerOpDtos';

interface VotingCardProps {
  candidate: CandidateDto;
  isSelected: boolean;
  onClick: any;
}

export default function VotingCard({ candidate, isSelected, onClick }: VotingCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative product-box w-[177x] h-[230px] p-8  bg-white cursor-pointer border border-[#DCDCDC] rounded-xl  font-sans ${
        isSelected && 'shadow-2xl shadow-blue-100 border border-primary/60'
      }`}
    >
      <div className={`flex flex-col product-image items-center justify-center space-y-7`}>
        <img
          className="rounded-full w-24 h-24"
          src={candidate.image === '' ? 'images/noprofile.png' : candidate.image}
          style={{ objectFit: 'cover' }}
        />
        <div className="flex w-full overflow-x-clip flex-col items-center space-y-1">
          <p className="flex text-center font-medium text-base leading-tight text-black">
            {`${candidate.first_name} ${candidate.middle_name} ${candidate.last_name}`}
          </p>
          <p className="font-normal text-sm text-[#686868]">{candidate.candidate_id}</p>
        </div>
      </div>
      {isSelected && (
        <MdCheckCircle className="flex absolute right-4 top-4 text-primary" size={25} />
      )}
    </div>
  );
}
