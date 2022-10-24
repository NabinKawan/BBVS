import React, { useEffect, useState } from 'react';
import ContractService from '../services/ContractService';

interface ElectionDetailsProps {
  message: string;
  endTime: number;
  onElectionEnd: any;
}

export default function ElectionDetails({ message, endTime, onElectionEnd }: ElectionDetailsProps) {
  const [totalVoters, setTotalVoters] = useState(0);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [electionName, setElectionName] = useState('');
  const [timer, setTimer] = useState('00 : 00 : 00');

  const getTimeRemaining = () => {
    const total = endTime * 1000 - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = () => {
    let { total, hours, minutes, seconds } = getTimeRemaining();
    console.log(total);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) +
          ' : ' +
          (minutes > 9 ? minutes : '0' + minutes) +
          ' : ' +
          (seconds > 9 ? seconds : '0' + seconds),
      );
      getDetails();
    } else {
      onElectionEnd();
    }
  };

  const getDetails = () => {
    ContractService.getTotalVotes().then((val) => {
      if (val) {
        if (totalVotes !== val) setTotalVotes(val);
      }
    });

    ContractService.getVotersCount().then((val) => {
      if (val) {
        if (totalVoters !== val) setTotalVoters(val);
      }
    });

    ContractService.getCandidatesCount().then((val) => {
      if (val) {
        if (totalCandidates !== val) setTotalCandidates(val);
      }
    });
  };

  useEffect(() => {
    setInterval(() => {
      startTimer();
    }, 1000);
    getDetails();

    ContractService.getElectionName().then((val) => {
      if (val) {
        if (electionName !== val) setElectionName(val);
      }
    });
  }, []);
  return (
    <div className="flex flex-col w-full items-center text-gray-700">
      <p className="font-bold text-2xl  text-gray-700">{electionName}</p>

      <div className="flex mx-12 w-full justify-center space-x-24 my-20 ">
        <div className="flex w-44 flex-col space-y-4  border-t-4 border-green-600 shadow-lg px-8 py-4 bg-white ">
          <p className="font-normal text-sm text-gray-700 ">Total Votes</p>
          <p className="font-bold text-5xl">
            {/* <CountUp startVal={0} end={255} duration={1.5} /> */}
            {totalVotes}
          </p>
        </div>

        <div className="flex w-44 flex-col space-y-4  border-t-4 border-blue-600 shadow-lg px-8 py-4 bg-white t ">
          <p className="font-normal text-sm text-gray-700 ">Total Voters</p>
          <p className="font-bold text-5xl">
            {/* <CountUp startVal={0} end={255} duration={1.5} /> */}
            {totalVoters}
          </p>
        </div>

        <div className="flex w-44 flex-col space-y-4  border-t-4 border-orange-600 shadow-lg px-8 py-4 bg-white ">
          <p className="font-normal text-sm text-gray-700 ">Total Candidates</p>
          <p className="font-bold text-5xl">
            {/* <CountUp startVal={0} end={255} duration={1.5} /> */}
            {totalCandidates}
          </p>
        </div>
      </div>

      <div className="flex  items-center flex-col space-y-8 mx-12 py-4 text-gray-600 bg-white ">
        <p className=" text-sm pt-2  text-gray-500">{message}</p>

        <div className="flex space-x-12">
          <div className="flex flex-col space-y-4 items-center pt-4">
            <p className="font-normal text-5xl">
              {/* <CountUp startVal={0} end={255} duration={1.5} /> */}
              {timer}
            </p>
            <div className="flex space-x-10 justify-center pl-3">
              <p className="font-normal text-sm text-gray-700 ">hours</p>
              <p className="font-normal text-sm text-gray-700 ">minutes</p>
              <p className="font-normal text-sm text-gray-700 ">seconds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
