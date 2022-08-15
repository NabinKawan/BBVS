import React from 'react';
import { BsCheck2Circle } from 'react-icons/bs';
import { IoMdRadioButtonOff } from 'react-icons/io';

interface ProgressStepCardProps {
  text: string;
  isCompleted: boolean;
}

export default function ProgressStepCard({ text, isCompleted }: ProgressStepCardProps) {
  return (
    <div
      onClick={() => {}}
      className={`flex w-full justify-between rounded-lg cursor-pointer items-center border border-[#DEDEDE] text-[#8F8E8E] px-4 py-3 space-x-4 mt-10`}
    >
      <p className={`font-medium text-base ${isCompleted && 'text-[#3C3C3C]'}`}>{text}</p>
      {isCompleted ? (
        <BsCheck2Circle className="text-[#04C669]" size={20} />
      ) : (
        <IoMdRadioButtonOff size={20} />
      )}
    </div>
  );
}
