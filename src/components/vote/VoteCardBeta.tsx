import { motion } from 'framer-motion';
import React from 'react';
import { GoVerified } from 'react-icons/go';

interface VotingCardBetaProps {
  cid: number;
  image?: string;
  crn: string;
  name: string;
  disableClick: boolean;
  vote: number;
  setVote: Function;
}

export default function VotingCardBeta({
  name,
  crn,
  vote,
  cid,
  disableClick,
  setVote,
  image = '/images/noprofile.png',
}: VotingCardBetaProps) {
  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ ease: 'easeOut', duration: 1 }}
      onClick={() => {
        !disableClick && setVote(cid);
      }}
      className={`flex flex-col items-start cursor-pointer bg-white justify-center p-5 space-y-3 rounded-xl shadow-lg w-full ${
        cid === vote && 'ring-2 border border-blue-400 ring-blue-400 ml-6 shadow-lg shadow-green-50'
      }`}
    >
      <div className="flex w-full space-x-6 items-center">
        <img className="rounded-full w-14 h-14" src={image} style={{ objectFit: 'cover' }} />

        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <div className="flex flex-col space-y-1">
              <p className="font-semibold text-lg text-gray-800">{name}</p>
              <p className="font-medium text-sm text-gray-400">{crn}</p>
            </div>

            {cid === vote && (
              <GoVerified className="text-blue-500" size={30} />
              //   <div className="flex items-center justify-center font-medium  bg-blue-200 rounded-full p-3">
              //     {tag}
              //   </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
