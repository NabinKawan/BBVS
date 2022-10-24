import React, { useEffect, useState } from 'react';
import ContractService from '../services/ContractService';

interface ElectionDetailsProps {
  message: string;
}

export default function ElectionDetails({ message }: ElectionDetailsProps) {
  const [totalVoters, setTotalVoters] = useState(0);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [totalVotes, setTotalVoter] = useState(0);
  const [electionName, setElectionName] = useState('');

  useEffect(() => {
    ContractService.getTotalVotes().then((val) => {
      if (val) {
        setTotalVoters(val);
      }
    });

    ContractService.getVotersCount().then((val) => {
      if (val) {
        setTotalVoters(val);
      }
    });

    ContractService.getCandidatesCount().then((val) => {
      if (val) {
        setTotalCandidates(val);
      }
    });

    ContractService.getElectionName().then((val) => {
      if (val) {
        setElectionName(val);
      }
    });
  }, []);
  return (
    <div className="flex flex-col w-full items-center">
      <p className="font-bold text-2xl  text-black">{electionName}</p>

      <div className="flex mx-12 w-full justify-center space-x-24 my-20 ">
        <div className="flex w-44 flex-col space-y-4  border-t-4 border-green-600 shadow-lg px-8 py-4 bg-white ">
          <p className="font-normal text-sm text-gray-700 ">Total Votes</p>
          <p className="font-bold text-5xl">
            {/* <CountUp startVal={0} end={255} duration={1.5} /> */}
            {totalVotes}
          </p>
        </div>

        <div className="flex w-44 flex-col space-y-4  border-t-4 border-blue-600 shadow-lg px-8 py-4 bg-white ">
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

      <div className="flex  items-center flex-col space-y-8 mx-12 py-4 bg-white ">
        <p className=" text-sm pt-2  text-gray-500">{message}</p>

        <div className="flex space-x-12">
          <div className="flex flex-col space-y-4">
            <p className="font-normal text-5xl">
              {/* <CountUp startVal={0} end={255} duration={1.5} /> */}
              {60}
            </p>
            <p className="font-normal text-sm text-gray-700 ">minutes</p>
          </div>

          <div className="flex flex-col space-y-4">
            <p className="font-normal text-5xl">
              {/* <CountUp startVal={0} end={255} duration={1.5} /> */}
              {40}
            </p>
            <p className="font-normal text-sm text-gray-700 ">seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
}
