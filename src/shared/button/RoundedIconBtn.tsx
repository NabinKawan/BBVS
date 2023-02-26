import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

interface RoundedIconBtnProps {
  icon: ReactJSXElement;
  onClick: Function;
  bgColor: string;
  loading?: boolean;
  text: string;
}

export default function RoundedIconBtn({
  icon,
  bgColor,
  text,
  onClick,
  loading,
}: RoundedIconBtnProps) {
  return (
    <div
      onClick={() => {
        onClick();
      }}
      className={`flex h-full cursor-pointer text-white font-bold text-sm items-center rounded-xl py-2 pl-2 md:pl-6 pr-3.5 ${bgColor}`}
    >
      {loading ? (
        <CircularProgress color="inherit" size={18} />
      ) : (
        <div className="flex space-x-2 ">
          <p className="hidden md:block">{text}</p>
          <div>{icon}</div>
        </div>
      )}
    </div>
  );
}
