import Dialog from '@mui/material/Dialog';
import React, { useState, useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { DialogContent } from '@mui/material';
import RoundedIconBtn from '../../../shared/button/RoundedIconBtn';
import { CandidateDto } from '../../../models/dto/ServerOpDtos';
import ServerOp from '../../../services/ServerOp';
import CandidateContext from '../../../context/candidate/CandidateContext';
import { AdminContextDto, CandidateContextDto } from '../../../models/dto/ContextDtos';
import AdminContext from '../../../context/admin/AdminContext';
import { useDialog } from '../../dialog-view.tsx/context';
import Swal from 'sweetalert2';
import environments from '../../../configs/environments';

interface CandidateCardProps {
  candidate: CandidateDto;
}

export default function CandidateCard({ candidate }: CandidateCardProps) {
  const { openDialog } = useDialog();
  const [loading, setLoading] = useState(false);

  // @ts-ignore managed by using dto
  const candidateProvider = useContext(CandidateContext) as CandidateContextDto;
  // @ts-ignore
  const adminProvider = useContext(AdminContext) as AdminContextDto;
  const handleEdit = () => {
    openDialog('EDIT_CANDIDATE_VIEW', { candidate });
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1c4e80',
      cancelButtonColor: '#F76464',
      confirmButtonText: 'Yes, Remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        ServerOp.deleteCandidate(candidate.candidate_id, adminProvider.accessToken).then(
          (value) => {
            if (value) {
              const candidates = candidateProvider.candidates;

              const index = candidates.findIndex((e) => e.candidate_id === candidate.candidate_id);
              if (index > -1) {
                // only splice array when item is found
                candidates.splice(index, 1); // 2nd parameter means remove one item only
                candidateProvider.setCandidates([...candidates]);
              }
              setLoading(false);
            }
          },
        );
      }
    });
  };

  return (
    <div className="flex items-center justify-between py-4">
      {/* profile details */}{' '}
      <div className="flex space-x-8 items-center">
        <div className="relative">
          <img
            className="rounded-full"
            style={{ objectFit: 'cover', height: 60, width: 60 }}
            src={
              candidate.image === ''
                ? 'images/noprofile.png'
                : `${environments.BBVS_API_URL}/${candidate.image}`
            }
          />
          <img
            className="absolute lg:hidden bottom-0 right-0 h-6"
            src={candidate.image === '' ? 'images/party_sign.png' : candidate.logo}
          />
        </div>

        <div className="flex flex-col space-y-2 w-64">
          <p className="font-medium text-base text-black">
            {candidate.first_name} {candidate.middle_name} {candidate.last_name}
          </p>

          <div className="flex flex-col space-x-0 space-y-2 md:flex-row md:space-x-2 md:space-y-1">
            <div className="flex w-fit rounded-xl bg-green-100 px-2 py-1 justify-center items-center">
              <p className="font-medium text-xs text-green-500 ">{candidate.post}</p>
            </div>
            <div className="flex w-fit rounded-xl bg-gray-100 px-2 py-1 justify-center items-center">
              <p className="font-medium text-xs text-[#686868]">{candidate.candidate_id}</p>
            </div>
          </div>
        </div>
        {candidate.logo && (
          <img
            className="hidden lg:block h-8"
            src={`${environments.BBVS_API_URL}/${candidate.logo!}`}
          />
        )}
      </div>
      {/* edit delete buttons */}
      <div className="hidden sm:flex space-x-4 text-white font-bold text-base ">
        {/* edit dialog */}

        <div className="flex  space-x-4">
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
    </div>
  );
}
