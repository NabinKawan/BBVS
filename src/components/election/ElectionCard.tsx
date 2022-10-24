import { motion } from 'framer-motion';
import React from 'react';

interface ElectionCardProps {
  votePercent: number;
  image?: string;
  name: string;
  voteAmount: number;
}

export default function ElectionCard({
  name,
  voteAmount,
  votePercent,
  image = '/images/noprofile.png',
}: ElectionCardProps) {
  let pollColor = '';

  if (votePercent >= 80) {
    pollColor = 'bg-green-300 shadow-md shadow-green-200';
  }

  if (votePercent >= 50 && votePercent < 80) {
    pollColor = 'bg-yellow-200 shadow-md shadow-yellow-100';
  }

  if (votePercent < 50) {
    pollColor = 'bg-red-400 shadow-md shadow-red-200';
  }

  const pollWidth = `w-[80%]`;

  return (
    <div
      // initial={{ x: -200 }}
      // animate={{ x: 0 }}
      // transition={{ ease: 'easeOut', duration: 1.5 }}
      className="flex flex-col font-sans items-start bg-white justify-center p-4 space-y-3 rounded-xl shadow-lg w-full"
    >
      <div className="flex w-full space-x-6 items-center">
        <div className="flex flex-col items-center space-y-2">
          <img
            className="rounded-full"
            src={image}
            style={{ objectFit: 'cover', height: 60, width: 60 }}
          />
          <p className="font-medium text-sm text-green-500">CR</p>
        </div>

        <div className="flex flex-col w-full text-base">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="font-bold ">{name}</p>
              <p className="text-xs font-medium text-gray-500">KCE075BCT020</p>
            </div>
          </div>

          <div className="flex rounded-lg mt-3 bg-gray-100 w-full h-[6px] ">
            <div
              className={`rounded-lg ${pollColor} h-[6px]`}
              style={{ width: `${votePercent}%` }}
            ></div>
          </div>
          <p className="mt-2 text-xs font-medium">{`${voteAmount} votes`}</p>
        </div>
      </div>
    </div>
  );
}
