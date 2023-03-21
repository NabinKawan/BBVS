import { useState, useRef, useContext } from 'react';
import { TbColorPicker } from 'react-icons/tb';
import environments from '../../configs/environments';
import AdminContext from '../../context/admin/AdminContext';
import CandidateContext from '../../context/candidate/CandidateContext';
import { useBreakpoint } from '../../lib/hooks/use-breakpoint';
import { AdminContextDto, CandidateContextDto } from '../../models/dto/ContextDtos';
import { EditCandidateDialogPropsDto } from '../../models/dto/DialogPropsDtos';
import { CandidateDto } from '../../models/dto/ServerOpDtos';
import { TextFieldIdEnum } from '../../models/enums/TextFieldEnums';
import ServerOp from '../../services/ServerOp';
import RoundedTextBtn from '../../shared/button/RoundedTextBtn';
import TextInputField from '../admin/TextInputField';
import { useDialog } from '../dialog-view.tsx/context';

export default function EditCandidateView() {
  const dialog = useDialog();
  const dialogProps: EditCandidateDialogPropsDto | null = dialog.dialogProps;
  //@ts-ignore
  const candidate: CandidateDto = dialogProps && dialogProps.candidate;
  const breakpoint = useBreakpoint();
  const [image, setImage] = useState({
    img_file: null,
    img_url: candidate ? `${environments.BBVS_API_URL}/${candidate.image}` : '',
  });
  const [logo, setLogo] = useState({
    img_file: null,
    img_url: candidate ? `${environments.BBVS_API_URL}/${candidate.logo}` : '',
  });
  const imageInput = useRef<HTMLInputElement>(null);
  const logoInput = useRef<HTMLInputElement>(null);

  //@ts-ignore
  const candidateProvider = useContext(CandidateContext) as CandidateContextDto;
  //@ts-ignore
  const adminProvider = useContext(AdminContext) as AdminContextDto;

  const editCandidateRef = useRef(candidate);

  const editCandidateInfo = (key: string, value: string) => {
    // @ts-ignore
    editCandidateRef.current[`${key}`] = value;
  };

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
      event.target.value = null;
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
      event.target.value = null;
    }
  };

  const handleTextInput = (candidate_id: string, inputValue: string) => {
    editCandidateInfo(candidate_id, inputValue);
  };

  const handleSubmit = async (event: any) => {
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
      if (image.img_file !== null) {
        await ServerOp.uploadImage(image.img_file, adminProvider.accessToken).then((value) => {
          editCandidateInfo(TextFieldIdEnum.Image, value!);
        });
      }
      if (logo.img_file !== null) {
        await ServerOp.uploadLogo(logo.img_file, adminProvider.accessToken).then((value) => {
          editCandidateInfo(TextFieldIdEnum.Logo, value!);
        });
      }
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
              (e: any) => e.candidate_id === editCandidateRef.current.candidate_id,
            );

            candidates[index] = editCandidateRef.current;

            setImage({ ...{ img_file: null, img_url: '' } });
            setLogo({ ...{ img_file: null, img_url: '' } });
            candidateProvider.setCandidates([...candidates]);

            // hide edit form dialog
            dialog.closeDialog();
          } else {
            ('error');
            // setLoading(false);
          }
          setLoading(false);
        },
      );
    } else {
      setFormErros({ ...errors });
    }
  };
  return (
    <div className="flex flex-col w-full items-start justify-center space-y-8 py-8 px-8 md:px-10 lg:px-12 ">
      {/* upload profile */}
      <div className="flex flex-col w-full items-center lg:items-start  space-y-4">
        <div className="relative">
          <img
            className="rounded-full"
            style={{ objectFit: 'cover', height: 100, width: 100 }}
            src={image.img_file !== '' ? image.img_url : '/images/noprofile.png'}
          />

          {logo.img_url !== '' && (
            <img className="absolute right-0 bottom-0  h-9" src={logo.img_url} />
          )}
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
      <div className="flex flex-col w-full  items-start space-y-3 lg:space-y-8">
        <div className="flex flex-col w-full space-y-2.5 lg:flex-row  lg:space-x-10 lg:space-y-0 form-group">
          <TextInputField
            id={TextFieldIdEnum.FirstName}
            fullWidth={['xs', 'sm', 'md'].includes(breakpoint)}
            title={'First Name'}
            defaultValue={editCandidateRef.current.first_name}
            isRequired={true}
            error={formErros.first_name}
            placeHolder={'eg: Hari'}
            inputHandler={handleTextInput}
          />
          <TextInputField
            id={TextFieldIdEnum.MiddleName}
            fullWidth={['xs', 'sm', 'md'].includes(breakpoint)}
            title={'Middle Name'}
            defaultValue={editCandidateRef.current.middle_name}
            isRequired={false}
            placeHolder={'eg: Bahadur'}
            inputHandler={handleTextInput}
          />
          <TextInputField
            id={TextFieldIdEnum.LastName}
            fullWidth={['xs', 'sm', 'md'].includes(breakpoint)}
            defaultValue={editCandidateRef.current.last_name}
            title={'Last Name'}
            isRequired={true}
            error={formErros.last_name}
            placeHolder={'eg: Kawan'}
            inputHandler={handleTextInput}
          />
        </div>

        <div className="flex flex-col w-full space-y-3 lg:flex-row  lg:space-x-10 lg:space-y-0">
          <TextInputField
            id={TextFieldIdEnum.CandidateID}
            fullWidth={['xs', 'sm', 'md'].includes(breakpoint)}
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
            fullWidth={['xs', 'sm', 'md'].includes(breakpoint)}
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
