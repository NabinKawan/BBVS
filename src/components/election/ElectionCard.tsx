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
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ ease: 'easeOut', duration: 1.5 }}
      className="flex flex-col items-start bg-white justify-center p-4 space-y-3 rounded-xl shadow-lg w-full"
    >
      <div className="flex w-full space-x-6 items-center">
        <img className="rounded-full w-14 h-14" src={image} style={{ objectFit: 'cover' }} />

        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <p className="font-bold text-lg">{name}</p>
            <p className="font-semibold text-gray-900">{`${votePercent}%`}</p>
          </div>

          <div className="flex rounded-lg mt-5 bg-gray-100 w-full h-2 ">
            <div
              className={`rounded-lg ${pollColor} h-2`}
              style={{ width: `${votePercent}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm font-medium">{`${voteAmount} votes`}</p>
        </div>
      </div>
    </motion.div>
  );
}
