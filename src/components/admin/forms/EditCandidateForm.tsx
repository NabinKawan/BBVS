import React, { useContext, useRef, useState } from 'react';
import AdminContext from '../../../context/admin/AdminContext';
import CandidateContext from '../../../context/candidate/CandidateContext';
import { AdminContextDto, CandidateContextDto } from '../../../models/dto/ContextDtos';
import { CandidateDto } from '../../../models/dto/ServerOpDtos';
import { TextFieldIdEnum } from '../../../models/enums/TextFieldEnums';
import ServerOp from '../../../services/ServerOp';
import RoundedTextBtn from '../../../shared/button/RoundedTextBtn';
import TextInputField from '../TextInputField';

interface EditCandidateFormProps {
  candidate: CandidateDto;
  setShowDialog: any;
}

export default function EditCandidateForm({ candidate, setShowDialog }: EditCandidateFormProps) {
  const [image, setImage] = useState({ img_file: null, img_url: candidate.image });
  const fileInput = useRef<HTMLInputElement>(null);

  // @ts-ignore
  const candidateProvider = useContext(CandidateContext) as CandidateContextDto;
  //@ts-ignore
  const adminProvider = useContext(AdminContext) as AdminContextDto;

  const editCandidateRef = useRef(candidate);

  const editCandidateInfo = (key: string, value: string) => {
    // @ts-ignore
    editCandidateRef.current[`${key}`] = value;
    // console.log(addCandidateRef.current);
  };

  const [formErros, setFormErros] = useState({
    candidate_id: '',
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

      // adding image into editCandidateRef.current
      editCandidateInfo(TextFieldIdEnum.Image, img_url);

      // @ts-ignore becasue changing null value into string value
      setImage({ img_file, img_url });

      console.log(img_url);
    }
  };

  const handleTextInput = (candidate_id: string, inputValue: string) => {
    editCandidateInfo(candidate_id, inputValue);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault(); // preventing default redirection

    const { candidate_id, first_name, middle_name, last_name, post } = editCandidateRef.current;
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
      if (candidate_id === '') {
        errors.candidate_id = 'Candidate ID is required';
      } else {
        errors.candidate_id = '';
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
      if (post === '') {
        errors.post = 'Post is required';
      } else {
        errors.post = '';
      }
    }

    // checking empty errors
    validateForm();

    // checking for errors after validation
    if (hasError(errors)) {
      setFormErros({ ...errors });
      setLoading(true);

      // upload image and set the url to editCandidateRef.current
      ServerOp.uploadImage(image.img_file).then((value) => {
        console.log({ value });
        editCandidateInfo(TextFieldIdEnum.Image, value);

        // changing saved post and id values to uppercase
        editCandidateInfo(TextFieldIdEnum.Post, editCandidateRef.current.post.toUpperCase());
        editCandidateInfo(
          TextFieldIdEnum.CandidateID,
          editCandidateRef.current.candidate_id.toUpperCase(),
        );

        ServerOp.updateCandidate(editCandidateRef.current, adminProvider.accessToken).then(
          (response) => {
            if (response) {
              const candidates = candidateProvider.candidates;

              const index = candidates.findIndex(
                (e) => e.candidate_id === editCandidateRef.current.candidate_id,
              );

              candidates[index] = editCandidateRef.current;

              setImage({ ...{ img_file: null, img_url: '' } });
              candidateProvider.setCandidates([...candidates]);

              // hide edit form dialog
              setShowDialog(false);
            } else {
              ('error');
              // setLoading(false);
            }
            setLoading(false);
          },
        );
      });
    } else {
      console.log('error');
      console.log(errors);
      setFormErros({ ...errors });
    }
  };

  console.log(editCandidateRef.current);
  return (
    <div className="flex flex-col items-start space-y-8 my-10">
      {/* upload profile */}
      <div className="flex flex-col items-center justify-start space-y-4">
        <img
          className="rounded-full"
          width={100}
          height={100}
          src={image.img_url !== '' ? image.img_url : '/images/noprofile.png'}
          style={{ objectFit: 'cover' }}
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
            defaultValue={editCandidateRef.current.first_name}
            isRequired={true}
            error={formErros.first_name}
            placeHolder={'eg: Hari'}
            inputHandler={handleTextInput}
          />
          <TextInputField
            id={TextFieldIdEnum.MiddleName}
            title={'Middle Name'}
            defaultValue={editCandidateRef.current.middle_name}
            isRequired={false}
            placeHolder={'eg: Bahadur'}
            inputHandler={handleTextInput}
          />
          <TextInputField
            id={TextFieldIdEnum.LastName}
            defaultValue={editCandidateRef.current.last_name}
            title={'Last Name'}
            isRequired={true}
            error={formErros.last_name}
            placeHolder={'eg: Kawan'}
            inputHandler={handleTextInput}
          />
        </div>

        <div className="flex space-x-10">
          <TextInputField
            id={TextFieldIdEnum.CandidateID}
            title={'Candidate ID'}
            defaultValue={editCandidateRef.current.candidate_id}
            isRequired={true}
            disabled
            error={formErros.candidate_id}
            placeHolder={'eg: KCE075BCT020'}
            inputHandler={handleTextInput}
          />
          <TextInputField
            id={TextFieldIdEnum.Post}
            title={'POST'}
            defaultValue={editCandidateRef.current.post}
            isRequired={true}
            error={formErros.post}
            placeHolder={'eg: CR'}
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
