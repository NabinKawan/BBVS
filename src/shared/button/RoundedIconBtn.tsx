import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import React from 'react';

interface RoundedIconBtnProps {
  icon: ReactJSXElement;
  onClick: Function;
  bgColor: string;
  text: string;
}

export default function RoundedIconBtn({ icon, bgColor, text, onClick }: RoundedIconBtnProps) {
  return (
    <div
      onClick={() => {
        onClick();
      }}
      className={`flex space-x-2 cursor-pointer text-white font-bold text-base items-center rounded-xl py-2 px-6 ${bgColor}`}
    >
      <p>{text}</p>
      <div>{icon}</div>
    </div>
  );
}
