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
import environments from '../../configs/environments';

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
    <div className="flex items-center justify-between py-6 px-6 md:px-10 rounded-md bg-white cursor-default">
      {/* profile details */}
      <div className="flex items-center">
        <div className="flex flex-col items-center mr-4">
          {candidate ? (
            <img
              className="rounded-full"
              style={{ objectFit: 'cover', height: 60, width: 60 }}
              src={
                candidate.image === ''
                  ? 'images/noprofile.png'
                  : `${environments.BBVS_API_URL}/${candidate.image}`
              }
            />
          ) : (
            <img
              className="rounded-full"
              style={{ objectFit: 'cover', height: 60, width: 60 }}
              src={'images/no-vote.png'}
            />
          )}
        </div>

        {candidate && (
          <div className="flex flex-col justify-center space-y-1 pt-2 w-52">
            <p className="font-medium text-base text-black">
              {candidate.first_name} {candidate.middle_name} {candidate.last_name}
            </p>
            <p className="font-medium text-sm text-[#686868]">{candidate.candidate_id}</p>
          </div>
        )}
        <div className="flex space-x-8">
          {candidate && candidate.logo && (
            <img
              className="hidden md:block h-8"
              src={`${environments.BBVS_API_URL}/${candidate.logo}`}
            />
          )}
          {!candidate ? (
            <div className="flex w-fit rounded-xl bg-red-100 px-2 py-1 justify-center items-center">
              <p className="font-medium text-sm text-red-500 ">NOT VOTED</p>
            </div>
          ) : (
            <div className="flex w-fit rounded-xl bg-green-100 px-2 py-1 justify-center items-center">
              <p className="font-medium text-sm text-green-500 ">VOTED</p>
            </div>
          )}
        </div>
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
