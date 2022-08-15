import React, { useState } from 'react';
import VoteCard from '../components/vote/VoteCard';
import CountUp from 'react-countup';
import { candidates } from '../dummy/data';

export default function Voting() {
  const [vote, setVote] = useState(0);

  return (
    <div className="flex flex-col space-y-32 items-center py-20 h-screen font-sans px-64 bg-loginBg">
      <p className="font-bold text-3xl mb-20 text-gray-800"> Voting for local election</p>
      <div className="grid grid-cols-4 gap-20 ">
        {candidates.map((e) => (
          <VoteCard cid={e.cid} vote={vote} name={e.name} setVote={setVote} image={e.image} />
        ))}
      </div>

      <div className="flex cursor-pointer justify-center items-center w-64 py-4 font-bold   bg-primary text-white rounded-xl shadow-md ">
        VOTE
      </div>
    </div>
  );
}
