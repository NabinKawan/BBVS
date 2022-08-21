import { CircularProgress } from '@mui/material';
import React from 'react';

interface RoundedTextBtnProps {
  text: string;
  onClick?: any;
  loading?: boolean;
  bgColor: string;
}

export default function RoundedTextBtn({
  bgColor,
  text,
  loading = false,
  onClick = () => {},
}: RoundedTextBtnProps) {
  return (
    <div
      onClick={onClick}
      className={`flex w-full h-full cursor-pointer items-center justify-center text-white font-bold text-base rounded-xl py-2 px-6 ${bgColor}`}
    >
      {loading ? <CircularProgress color="inherit" size={24} /> : <p>{text}</p>}
    </div>
  );
}
