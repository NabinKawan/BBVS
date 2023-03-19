import React, { useContext, useRef, useState } from 'react';
import AdminContext from '../../../context/admin/AdminContext';
import CandidateContext from '../../../context/candidate/CandidateContext';
import VoterContext from '../../../context/voter/VoterContext';
import { useBreakpoint } from '../../../lib/hooks/use-breakpoint';
import {
  AdminContextDto,
  CandidateContextDto,
  VoterContextDto,
} from '../../../models/dto/ContextDtos';
import { TextFieldIdEnum } from '../../../models/enums/TextFieldEnums';
import ServerOp from '../../../services/ServerOp';
import RoundedTextBtn from '../../../shared/button/RoundedTextBtn';
import TextInputField from '../TextInputField';
import { TbColorPicker } from 'react-icons/tb';

export default function AddVoterForm() {
  //@ts-ignore
  const voterProvider = useContext(VoterContext) as VoterContextDto;
  const [submitted, setSubmitted] = useState(false);
  // @ts-ignore
  const adminProvider = useContext(AdminContext) as AdminContextDto;
  const breakpoint = useBreakpoint();
  const addVoterInfo = voterProvider.getAddVoterInfo();
  const [image, setImage] = useState({ img_file: null, img_url: addVoterInfo.image });
  const fileInput = useRef<HTMLInputElement>(null);

  const inputRef = useRef(null);

  const [formErros, setFormErros] = useState({
    voter_id: '',
    first_name: '',
    last_name: '',
    post: '',
  });
  const [loading, setLoading] = useState(false);

  const uploadFileHandler = (event: any) => {
    // @ts-ignore
    // getting file
    fileInput.current.click();
    const img_file = fileInput.current?.files![0];

    if (img_file) {
      // @ts-ignore
      // creates object url
      const img_url = window.URL.createObjectURL(img_file!);

      // adding image into addVoterInfo
      voterProvider.addVoterInfo(TextFieldIdEnum.Image, img_url);

      // @ts-ignore becasue changing null value into string value
      setImage({ img_file, img_url });
    }
  };

  const handleTextInput = (candidate_id: string, inputValue: string) => {
    voterProvider.addVoterInfo(candidate_id, inputValue.toUpperCase());
  };

  const handleSubmit = (event: any) => {
    event.preventDefault(); // preventing default redirection

    const { voter_id, first_name, middle_name, last_name } = voterProvider.getAddVoterInfo();
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
        errors.voter_id = 'Voter ID is required';
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

      // upload image and set the url to addVoterInfo
      ServerOp.uploadImage(image.img_file, adminProvider.accessToken).then((value) => {
        voterProvider.addVoterInfo(TextFieldIdEnum.Image, value);

        // changing saved post and id values to uppercase
        voterProvider.addVoterInfo(
          TextFieldIdEnum.CandidateID,
          addVoterInfo.voter_id.toUpperCase(),
        );

        ServerOp.addVoter(voterProvider.getAddVoterInfo(), adminProvider.accessToken).then(
          (response) => {
            if (response) {
              const voters = voterProvider.voters;
              voters.unshift(voterProvider.getAddVoterInfo());

              // clearing add candidate info
              voterProvider.clearAddVoterInfo();
              setImage({ ...{ img_file: null, img_url: '' } });
            } else {
              ('error');
              // setLoading(false);
            }
            setLoading(false);
          },
        );
      });
    } else {
      setFormErros({ ...errors });
    }
  };

  return (
    <form className="flex flex-col items-start space-y-8 mt-10" onSubmit={handleSubmit}>
      <div className="flex flex-col xl:flex-row w-full  space-y-8 items-start xl:space-x-28  xl:space-y-0">
        {/* upload profile */}
        <div className="flex flex-col items-start justify-start space-y-4 w-44 text-[#424040] text-sm">
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
            className="hidden rounded-xl outline-none  font-medium "
          />
          <div className="flex w-full cursor-pointer items-center justify-start space-x-1  hover:text-primary">
            <p onClick={uploadFileHandler} className=" font-medium ">
              Choose an image
            </p>
            <TbColorPicker />
          </div>
        </div>
        {/* textfields */}
        <div className="flex flex-col items-start space-y-4 w-full">
          <div className="flex flex-col md:flex-row space-y-4 md:space-x-10 md:space-y-0 form-group w-full">
            <TextInputField
              id={TextFieldIdEnum.FirstName}
              fullWidth={['xs', 'sm', 'md'].includes(breakpoint)}
              title={'First Name'}
              defaultValue={addVoterInfo.first_name}
              isRequired={true}
              error={formErros.first_name}
              placeHolder={'eg: Nabin'}
              inputHandler={handleTextInput}
            />
            <TextInputField
              id={TextFieldIdEnum.MiddleName}
              fullWidth={['xs', 'sm', 'md'].includes(breakpoint)}
              title={'Middle Name'}
              defaultValue={addVoterInfo.middle_name}
              isRequired={false}
              placeHolder={'eg: Bahadur'}
              inputHandler={handleTextInput}
            />
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-x-10 md:space-y-0 form-group w-full">
            <TextInputField
              id={TextFieldIdEnum.LastName}
              fullWidth={['xs', 'sm', 'md'].includes(breakpoint)}
              defaultValue={addVoterInfo.last_name}
              title={'Last Name'}
              isRequired={true}
              error={formErros.last_name}
              placeHolder={'eg: Kawan'}
              inputHandler={handleTextInput}
            />
            <TextInputField
              id={TextFieldIdEnum.VoterID}
              fullWidth={['xs', 'sm', 'md'].includes(breakpoint)}
              title={'Voter ID'}
              defaultValue={addVoterInfo.voter_id}
              isRequired={true}
              error={formErros.voter_id}
              placeHolder={'eg: KCE075BCT020'}
              inputHandler={handleTextInput}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <RoundedTextBtn text={'ADD'} type="submit" bgColor={'bg-primary'} loading={loading} />
      </div>
    </form>
  );
}
