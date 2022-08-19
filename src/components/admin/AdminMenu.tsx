import React, { useState, useContext } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { MdPublishedWithChanges } from 'react-icons/md';
import AdminContext from '../../context/admin/AdminContext.js';
import { AdminContextDto } from '../../models/dto/ContextDtos';
import { AdminContainerEnum } from '../../models/enums/ContainerEnums';

export default function AdminMenu() {
  const [menuIndex, setMenuIndex] = useState(0);
  // @ts-ignore
  const containerProvider = useContext(AdminContext) as AdminContextDto;

  return (
    <div className="flex flex-col bg-white drop-shadow-2xl shadow-blue-900 h-screen w-1/4 p-8">
      {/* logo details*/}
      <div className="flex items-center space-x-1">
        <img src="logos/logo.png" />
        <div className="flex flex-col justify-center">
          <p className="font-bold  text-xl text-[#202020]">BBVS</p>
          <p className="font-medium text-sm text-[#979797]">Blockchain Based Voting System</p>
        </div>
      </div>

      {/* profile details */}
      <div className="flex rounded-xl items-center bg-[#F1F1F1] p-4 space-x-4 my-8">
        <img src="images/profile_img.png" />
        <div className="flex flex-col space-y-1">
          <p className="font-medium text-lg">Nabin Kawan</p>
          <p className="font-medium text-sm text-[#838383]">B_Admin</p>
        </div>
      </div>

      {/* menus */}
      <div className="flex flex-col space-y-4 text-base">
        <div
          onClick={() => {
            containerProvider.setCurrentContainer(AdminContainerEnum.CandidateDetails);
          }}
          className={`flex rounded-xl cursor-pointer items-center ${
            containerProvider.currentContainer === AdminContainerEnum.CandidateDetails
              ? 'text-primary bg-menuItemHighlight'
              : 'text-menuItemTextColor bg-white'
          }  px-4 py-3 space-x-4 mt-10`}
        >
          <AiFillInfoCircle size={22} />
          <p className="font-medium text-lg">Candidate Details</p>
        </div>

        <div
          onClick={() => {
            containerProvider.setCurrentContainer(AdminContainerEnum.AddCandidates);
          }}
          className={`flex rounded-xl cursor-pointer items-center ${
            containerProvider.currentContainer === AdminContainerEnum.AddCandidates
              ? 'text-primary bg-menuItemHighlight'
              : 'text-menuItemTextColor bg-white'
          }  px-4 py-3 space-x-4 mt-10`}
        >
          <BsFillPersonPlusFill size={22} />
          <p className="font-medium text-lg">Add Candidates</p>
        </div>

        <div
          onClick={() => {
            containerProvider.setCurrentContainer(AdminContainerEnum.Election);
          }}
          className={`flex rounded-xl cursor-pointer items-center ${
            containerProvider.currentContainer === AdminContainerEnum.Election
              ? 'text-primary bg-menuItemHighlight'
              : 'text-menuItemTextColor bg-white'
          }  px-4 py-3 space-x-4 mt-10`}
        >
          <MdPublishedWithChanges size={22} />
          <p className="font-medium text-lg">Election</p>
        </div>
      </div>
    </div>
  );
}
