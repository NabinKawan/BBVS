import React, { useRef, useState } from 'react';
import { candidates } from '../../../dummy/data';
import RoundedTextBtn from '../../../shared/button/RoundedTextBtn';
import CandidateCard from '../CandidateCard';
import TextInputField from '../TextInputField';

export default function AddCandidates() {
  const [image, setImage] = useState(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const uploadFileHandler = (event: any) => {
    console.log(event.target.files);
    // @ts-ignore
    // getting file
    fileInput.current.click();
    const img = fileInput.current?.files![0];

    if (img) {
      // @ts-ignore
      setImage(window.URL.createObjectURL(img!));
      console.log(window.URL.createObjectURL(img!));
    }
  };

  return (
    <div className="flex flex-col">
      {/* title */}
      <p className="font-medium text-[#575353] text-xl ">Add Candidates</p>

      {/* container card */}
      <div className="flex flex-col bg-white rounded-xl shadow-md mt-20 px-11 py-7">
        <p className="font-bold text-xl">Add Candidates Information</p>

        {/* form */}
        <div className="flex flex-col items-start space-y-8 my-10">
          <div className="flex items-center space-x-32 ">
            {/* textfields */}
            <div className="flex flex-col items-start space-y-8">
              <div className="flex space-x-10">
                <TextInputField title={'First Name'} isRequired={true} placeHolder={'eg: John'} />
                <TextInputField title={'Last Name'} isRequired={true} placeHolder={'eg: Doe'} />
              </div>

              <div className="flex space-x-10">
                <TextInputField title={'CRN'} isRequired={true} placeHolder={'eg: KCE075BCT020'} />
                <TextInputField title={'POST'} isRequired={true} placeHolder={'eg: CR'} />
              </div>
            </div>

            {/* upload profile */}
            <div className="flex flex-col items-center space-y-4">
              <img
                className="rounded-full"
                width={100}
                height={100}
                src={image ? image : '/images/noprofile.png'}
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
                className="cursor-pointer font-medium text-[#424040] text-base"
              >
                Upload a file
              </p>
            </div>
          </div>
          <div className="flex">
            <RoundedTextBtn text={'ADD'} bgColor={'bg-primary'} />
          </div>
        </div>

        {/* candidate list */}
        <div className="flex flex-col divide-y-2 divide-gray-50 mt-4">
          {/* candidate card */}
          {Object.values(candidates)
            .flat()
            .map((e) => (
              <CandidateCard
                image={e.image}
                fName={e.first_name}
                lName={e.last_name}
                id={e.id}
                post={e.post}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
