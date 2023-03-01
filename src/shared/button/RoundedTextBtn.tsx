import { CircularProgress } from '@mui/material';
import React from 'react';

interface RoundedTextBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean;
  bgColor: string;
}

export default function RoundedTextBtn({
  bgColor,
  text,
  loading = false,
  onClick = () => {},
  ...btnProps
}: RoundedTextBtnProps) {
  return (
    <button
      onClick={onClick}
      {...btnProps}
      className={`flex w-full h-full cursor-pointer items-center justify-center text-white font-bold text-sm rounded-xl py-2 px-6 ${bgColor}`}
    >
      {loading ? <CircularProgress color="inherit" size={24} /> : <p>{text}</p>}
    </button>
  );
}
