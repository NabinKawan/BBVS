import { motion } from 'framer-motion';
import React from 'react';
import environments from '../../configs/environments';

interface ElectionCardProps {
  totalVotes: number;
  candidateId: string;
  image: string;
  name: string;
  isElected?: boolean;
  voteCount: number;
  logo: string;
}

export default function ElectionCard({
  name,
  isElected = false,
  voteCount,
  totalVotes,
  candidateId,
  image = '/images/noprofile.png',
  logo,
}: ElectionCardProps) {
  console.log(logo);
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
        <div className="flex  items-start  space-x-6 ">
          <img
            className="rounded-full"
            style={{ objectFit: 'cover', height: 50, width: 50 }}
            src={image === '' ? 'images/noprofile.png' : `${environments.BBVS_API_URL}/${image}`}
          />
          <div className="flex flex-col  text-base text-gray-900">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="font-medium text-lg ">{name}</p>
                <p className="text-sm text-gray-500">{candidateId}</p>
                {isElected && (
                  <div className="flex justify-center w-20 items-center py-1 px-1 mt-1 text-sm bg-green-600 text-white rounded-lg">
                    Elected
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 items-start">
          <p className="font-medium">{voteCount} votes</p>
          {logo && <img className=" h-8" src={`${environments.BBVS_API_URL}/${logo}`} />}
        </div>
      </div>
      <div className="flex rounded-lg mt-3 bg-gray-200 w-full h-2 ">
        <div className={`rounded-md ${pollColor} h-2`} style={{ width: `${votePercent}%` }}></div>
      </div>
    </div>
  );
}
