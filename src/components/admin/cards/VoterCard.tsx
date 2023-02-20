import Dialog from '@mui/material/Dialog';
import React, { useState, useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { DialogContent } from '@mui/material';
import RoundedIconBtn from '../../../shared/button/RoundedIconBtn';
import { VoterDto } from '../../../models/dto/ServerOpDtos';
import ServerOp from '../../../services/ServerOp';
import CandidateContext from '../../../context/candidate/CandidateContext';
import {
  AdminContextDto,
  CandidateContextDto,
  VoterContextDto,
} from '../../../models/dto/ContextDtos';
import VoterContext from '../../../context/voter/VoterContext';
import AdminContext from '../../../context/admin/AdminContext';
import { useDialog } from '../../dialog-view.tsx/context';

interface VoterCardProps {
  voter: VoterDto;
}

export default function VoterCard({ voter }: VoterCardProps) {
  console.log(voter.image);
  const { openDialog } = useDialog();
  const [loading, setLoading] = useState(false);

  // @ts-ignore managed by using dto
  const voterProvider = useContext(VoterContext) as VoterContextDto;
  //@ts-ignore
  const adminProvider = useContext(AdminContext) as AdminContextDto;
  const handleEdit = () => {
    openDialog('EDIT_VOTER_VIEW', { voter });
  };

  const handleDelete = () => {
    setLoading(true);
    ServerOp.deleteCandidate(voter.voter_id, adminProvider.accessToken).then((value) => {
      if (value) {
        const voters = voterProvider.voters;

        const index = voters.findIndex((e) => e.voter_id === voter.voter_id);
        if (index > -1) {
          // only splice array when item is found
          voters.splice(index, 1); // 2nd parameter means remove one item only
          voterProvider.setVoters([...voters]);
        }
        setLoading(false);
      }
    });
  };

  return (
    <div className="flex items-center justify-between py-4">
      {/* profile details */}
      <div className="flex  space-x-4">
        <div className="flex flex-col items-center">
          <img
            className="rounded-full"
            style={{ objectFit: 'cover', height: 60, width: 60 }}
            src={voter.image === '' ? 'images/noprofile.png' : voter.image}
          />
        </div>

        <div className="flex flex-col space-y-1 pt-2">
          <p className="font-medium text-base text-black">
            {voter.first_name} {voter.middle_name} {voter.last_name}
          </p>
          <p className="font-medium text-sm text-[#686868]">{voter.voter_id}</p>
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
        <RoundedIconBtn
          icon={<MdDelete size={20} />}
          loading={loading}
          bgColor={'bg-removeBtn'}
          text={'Remove'}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}
