import { CircularProgress } from '@mui/material';
import Router from 'next/router';
import React, { useState, useContext } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { MdPublishedWithChanges } from 'react-icons/md';
import AdminContext from '../../context/admin/AdminContext';
import { AdminContextDto } from '../../models/dto/ContextDtos';
import { CachNamesEnum } from '../../models/enums/CacheEnums';
import { AdminContainerEnum } from '../../models/enums/ContainerEnums';
import CachService from '../../services/CacheService';
import RoundedTextBtn from '../../shared/button/RoundedTextBtn';

interface AdminMenuProps {
  className?: string;
}
export default function AdminMenu({ className }: AdminMenuProps) {
  // const [menuIndex, setMenuIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const adminProvider = useContext(AdminContext) as AdminContextDto;

  console.log(adminProvider.admin.image);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      CachService.deleteCache(CachNamesEnum.Admin).then((value) => {
        if (value) {
          Router.push('/adminLogin');
        }
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className={className}>
      {/* logo details*/}
      <div className="flex items-center space-x-1 ">
        <img className="-ml-3" src="logos/logo.png" />
        <div className="flex flex-col justify-center">
          <p className="font-bold  text-xl text-[#202020]">BBVS</p>
          <p className="font-medium text-sm text-[#979797]">Blockchain Based Voting System</p>
        </div>
      </div>
      {/* profile details */}
      <div className="flex rounded-xl items-center bg-[#1c4e80] justify-between w-64 p-4 my-8">
        <div className="flex space-x-4">
          <img
            className="rounded-full"
            height={60}
            width={60}
            src={
              adminProvider.admin.image !== ''
                ? `http://${adminProvider.admin.image}`
                : 'images/profile_img.png'
            }
          />
          <div className="flex justify-center flex-col space-y-1">
            <p className="font-medium text-base text-white">
              {`${adminProvider.admin.first_name} ${adminProvider.admin.middle_name} ${adminProvider.admin.last_name}`}
            </p>
            <p className="font-medium text-xs text-gray-400 bg-red">
              {`Admin_ID: ${adminProvider.admin.admin_id}`}
            </p>
          </div>

          {/* <div
              onClick={handleLogout}
              className={`flex w-28 h-12 cursor-pointer items-center justify-center text-white font-bold text-sm rounded-xl py-2 px-6 bg-red-400 hover:bg-red-400`}
            >
              {loading ? <CircularProgress color="inherit" size={24} /> : 'Log Out'}
            </div> */}
        </div>

        {loading ? (
          <CircularProgress color="inherit" size={22} />
        ) : (
          <FiLogOut
            onClick={handleLogout}
            className="text-gray-400 hover:text-white cursor-pointer ml-4"
            size={22}
          />
        )}
      </div>
      {/* <div className="flex">
        <RoundedTextBtn
          text={'Log Out'}
          // loading={loading}
          bgColor={'bg-[#C6C6C6]'}
        />
      </div> */}
      {/* menus */}
      <div className="flex flex-col space-y-4 ">
        <div
          onClick={() => {
            adminProvider.setCurrentContainer(AdminContainerEnum.CandidateDetails);
          }}
          className={`flex rounded-xl cursor-pointer items-center ${
            adminProvider.currentContainer === AdminContainerEnum.CandidateDetails
              ? 'text-primary bg-menuItemHighlight'
              : 'text-menuItemTextColor bg-white'
          }  px-4 py-3 space-x-4 mt-10`}
        >
          <AiFillInfoCircle size={22} />
          <p className="font-medium text-base">Candidates Details</p>
        </div>
        <div
          onClick={() => {
            adminProvider.setCurrentContainer(AdminContainerEnum.VoterDetails);
          }}
          className={`flex rounded-xl cursor-pointer items-center ${
            adminProvider.currentContainer === AdminContainerEnum.VoterDetails
              ? 'text-primary bg-menuItemHighlight'
              : 'text-menuItemTextColor bg-white'
          }  px-4 py-3 space-x-4 mt-10`}
        >
          <AiFillInfoCircle size={22} />
          <p className="font-medium text-base">Voters Details</p>
        </div>
        <div
          onClick={() => {
            adminProvider.setCurrentContainer(AdminContainerEnum.AddCandidates);
          }}
          className={`flex rounded-xl cursor-pointer items-center ${
            adminProvider.currentContainer === AdminContainerEnum.AddCandidates
              ? 'text-primary bg-menuItemHighlight'
              : 'text-menuItemTextColor bg-white'
          }  px-4 py-3 space-x-4 mt-10`}
        >
          <BsFillPersonPlusFill size={22} />
          <p className="font-medium text-base">Add Candidates</p>
        </div>
        <div
          onClick={() => {
            adminProvider.setCurrentContainer(AdminContainerEnum.AddVoters);
          }}
          className={`flex rounded-xl cursor-pointer items-center ${
            adminProvider.currentContainer === AdminContainerEnum.AddVoters
              ? 'text-primary bg-menuItemHighlight'
              : 'text-menuItemTextColor bg-white'
          }  px-4 py-3 space-x-4 mt-10`}
        >
          <BsFillPersonPlusFill size={22} />
          <p className="font-medium text-base">Add Voters</p>
        </div>

        <div
          onClick={() => {
            adminProvider.setCurrentContainer(AdminContainerEnum.Election);
          }}
          className={`flex rounded-xl cursor-pointer items-center ${
            adminProvider.currentContainer === AdminContainerEnum.Election
              ? 'text-primary bg-menuItemHighlight'
              : 'text-menuItemTextColor bg-white'
          }  px-4 py-3 space-x-4 mt-10`}
        >
          <MdPublishedWithChanges size={22} />
          <p className="font-medium text-base">Election</p>
        </div>
      </div>
    </div>
  );
}
