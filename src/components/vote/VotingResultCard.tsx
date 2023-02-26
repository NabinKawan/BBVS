import Dialog from '@mui/material/Dialog';
import React, { useState, useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { DialogContent } from '@mui/material';
import { CandidateDto } from '../../models/dto/ServerOpDtos';
import RoundedIconBtn from '../../shared/button/RoundedIconBtn';
import { CandidateContextDto } from '../../models/dto/ContextDtos';
import CandidateContext from '../../context/candidate/CandidateContext';
import AdminContext from '../../context/admin/AdminContext';

interface VotingResultCardProps {
  candidate: CandidateDto;
  handleEdit: any;
}

export default function VotingResultCard({ candidate, handleEdit }: VotingResultCardProps) {
  const [loading, setLoading] = useState(false);
  //@ts-ignore
  const candidateProvider = useContext(CandidateContext) as CandidateContextDto;
  //@ts-ignore
  const adminProvider = useContext(AdminContext) as AdminContextDto;

  return (
    <div className="flex items-center justify-between py-6 px-6 md:px-10 rounded-md bg-white">
      {/* profile details */}
      <div className="flex items-center">
        <div className="flex flex-col items-center mr-4">
          <img
            className="rounded-full"
            style={{ objectFit: 'cover', height: 60, width: 60 }}
            src={candidate.image === '' ? 'images/noprofile.png' : `${candidate.image}`}
          />
        </div>

        <div className="flex flex-col justify-center space-y-1 pt-2">
          <p className="font-medium text-base text-black">
            {candidate.first_name} {candidate.middle_name} {candidate.last_name}
          </p>
          <p className="font-medium text-sm text-[#686868]">{candidate.candidate_id}</p>
        </div>
        <img className="hidden md:block ml-8 w-10 h-10" src="/images/party_sign.png" />
        <p className="hidden md:block font-medium text-sm text-green-500 ml-14">VOTED</p>
      </div>

      {/* edit delete buttons */}
      <div className="flex space-x-4 text-white font-bold text-base ">
        {/* edit dialog */}

        <RoundedIconBtn
          icon={<FaEdit size={20} />}
          bgColor={'bg-editBtn'}
          text={'Edit'}
          onClick={handleEdit}
        />
      </div>
    </div>
  );
}
