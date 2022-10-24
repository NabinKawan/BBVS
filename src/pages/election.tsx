import React, { useEffect, useRef, useState } from 'react';
import ElectionCard from '../components/election/ElectionCard';
import CountUp from 'react-countup';
import { totalVoted, totalVoters } from '../dummy/data';
import ElectionCDetails from '../shared/ElectionDetails';
import ElectionDetails from '../shared/ElectionDetails';
import ContractService from '../services/ContractService';

export default function Election() {
  const [votersPercent, setVotePercent] = useState(0);
  const [votersCount, setVotersCount] = useState(0);
  const [reload, setReload] = useState(false);
  const [endTime, setEndTime] = useState(0);
  const [isElectionStarted, setElectionStatus] = useState(false);

  const getElectionResult = () => {
    setElectionStatus(false);
    ContractService.getResults().then((val) => {
      console.log(val);
    });
  };

  const votersRef = useRef({ votersPercent: 0, incVoters: 0 });
  useEffect(() => {
    ContractService.getVotingEndTime().then((val) => {
      if (val) {
        if (val !== endTime) {
          console.log({ end_time: val });
          const date = new Date();
          const nowTime = date.getTime() / 1000;
          if (val - nowTime > 0) {
            setElectionStatus(true);
            setEndTime(val);
          }
        }
      }
    });

    if (votersPercent === 0) {
      const votePercent = (totalVoted / totalVoters) * 100;
      const incVoters = totalVoters / totalVoted / 10;
      votersRef.current.votersPercent = votePercent;
      votersRef.current.incVoters = incVoters;
    }

    if (votersPercent === 0 || votersPercent < votersRef.current.votersPercent) {
      setVotePercent(votersPercent + 0.1);
      setVotersCount(votersCount + votersRef.current.incVoters);
      setReload(!reload);
    }
  }, [reload]);

  return isElectionStarted ? (
    <div className="flex flex-col w-screen h-screen justify-center font-sans">
      <ElectionDetails
        onElectionEnd={getElectionResult}
        endTime={endTime}
        message="Class Election is going on. You can see the results after the election session is ended."
      />
    </div>
  ) : (
    <div className="flex flex-col items-start py-20 font-sans  bg-gray-50  px-64">
      <p className="font-bold text-3xl mb-24 text-gray-800"> Voting result for Class Election</p>
      <div className="flex flex-row w-full h-full ">
        <div className=" flex flex-col    w-1/2 space-y-10  ">
          <p className="font-bold text-xl text-gray-800"> For CR</p>

          <ElectionCard
            votePercent={80}
            name={'Nabin Kawan'}
            voteAmount={26}
            image={'/images/profile.jpeg'}
          />
          <ElectionCard votePercent={50} name={'Sudeep Kasichhwa'} voteAmount={15} />
          <ElectionCard
            votePercent={20}
            name={'Niraj Duwal'}
            voteAmount={8}
            image="/images/monkey.jpg"
          />
          <ElectionCard votePercent={10} name={'Sakar Paudel'} voteAmount={4} />

          {/* <div className="w-full h-1 rounded-full bg-gray-200 my-2"></div> */}
        </div>
        <div className="flex flex-col w-1/2 space-y-10">
          <p className="font-bold text-xl text-gray-800 mt-20"> For Vice-CR</p>
          <ElectionCard
            votePercent={80}
            name={'Nabin Kawan'}
            voteAmount={26}
            image={'/images/profile.jpeg'}
          />
          <ElectionCard votePercent={50} name={'Sudeep Kasichhwa'} voteAmount={15} />
          <ElectionCard
            votePercent={20}
            name={'Niraj Duwal'}
            voteAmount={8}
            image="/images/monkey.jpg"
          />
          <ElectionCard votePercent={10} name={'Sakar Paudel'} voteAmount={4} />
        </div>
        {/* voting details  */}
        {/* <div className="flex flex-col space-y-4 w-1/3">
          <div className="w-full mb-4">
            <div className="flex flex-col space-y-4 rounded-xl shadow-lg px-8 py-4 bg-white">
              <p className="font-normal text-sm text-gray-700 ">Voters</p>
              <p className="font-bold text-5xl">{votersCount.toFixed(0)}</p>
            </div>
          </div> */}

        {/* <p className="font-semibold text-sm text-gray-500">Votes count</p>

          <div className="flex  items-center justify-between">
            <div className="flex  rounded-full h-14 w-96 bg-blue-100">
              <div
                className={`flex items-center pl-8 rounded-full h-14 
                 bg-blue-300 shadow-lg shadow-blue-200
                `}
                style={{ width: `${votersPercent}%` }}
              >
                <p className="font-semibold text-xl text-white">{votersPercent.toFixed(0)}%</p>
              </div>
            </div>
            <p className="font-medium text-base text-gray-500">Voted</p>
          </div> */}
        {/* 
          <div className="flex  items-center justify-between ">
            <div className="flex  rounded-full h-14 w-96 bg-blue-100">
              <div
                className={`flex items-center pl-8 rounded-full h-14 
                 bg-green-300 shadow-lg shadow-green-200
                `}
                style={{ width: `${votersPercent}%` }}
              >
                <p className="font-semibold text-xl text-white">{votersPercent.toFixed(0)}%</p>
              </div>
            </div>
            <p className="font-medium text-base text-gray-500">CR</p>
          </div> */}
        {/* 
          <div className="flex  items-center justify-between">
            <div className="flex  rounded-full h-14 w-96 bg-blue-100">
              <div
                className={`flex items-center pl-8 rounded-full h-14 
                 bg-yellow-300 shadow-lg shadow-yellow-200
                `}
                style={{ width: `${votersPercent}%` }}
              >
                <p className="font-semibold text-xl text-white">{votersPercent.toFixed(0)}%</p>
              </div>
            </div>
            <p className="font-medium text-base text-gray-500"> Vice CR</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
