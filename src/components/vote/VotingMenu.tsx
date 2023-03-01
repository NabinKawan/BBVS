import React, { useState, useContext } from 'react';
import { CandidateContextDto, VotingContextDto } from '../../models/dto/ContextDtos';
import 'react-circular-progressbar/dist/styles.css';
import RoundedProgressBar from '../../shared/progressBar/RoundedProgressBar';
import ProgressStepCard from './ProgressStepCard';
import { posts } from '../../dummy/data';
import RoundedTextBtn from '../../shared/button/RoundedTextBtn';
import VotingContext from '../../context/voting/VotingContext';
import CandidateContext from '../../context/candidate/CandidateContext';
import Swal from 'sweetalert2';
import 'animate.css';
import Router from 'next/router';
import { CachNamesEnum } from '../../models/enums/CacheEnums';
import CachService from '../../services/CacheService';
import ContractService from '../../services/ContractService';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { FiLogOut } from 'react-icons/fi';

interface VotingMenuProps {
  className?: string;
}

export default function VotingMenu({ className }: VotingMenuProps) {
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const votingProvider = useContext(VotingContext) as VotingContextDto;
  // @ts-ignore
  const candidateProvider = useContext(CandidateContext) as CandidateContextDto;

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      CachService.deleteCache(CachNamesEnum.Voter).then((value) => {
        if (value) {
          Router.push('/login');
        }
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className={className}>
      {/* logo details*/}
      <div className="flex items-center space-x-1 w-72 2xl:w-80">
        <img src="logos/logo.png" />
        <div className="flex flex-col justify-center">
          <p className="font-bold  text-xl text-[#202020]">BBVS</p>
          <p className="flex w-full font-medium text-sm text-[#979797]">
            Blockchain Based Voting System
          </p>
        </div>
      </div>

      {/* profile details */}
      <div className="flex rounded-xl items-center justify-between bg-[#1c4e80] space-x-4 p-4 my-8">
        <div className="flex items-center space-x-4">
          <img
            className="rounded-full"
            style={{ objectFit: 'cover', height: 60, width: 60 }}
            src={
              votingProvider.voter.image !== ''
                ? `${votingProvider.voter.image}`
                : 'images/noprofile.png'
            }
          />
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-base text-white">
              {`${votingProvider.voter.first_name} ${votingProvider.voter.middle_name} ${votingProvider.voter.last_name}`}
            </p>
            <p className="font-medium text-xs text-gray-400 bg-red">
              {`Voter_ID: ${votingProvider.voter.voter_id}`}
            </p>
          </div>
        </div>
        {loading ? (
          <CircularProgress color="inherit" size={22} />
        ) : (
          <FiLogOut
            onClick={handleLogout}
            className="text-gray-400 hover:text-white cursor-pointer ml-4"
            size={22}
          />
        )}
      </div>

      {/* progress details */}
      <div className="flex flex-col items-start my-8">
        <p className="font-medium text-sm text-[#717171] mb-2">
          {candidateProvider.posts.length} steps to complete the vote.
        </p>
        <RoundedProgressBar
          barColor={'bg-primary'}
          fillPercentage={
            (votingProvider.completedSteps.length / candidateProvider.posts.length) * 100
          }
          height={15}
        />

        {/* progress steps */}
        <div className="flex flex-col space-y-4 w-full">
          {candidateProvider.posts.map((e, index) => (
            <ProgressStepCard
              key={e}
              text={`${index + 1}. ${e}`}
              isCompleted={votingProvider.completedSteps.includes(e)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
