import React, { useState } from 'react';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { IoLockClosed } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { MdErrorOutline } from 'react-icons/md';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({ voter_id: '', password: '' });
  const [error, setError] = useState(false);
  const router = useRouter();

  const onLogin = () => {
    setLoading(true);
    if (validate(formValues)) {
      setTimeout(() => {
        router.push('/voting_beta');
      }, 2000);
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
    <div className="flex justify-center items-center bg-loginBg h-screen font-sans ">
      <div className="flex flex-col items-center lg:px-10 sm:px-10 py-12 space-y-5  rounded-xl bg-white shadow-lg">
        <div className="flex flex-col items-center ">
          <img src="logos/logo.png" />
          <p className="text-3xl font-medium text-[#455875]">BBVS</p>
          <p className="text-lg font-normal text-gray-400  mb-10 mt-2">
            Blockchain Based Voting System
          </p>
        </div>
        <div className="flex items-center py-3 px-4 space-x-4 rounded-lg border border-gray-200 text-base text-gray-600 w-[350px]">
          <BsFillPersonCheckFill className="text-primary" size={18} />
          <input
            className="w-full border border-none outline-none "
            placeholder="Enter your voter id"
            onChange={(event) => {
              setFormValues({ voter_id: event.target.value, password: formValues.password });
              setError(false);
            }}
            type="text"
          />
        </div>
        <div className="flex items-center  py-3 px-4  space-x-4 rounded-lg border border-gray-200 text-base text-gray-600 w-[350px] ">
          <IoLockClosed className="text-primary" size={18} />
          <input
            className="w-full border border-none outline-none"
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
        <div
          onClick={onLogin}
          className="flex cursor-pointer   p-3 text-base font-medium justify-center bg-primary text-white rounded-lg w-[350px]"
        >
          {' '}
          {loading ? <CircularProgress size={24} color="inherit" /> : <p>Login In</p>}
        </div>
      </div>
    </div>
  );
}
