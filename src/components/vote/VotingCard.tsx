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
  candidate.image =
    candidate.image !== ''
      ? candidate.image.includes('http://')
        ? candidate.image
        : `http://${candidate.image}`
      : '';
  return (
    <div
      onClick={onClick}
      className={`relative w-[177x] h-[230px] p-8  bg-white cursor-pointer border border-[#DCDCDC] rounded-xl  font-sans ${
        isSelected && 'shadow-md shadow-blue-100 border border-primary'
      }`}
    >
      <div className={`flex flex-col items-center justify-center space-y-7`}>
        <img
          className="rounded-full w-24 h-24"
          src={candidate.image === '' ? 'images/noprofile.png' : candidate.image}
          style={{ objectFit: 'cover' }}
        />
        <div className="flex w-[150px]  overflow-x-clip flex-col items-center space-y-1">
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
