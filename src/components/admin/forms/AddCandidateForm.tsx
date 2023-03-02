import React, { useContext, useRef, useState } from 'react';
import AdminContext from '../../../context/admin/AdminContext';
import CandidateContext from '../../../context/candidate/CandidateContext';
import { useBreakpoint } from '../../../lib/hooks/use-breakpoint';
import { AdminContextDto, CandidateContextDto } from '../../../models/dto/ContextDtos';
import { TextFieldIdEnum } from '../../../models/enums/TextFieldEnums';
import ServerOp from '../../../services/ServerOp';
import RoundedTextBtn from '../../../shared/button/RoundedTextBtn';
import TextInputField from '../TextInputField';
import { TbColorPicker } from 'react-icons/tb';

export default function AddCandidateForm() {
  //@ts-ignore
  const candidateProvider = useContext(CandidateContext) as CandidateContextDto;
  //@ts-ignore
  const adminProvider = useContext(AdminContext) as AdminContextDto;
  const breakpoint = useBreakpoint();
  const addCandidateInfo = candidateProvider.getAddCandidateInfo();
  const [image, setImage] = useState({ img_file: null, img_url: addCandidateInfo.image });
  const [logo, setLogo] = useState({ img_file: null, img_url: addCandidateInfo.logo });
  const imageInput = useRef<HTMLInputElement>(null);
  const logoInput = useRef<HTMLInputElement>(null);

  const inputRef = useRef(null);

  const [formErros, setFormErros] = useState({
    candidate_id: '',
    first_name: '',
    last_name: '',
    post: '',
  });
  const [loading, setLoading] = useState(false);

  const uploadImageHandler = (event: any) => {
    // @ts-ignore
    // getting file
    imageInput.current.click();
    const img_file = imageInput.current?.files![0];

    if (img_file) {
      // @ts-ignore
      // creates object url
      const img_url = window.URL.createObjectURL(img_file!);

      // adding image into addCandidateInfo
      candidateProvider.addCandidateInfo(TextFieldIdEnum.Image, img_url);

      // @ts-ignore becasue changing null value into string value
      setImage({ img_file, img_url });
    }
  };

  const uploadLogoHandler = (event: any) => {
    // @ts-ignore
    // getting file
    logoInput.current.click();
    const img_file = logoInput.current?.files![0];

    if (img_file) {
      // @ts-ignore
      // creates object url
      const img_url = window.URL.createObjectURL(img_file!);

      // adding image into addCandidateInfo
      candidateProvider.addCandidateInfo(TextFieldIdEnum.Logo, img_url);

      // @ts-ignore becasue changing null value into string value
      setLogo({ img_file, img_url });
    }
  };

  const handleTextInput = (candidate_id: string, inputValue: string) => {
    candidateProvider.addCandidateInfo(candidate_id, inputValue);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault(); // preventing default redirection

    const { candidate_id, first_name, middle_name, last_name, post } =
      candidateProvider.getAddCandidateInfo();
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

      // upload image and set the url to addCandidateInfo
      ServerOp.uploadImage(image.img_file, adminProvider.accessToken).then((image) => {
        candidateProvider.addCandidateInfo(TextFieldIdEnum.Image, image);
        ServerOp.uploadLogo(logo.img_file, adminProvider.accessToken).then((logo) => {
          candidateProvider.addCandidateInfo(TextFieldIdEnum.Logo, logo);

          // changing saved post and id values to uppercase
          candidateProvider.addCandidateInfo(
            TextFieldIdEnum.Post,
            addCandidateInfo.post.toUpperCase(),
          );
          candidateProvider.addCandidateInfo(
            TextFieldIdEnum.CandidateID,
            addCandidateInfo.candidate_id.toUpperCase(),
          );

          ServerOp.addCandidate(
            candidateProvider.getAddCandidateInfo(),
            adminProvider.accessToken,
          ).then((response) => {
            if (response) {
              const candidates = candidateProvider.candidates;
              candidates.unshift(candidateProvider.getAddCandidateInfo());

              // clearing add candidate info
              candidateProvider.clearAddCandidateInfo();
              setImage({ ...{ img_file: null, img_url: '' } });
              setLogo({ ...{ img_file: null, img_url: '' } });
              candidateProvider.setCandidates([...candidates]);
            } else {
              ('error');
              // setLoading(false);
            }
            setLoading(false);
          });
        });
      });
    } else {
      setFormErros({ ...errors });
    }
  };

  return (
    <form className="flex flex-col items-start space-y-8 mt-10" onSubmit={handleSubmit}>
      <div className="flex flex-col 3xl:flex-row w-full  space-y-8 items-start 3xl:space-x-32  3xl:space-y-0">
        {/* upload profile */}
        <div className="flex flex-col items-start justify-start space-y-4 w-40 ">
          <div className="relative">
            <img
              className="rounded-full"
              style={{ objectFit: 'cover', height: 100, width: 100 }}
              src={image.img_url !== '' ? image.img_url : '/images/noprofile.png'}
            />

            {logo.img_url && <img className="absolute right-0 bottom-0  h-9" src={logo.img_url} />}
          </div>

          <div className="space-y-2 text-sm text-[#424040]">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={uploadImageHandler}
                ref={imageInput}
                className="hidden rounded-xl outline-none  font-medium "
              />
              <div className="flex w-full cursor-pointer items-center justify-start space-x-1  hover:text-primary">
                <p onClick={uploadImageHandler} className=" font-medium ">
                  Choose an image
                </p>
                <TbColorPicker />
              </div>
            </div>

            <div>
              <input
                type="file"
                accept="image/*"
                onChange={uploadLogoHandler}
                ref={logoInput}
                className="hidden rounded-xl outline-none  font-medium "
              />
              <div className=" flex w-full items-center cursor-pointer justify-start space-x-1  hover:text-primary">
                <p onClick={uploadLogoHandler} className="font-medium ">
                  Choose a logo
                </p>
                <TbColorPicker />
              </div>
            </div>
          </div>
        </div>
        {/* textfields */}
        <div className="flex flex-col items-start space-y-4 w-full">
          <div className="flex flex-col xl:flex-row space-y-4 xl:space-x-10 xl:space-y-0 form-group w-full">
            <div className="flex flex-col space-y-4 md:flex-row  md:space-x-10 md:space-y-0">
              <TextInputField
                id={TextFieldIdEnum.FirstName}
                fullWidth={['xs', 'sm'].includes(breakpoint)}
                title={'First Name'}
                defaultValue={addCandidateInfo.first_name}
                isRequired={true}
                error={formErros.first_name}
                placeHolder={'eg: Nabin'}
                inputHandler={handleTextInput}
              />
              <TextInputField
                id={TextFieldIdEnum.MiddleName}
                fullWidth={['xs', 'sm'].includes(breakpoint)}
                title={'Middle Name'}
                defaultValue={addCandidateInfo.middle_name}
                isRequired={false}
                placeHolder={'eg: Bahadur'}
                inputHandler={handleTextInput}
              />
            </div>

            <TextInputField
              id={TextFieldIdEnum.LastName}
              defaultValue={addCandidateInfo.last_name}
              fullWidth={['xs', 'sm'].includes(breakpoint)}
              title={'Last Name'}
              isRequired={true}
              error={formErros.last_name}
              placeHolder={'eg: Kawan'}
              inputHandler={handleTextInput}
            />
          </div>

          <div className="flex flex-col space-y-4 md:flex-row  md:space-x-10 md:space-y-0 w-full">
            <TextInputField
              id={TextFieldIdEnum.CandidateID}
              fullWidth={['xs', 'sm'].includes(breakpoint)}
              title={'Candidate ID'}
              defaultValue={addCandidateInfo.candidate_id}
              isRequired={true}
              error={formErros.candidate_id}
              placeHolder={'eg: KCE075BCT020'}
              inputHandler={handleTextInput}
            />
            <TextInputField
              id={TextFieldIdEnum.Post}
              fullWidth={['xs', 'sm'].includes(breakpoint)}
              title={'POST'}
              defaultValue={addCandidateInfo.post}
              isRequired={true}
              error={formErros.post}
              placeHolder={'eg: CR'}
              inputHandler={handleTextInput}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <RoundedTextBtn
          text={'ADD'}
          type="submit"
          bgColor={'bg-primary'}
          onClick={handleSubmit}
          loading={loading}
        />
      </div>
    </form>
  );
}
