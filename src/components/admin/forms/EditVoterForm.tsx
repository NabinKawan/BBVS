import React, { useContext, useRef, useState } from 'react';
import AdminContext from '../../../context/admin/AdminContext';
import CandidateContext from '../../../context/candidate/CandidateContext';
import VoterContext from '../../../context/voter/VoterContext';
import {
  AdminContextDto,
  CandidateContextDto,
  VoterContextDto,
} from '../../../models/dto/ContextDtos';
import { CandidateDto, VoterDto } from '../../../models/dto/ServerOpDtos';
import { TextFieldIdEnum } from '../../../models/enums/TextFieldEnums';
import ServerOp from '../../../services/ServerOp';
import RoundedTextBtn from '../../../shared/button/RoundedTextBtn';
import TextInputField from '../TextInputField';

interface EditVoterFormProps {
  voter: VoterDto;
  setShowDialog: any;
}

export default function EditVoterForm({ voter, setShowDialog }: EditVoterFormProps) {
  const [image, setImage] = useState({ img_file: null, img_url: voter.image });
  const fileInput = useRef<HTMLInputElement>(null);

  // @ts-ignore
  const voterProvider = useContext(VoterContext) as VoterContextDto;
  //@ts-ignore
  const adminProvider = useContext(AdminContext) as AdminContextDto;

  const editVoterRef = useRef(voter);

  const editCandidateInfo = (key: string, value: string) => {
    // @ts-ignore
    editVoterRef.current[`${key}`] = value;
    // console.log(addCandidateRef.current);
  };

  const [formErros, setFormErros] = useState({
    voter_id: '',
    first_name: '',
    last_name: '',
    post: '',
  });
  const [loading, setLoading] = useState(false);

  const uploadFileHandler = (event: any) => {
    console.log(event.target.files);
    // @ts-ignore
    // getting file
    fileInput.current.click();
    const img_file = fileInput.current?.files![0];

    if (img_file) {
      // @ts-ignore
      // creates object url
      const img_url = window.URL.createObjectURL(img_file!);

      // adding image into editVoterRef.current
      editCandidateInfo(TextFieldIdEnum.Image, img_url);

      // @ts-ignore becasue changing null value into string value
      setImage({ img_file, img_url });

      console.log(img_url);
    }
  };

  const handleTextInput = (voter_id: string, inputValue: string) => {
    editCandidateInfo(voter_id, inputValue);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault(); // preventing default redirection

    const { voter_id, first_name, middle_name, last_name } = editVoterRef.current;
    const errors = formErros;

    // returns true if no errors
    function hasError(errors: any) {
      const errorsList = Object.values(errors);

      // checks for empty values
      const filteredList = errorsList.filter((item) => item !== '');

      if (filteredList.length === 0) {
        return true;
      } else {
        return false;
      }
    }

    function validateForm() {
      if (voter_id === '') {
        errors.voter_id = 'Candidate ID is required';
      } else {
        errors.voter_id = '';
      }
      if (first_name === '') {
        errors.first_name = 'First Name is required';
      } else {
        errors.first_name = '';
      }
      if (last_name === '') {
        errors.last_name = 'Last Name is required';
      } else {
        errors.last_name = '';
      }
    }

    // checking empty errors
    validateForm();

    // checking for errors after validation
    if (hasError(errors)) {
      setFormErros({ ...errors });
      setLoading(true);

      // upload image and set the url to editVoterRef.current

      image.img_file !== null
        ? ServerOp.uploadImage(image.img_file, adminProvider.accessToken).then((value) => {
            console.log({ value });
            editCandidateInfo(TextFieldIdEnum.Image, value);

            // changing saved post and id values to uppercase
            editCandidateInfo(
              TextFieldIdEnum.CandidateID,
              editVoterRef.current.voter_id.toUpperCase(),
            );

            ServerOp.updateVoter(editVoterRef.current, adminProvider.accessToken).then(
              (response) => {
                if (response) {
                  const voters = voterProvider.voters;

                  const index = voters.findIndex(
                    (e) => e.voter_id === editVoterRef.current.voter_id,
                  );

                  voters[index] = editVoterRef.current;

                  setImage({ ...{ img_file: null, img_url: '' } });
                  voterProvider.setVoters([...voters]);

                  // hide edit form dialog
                  setShowDialog(false);
                } else {
                  ('error');
                  // setLoading(false);
                }
                setLoading(false);
              },
            );
          })
        : ServerOp.updateVoter(editVoterRef.current, adminProvider.accessToken).then((response) => {
            if (response) {
              const voters = voterProvider.voters;

              const index = voters.findIndex((e) => e.voter_id === editVoterRef.current.voter_id);

              voters[index] = editVoterRef.current;

              setImage({ ...{ img_file: null, img_url: '' } });
              voterProvider.setVoters([...voters]);

              // hide edit form dialog
              setShowDialog(false);
            } else {
              ('error');
              // setLoading(false);
            }
            setLoading(false);
          });
    } else {
      console.log('error');
      console.log(errors);
      setFormErros({ ...errors });
    }
  };

  console.log(editVoterRef.current);
  return (
    <div className="flex flex-col items-start space-y-8 my-10">
      {/* upload profile */}
      <div className="flex flex-col items-center justify-start space-y-4">
        <img
          className="rounded-full"
          style={{ objectFit: 'cover', height: 100, width: 100 }}
          src={image.img_url !== '' ? image.img_url : '/images/noprofile.png'}
        />
        <input
          type="file"
          accept="image/*"
          onChange={uploadFileHandler}
          ref={fileInput}
          className="hidden rounded-xl outline-none  font-medium text-[#424040] text-base"
        />
        <p
          onClick={uploadFileHandler}
          className="cursor-pointer font-medium text-[#424040] hover:text-primary text-base"
        >
          Choose a file
        </p>
      </div>

      {/* textfields */}
      <div className="flex flex-col items-start space-y-8">
        <div className="flex space-x-10 form-group">
          <TextInputField
            id={TextFieldIdEnum.FirstName}
            title={'First Name'}
            defaultValue={editVoterRef.current.first_name}
            isRequired={true}
            error={formErros.first_name}
            placeHolder={'eg: Hari'}
            inputHandler={handleTextInput}
          />
          <TextInputField
            id={TextFieldIdEnum.MiddleName}
            title={'Middle Name'}
            defaultValue={editVoterRef.current.middle_name}
            isRequired={false}
            placeHolder={'eg: Bahadur'}
            inputHandler={handleTextInput}
          />
          <TextInputField
            id={TextFieldIdEnum.LastName}
            defaultValue={editVoterRef.current.last_name}
            title={'Last Name'}
            isRequired={true}
            error={formErros.last_name}
            placeHolder={'eg: Kawan'}
            inputHandler={handleTextInput}
          />
        </div>

        <div className="flex space-x-10">
          <TextInputField
            id={TextFieldIdEnum.VoterID}
            title={'Voter ID'}
            defaultValue={editVoterRef.current.voter_id}
            isRequired={true}
            disabled
            error={formErros.voter_id}
            placeHolder={'eg: KCE075BCT020'}
            inputHandler={handleTextInput}
          />
        </div>
      </div>

      <div className="flex">
        <RoundedTextBtn
          text={'DONE'}
          bgColor={'bg-primary'}
          onClick={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
