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

export default function VotingMenu() {
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const votingProvider = useContext(VotingContext) as VotingContextDto;
  // @ts-ignore
  const candidateProvider = useContext(CandidateContext) as CandidateContextDto;

  const onVote = () => {
    if (votingProvider.completedSteps.length === candidateProvider.posts.length) {
      // router.push('/congratulations');
      Swal.fire({
        title: 'Please wait',
        text: 'Your vote is being submitting',
        allowOutsideClick: false,
        allowEnterKey: false,
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        didOpen: () => {
          Swal.showLoading();
          ContractService.vote(votingProvider.voter.voter_id, Object.values(votingProvider.votes))
            .then((val) => {
              if (val) {
                toast.success('Voted successfully', { autoClose: 2000 });
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: 'Congratulations',
                  text: 'Your vote has been submitted successfully',
                  timer: 2000,
                  allowOutsideClick: false,
                  allowEnterKey: false,
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp',
                  },

                  showConfirmButton: false,
                }).then((result) => {
                  /* Read more about handling dismissals below */
                  if (result.dismiss === Swal.DismissReason.timer) {
                    CachService.deleteCache(CachNamesEnum.Voter).then((value) => {
                      if (value) {
                        Router.push('/login');
                        votingProvider.clearVotes();
                      }
                    });
                  }
                });
              }
            })
            .catch((e) => {
              toast.error(e.message, { autoClose: 2000 });
              Swal.close();
            });
        },

        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="flex flex-col bg-white drop-shadow-2xl shadow-blue-900 h-screen w-1/5 p-8">
      {/* logo details*/}
      <div className="flex items-center space-x-1">
        <img src="logos/logo.png" />
        <div className="flex flex-col justify-center">
          <p className="font-bold  text-xl text-[#202020]">BBVS</p>
          <p className="font-medium text-sm text-[#979797]">Blockchain Based Voting System</p>
        </div>
      </div>

      {/* profile details */}
      <div className="flex rounded-xl items-center bg-primary p-4 space-x-4 my-8">
        <img
          className="rounded-full"
          height={60}
          width={60}
          src={
            votingProvider.voter.image !== ''
              ? `http://${votingProvider.voter.image}`
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

      {/* progress details */}
      <div className="flex flex-col items-start my-8">
        <p className="font-medium text-sm text-[#717171] mb-2">2 steps to complete the vote.</p>
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

      {/* submit */}
      <div
        onClick={onVote}
        className={`flex w-28 ${
          votingProvider.completedSteps.length === candidateProvider.posts.length
            ? 'cursor-pointer '
            : 'cursor-not-allowed'
        }`}
      >
        <RoundedTextBtn
          text={'Submit'}
          loading={loading}
          bgColor={
            votingProvider.completedSteps.length === candidateProvider.posts.length
              ? 'bg-primary '
              : 'bg-[#C6C6C6]'
          }
        />
      </div>
    </div>
  );
}
