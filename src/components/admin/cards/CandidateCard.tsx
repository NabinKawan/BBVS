import Dialog from '@mui/material/Dialog';
import React, { useState, useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { DialogContent } from '@mui/material';
import RoundedIconBtn from '../../../shared/button/RoundedIconBtn';
import EditCandidateForm from '../forms/EditCandidateForm';
import { CandidateDto } from '../../../models/dto/ServerOpDtos';
import ServerOp from '../../../services/ServerOp';
import CandidateContext from '../../../context/candidate/CandidateContext';
import { AdminContextDto, CandidateContextDto } from '../../../models/dto/ContextDtos';
import AdminContext from '../../../context/admin/AdminContext';

interface CandidateCardProps {
  candidate: CandidateDto;
}

export default function CandidateCard({ candidate }: CandidateCardProps) {
  console.log(candidate.image);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  // @ts-ignore managed by using dto
  const candidateProvider = useContext(CandidateContext) as CandidateContextDto;
  // @ts-ignore
  const adminProvider = useContext(AdminContext) as AdminContextDto;
  const handleEdit = () => {
    setShowDialog(!showDialog);
  };

  const handleDelete = () => {
    setLoading(true);
    ServerOp.deleteCandidate(candidate.candidate_id, adminProvider.accessToken).then((value) => {
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
            src={candidate.image === '' ? 'images/noprofile.png' : `http://${candidate.image}`}
          />
          <p className="font-medium text-sm text-green-500">{candidate.post}</p>
        </div>

        <div className="flex flex-col space-y-1 pt-2">
          <p className="font-medium text-base text-black">
            {candidate.first_name} {candidate.middle_name} {candidate.last_name}
          </p>
          <p className="font-medium text-sm text-[#686868]">{candidate.candidate_id}</p>
        </div>
      </div>

      {/* edit delete buttons */}
      <div className="flex space-x-4 text-white font-bold text-base ">
        {/* edit dialog */}
        <Dialog
          className="font-sans"
          PaperProps={{
            style: { borderRadius: 12, minWidth: '1000px' },
          }}
          open={showDialog}
          fullWidth
          onClose={() => {
            setShowDialog(!showDialog);
          }}
        >
          <DialogContent>
            <EditCandidateForm candidate={candidate} setShowDialog={setShowDialog} />
          </DialogContent>
        </Dialog>

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
