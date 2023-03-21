import React, { useContext, useEffect, useState } from 'react';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { IoLockClosed } from 'react-icons/io5';
import Router from 'next/router';
import { CircularProgress } from '@mui/material';
import { MdErrorOutline, MdPublishedWithChanges } from 'react-icons/md';
import ServerOp from '../services/ServerOp';
import CachService from '../services/CacheService';
import { CachNamesEnum } from '../models/enums/CacheEnums';
import VotingContext from '../context/voting/VotingContext';
import { VotingContextDto } from '../models/dto/ContextDtos';
import { CacheDto } from '../models/dto/CacheDtos';
import ContractService from '../services/ContractService';
import { toast } from 'react-toastify';
import CompilerService from '../services/CompilerService';
import { AiOutlineLink } from 'react-icons/ai';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({ voter_id: '', password: '' });
  const [error, setError] = useState(false);

  //@ts-ignore
  const votingProvider = useContext(VotingContext) as VotingContextDto;

  useEffect(() => {
    // checking cache for admin
    CachService.getCacheData(CachNamesEnum.Voter).then((value) => {
      if (value) {
        votingProvider.setAccessToken(value.access_token);
        Router.push('/voting');
      }
    });
  }, []);

  const onLogin = (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (validate(formValues)) {
      // setTimeout(() => {
      //   router.push('/voting_beta');
      // }, 2000);
      ServerOp.login(formValues)
        .then((value) => {
          if (value) {
            const cacheData: CacheDto = {
              user_id: formValues.voter_id,
              access_token: value,
            };
            const voterId = formValues.voter_id.toUpperCase();
            CompilerService.getVoterStatus(voterId)
              .then((val) => {
                debugger;
                if (!val) {
                  CachService.addDataIntoCache(CachNamesEnum.Voter, cacheData);
                  setTimeout(() => {
                    Router.push('/voting');
                    setLoading(false);
                  }, 2000);
                }
              })
              .catch((e) => {
                toast.error(e.message, { autoClose: 2000 });
                setLoading(false);
              });
          }
        })
        .catch((e) => {
          toast.error(e.message, { autoClose: 2000 });
          setLoading(false);
        });
    } else {
      setError(true);
      setLoading(false);
    }
  };

  const validate = (values: { voter_id: string; password: string }) => {
    if (
      values['voter_id'] !== null &&
      values['voter_id'] !== '' &&
      values.password !== null &&
      values.password !== ''
    ) {
      return true;
    }

    return false;
  };

  return (
    <form
      className="flex justify-center items-center bg-loginBg min-h-screen font-sans"
      onSubmit={onLogin}
    >
      <div className="flex flex-col items-center px-8 sm:px-10 py-12 space-y-5  rounded-xl bg-white shadow-lg">
        <div className="flex flex-col items-center ">
          <img src="logos/logo.png" />
          <p className="text-3xl font-medium text-[#455875]">BBVS</p>
          <p className="text-lg font-normal text-gray-400  mb-10 mt-2">
            Blockchain Based Voting System
          </p>
        </div>
        <div className="flex items-center py-3 px-4 space-x-4 rounded-lg border border-gray-200 text-base text-gray-600 w-[350px] lg:w-[380px]">
          <BsFillPersonCheckFill className="text-primary" size={18} />
          <input
            className="w-full border border-none outline-none bg-transparent"
            placeholder="Enter your voter id"
            onChange={(event) => {
              setFormValues({ voter_id: event.target.value, password: formValues.password });
              setError(false);
            }}
            type="text"
          />
        </div>
        <div className="flex items-center  py-3 px-4  space-x-4 rounded-lg border border-gray-200 text-base text-gray-600 w-[350px] lg:w-[380px] ">
          <IoLockClosed className="text-primary" size={18} />
          <input
            className="w-full border border-none outline-none bg-transparent"
            placeholder="Enter your password"
            onChange={(event) => {
              setFormValues({ voter_id: formValues.voter_id, password: event.target.value });
              setError(false);
            }}
            type="password"
          />
        </div>
        {error && (
          <div className="flex justify-start items-center w-full space-x-2 mb-10 mt-2">
            <MdErrorOutline className="text-red-400" size={12} />
            <p className="text-xs font-normal text-red-400  ">Invalid Credential.</p>
          </div>
        )}
        <button
          type="submit"
          className="flex cursor-pointer   p-3 text-base font-medium justify-center bg-primary text-white rounded-lg w-full"
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : <p>Login</p>}
        </button>
        <p className="text-sm text-gray-600">OR</p>

        <div
          className={`flex relative rounded-xl cursor-pointer items-center justify-center w-full
          text-menuItemTextColor bg-gray-100 hover:text-orange-500 hover:bg-orange-500/5
            px-4 py-3 space-x-4 mt-10`}
          onClick={() => {
            Router.push('/election');
          }}
        >
          <MdPublishedWithChanges size={22} className="text-orange-500 absolute left-4" />

          <p className="font-medium text-base">Go to Election</p>
        </div>
        <p className="text-sm text-gray-600">
          Already voted?
          <span
            className="font-medium text-primary text-sm cursor-pointer ml-1"
            onClick={() => {
              Router.push('/check-vote');
            }}
          >
            Check your vote
          </span>
        </p>
      </div>
    </form>
  );
}
