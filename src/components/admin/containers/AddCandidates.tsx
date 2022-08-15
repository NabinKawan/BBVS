import React from 'react';
import RoundedTextBtn from '../../../shared/button/RoundedTextBtn';
import CandidateCard from '../CandidateCard';
import TextInputField from '../TextInputField';

export default function AddCandidates() {
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
            <div className="flex flex-col items-center space-y-2">
              <img width={100} height={100} src="images/noprofile.png" />
              <p className="font-medium text-[#424040] text-base">Upload photo</p>
            </div>
          </div>
          <RoundedTextBtn text={'ADD'} bgColor={'bg-primary'} />
        </div>

        {/* candidate list */}
        <div className="flex flex-col divide-y-2 mt-4">
          {/* candidate card */}
          <CandidateCard />
        </div>
      </div>
    </div>
  );
}
