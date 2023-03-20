import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import CompilerService from '../services/CompilerService';
import ContractService from '../services/ContractService';

interface ElectionDetailsProps {
  message: string;
  endTime: number;
  onElectionEnd: any;
  isElectionPage?: boolean;
}

export default function ElectionDetails({
  message,
  endTime,
  onElectionEnd,
  isElectionPage = false,
}: ElectionDetailsProps) {
  const [totalVoters, setTotalVoters] = useState(0);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [electionName, setElectionName] = useState('');
  const [timer, setTimer] = useState('00 : 00 : 00');
  const refreshIntervalId = useRef<NodeJS.Timer | null>(null);
  const detailsIntervalId = useRef<NodeJS.Timer | null>(null);
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

    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) +
          ' : ' +
          (minutes > 9 ? minutes : '0' + minutes) +
          ' : ' +
          (seconds > 9 ? seconds : '0' + seconds),
      );
      // getDetails();
    } else {
      clearInterval(refreshIntervalId.current!);
      clearInterval(detailsIntervalId.current!);
      onElectionEnd();
    }
  };

  const getDetails = () => {
    try {
      // CompilerService.getTotalVotes().then((val) => {
      //   debugger;
      // });
      CompilerService.getTotalVotes().then((val) => {
        if (val) {
          if (totalVotes !== val) setTotalVotes(val);
        }
      });

      CompilerService.getVotersCount().then((val) => {
        if (val) {
          if (totalVoters !== val) setTotalVoters(val);
        }
      });

      CompilerService.getCandidatesCount().then((val) => {
        if (val) {
          if (totalCandidates !== val) setTotalCandidates(val);
        }
      });
    } catch (e: any) {
      toast.error(e.message, { autoClose: 2000 });
    }
  };

  useEffect(() => {
    refreshIntervalId.current = setInterval(() => {
      startTimer();
    }, 1000);

    detailsIntervalId.current = setInterval(() => {
      getDetails();
    }, 4000);

    CompilerService.getElectionName()
      .then((val) => {
        if (val) {
          if (electionName !== val) setElectionName(val);
        }
      })
      .catch((e) => {
        toast.error(e.message, { autoClose: 2000 });
      });
  }, []);
  return (
    <div className="flex flex-col w-full items-center justify-start text-gray-700 min-h-screen bg-white">
      {isElectionPage && (
        <div className="flex w-full  items-start justify-start pb-24 px-8 pt-8">
          <div className="flex items-center">
            <img src="logos/logo.png" />
            <div className="flex flex-col justify-center">
              <p className="font-bold  text-2xl text-[#202020]">BBVS</p>
              <p className="font-medium text-base text-[#979797]">Blockchain Based Voting System</p>
            </div>
          </div>
        </div>
      )}
      {isElectionPage ? (
        <p className=" text-3xl  text-gray-800 pb-8 text-center">
          {' '}
          Voting session of {electionName}
        </p>
      ) : (
        <p className="font-bold text-2xl  text-gray-700">{electionName}</p>
      )}

      <div className="flex flex-col items-center space-x-0 space-y-8 sm:flex-row mx-12 w-full justify-center sm:space-x-4 md:space-x-24 sm:space-y-0 my-20 ">
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
        <p className=" text-sm pt-2  text-gray-500 text-center">{message}</p>

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
