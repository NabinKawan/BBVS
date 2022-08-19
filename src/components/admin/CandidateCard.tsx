import Dialog from '@mui/material/Dialog';
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import RoundedIconBtn from '../../shared/button/RoundedIconBtn';
import RoundedTextBtn from '../../shared/button/RoundedTextBtn';
import TextInputField from './TextInputField';

interface CandidateCardProps {
  fName: string;
  lName: string;
  id: string;
  post: string;
  image: string;
}

export default function CandidateCard({ fName, lName, id, post, image }: CandidateCardProps) {
  const [showDialog, setShowDialog] = useState(false);
  const handleEdit = () => {
    setShowDialog(!showDialog);
  };

  return (
    <div className="flex items-center justify-between py-4">
      {/* profile details */}
      <div className="flex  space-x-4">
        <div className="flex flex-col items-center">
          <img className="rounded-full" height={60} width={60} src={image} />
          <p className="font-medium text-sm text-green-500">{post}</p>
        </div>

        <div className="flex flex-col space-y-1 pt-2">
          <p className="font-medium text-lg">
            {fName} {lName}
          </p>
          <p className="font-medium text-sm text-[#686868]">{id}</p>
        </div>
      </div>

      {/* edit delete buttons */}
      <div className="flex space-x-4 text-white font-bold text-base ">
        {/* edit dialog */}
        <Dialog
          className="font-sans w-screen"
          PaperProps={{
            style: { borderRadius: 12 },
          }}
          open={showDialog}
          onClose={() => {
            setShowDialog(!showDialog);
          }}
        >
          <DialogContent>
            <div className="flex flex-col items-start space-y-8">
              {/* upload profile */}
              <div className="flex flex-col items-center space-y-2">
                <img className="rounded-full" width={100} height={100} src={image} />
                <p className="font-medium text-[#424040] text-sm">Edit photo</p>
              </div>

              {/* textfields */}
              <div className="flex flex-col items-start space-y-8">
                <div className="flex space-x-10">
                  <TextInputField title={'First Name'} isRequired={true} placeHolder={fName} />
                  <TextInputField title={'Last Name'} isRequired={true} placeHolder={lName} />
                </div>

                <div className="flex space-x-10">
                  <TextInputField title={'CRN'} isRequired={true} placeHolder={id} />
                  <TextInputField title={'POST'} isRequired={true} placeHolder={post} />
                </div>
              </div>
              <div className="w-full h-11">
                <RoundedTextBtn text={'DONE'} bgColor={'bg-primary'} />
              </div>
            </div>
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
          bgColor={'bg-removeBtn'}
          text={'Remove'}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
