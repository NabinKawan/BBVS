import { motion } from 'framer-motion';
import React from 'react';

interface ElectionCardProps {
  totalVotes: number;
  image: string;
  name: string;
  isElected?: boolean;
  voteCount: number;
}

export default function ElectionCard({
  name,
  isElected = false,
  voteCount,
  totalVotes,
  image = '/images/noprofile.png',
}: ElectionCardProps) {
  let pollColor = '';
  const votePercent = (voteCount / totalVotes) * 100;
  if (votePercent >= 80) {
    pollColor = 'bg-lime-500 shadow-md shadow-gray-100';
  }

  if (votePercent >= 50 && votePercent < 80) {
    pollColor = 'bg-pink-500 shadow-md shadow-gray-100';
  }

  if (votePercent < 50) {
    pollColor = 'bg-red-500 shadow-md shadow-gray-100';
  }

  const pollWidth = `w-[80%]`;

  return (
    <div
      // initial={{ x: -200 }}
      // animate={{ x: 0 }}
      // transition={{ ease: 'easeOut', duration: 1.5 }}
      className="flex flex-col bg- font-sans items-start bg-white justify-center p-4 space-y-3  w-full"
    >
      <div className="flex w-full justify-between  items-start text-gray-900">
        <div className="flex  items-center  space-x-6 ">
          <img
            className="rounded-full"
            style={{ objectFit: 'cover', height: 50, width: 50 }}
            src={image === '' ? 'images/noprofile.png' : `${image}`}
          />
          <div className="flex flex-col  text-base text-gray-900">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="font-medium text-lg ">{name}</p>
                <p className="text-sm text-gray-500">KCE075BCT020</p>
                {isElected && (
                  <div className="flex justify-center w-20 items-center py-1 px-1 mt-1 text-sm bg-green-600 text-white rounded-full">
                    Elected
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="font-medium">{voteCount} votes</p>
      </div>
      <div className="flex rounded-lg mt-3 bg-gray-200 w-full h-2 ">
        <div className={`rounded-md ${pollColor} h-2`} style={{ width: `${votePercent}%` }}></div>
      </div>
    </div>
  );
}
