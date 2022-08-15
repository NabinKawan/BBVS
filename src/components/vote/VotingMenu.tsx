import React, { useState, useContext } from 'react';
import { VotingContextDto } from '../../models/dto/ContextDtos';
import 'react-circular-progressbar/dist/styles.css';
import RoundedProgressBar from '../../shared/progressBar/RoundedProgressBar';
import ProgressStepCard from './ProgressStepCard';
import { posts } from '../../dummy/data';
import RoundedTextBtn from '../../shared/button/RoundedTextBtn';
import VotingContext from '../../context/voting/VotingContext';
import Swal from 'sweetalert2';
import 'animate.css';
import router from 'next/router';

export default function VotingMenu() {
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const votingProvider = useContext(VotingContext) as VotingContextDto;

  const onVote = () => {
    if (votingProvider.completedSteps.length === posts.length) {
      // router.push('/congratulations');
      Swal.fire({
        title: 'Please wait',
        text: 'Your vote is being submitting',
        timer: 5000,
        allowOutsideClick: false,
        allowEnterKey: false,
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        didOpen: () => {
          Swal.showLoading();
        },

        showConfirmButton: false,
      }).then((result) => {
        /* Read more about handling dismissals below */

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
            router.push('/login');
            votingProvider.clearVotes();
          }
        });
      });
    }
  };

  return (
    <div className="flex flex-col bg-white shadow-2xl shadow-blue-900 h-screen w-1/4 p-8">
      {/* logo details*/}
      <div className="flex items-center space-x-1">
        <img src="logos/logo.png" />
        <div className="flex flex-col justify-center">
          <p className="font-bold  text-xl text-[#202020]">BBVS</p>
          <p className="font-medium text-sm text-[#979797]">Blockchain Based Voting System</p>
        </div>
      </div>

      {/* profile details */}
      <div className="flex rounded-xl items-center bg-[#F1F1F1] p-4 space-x-4 my-8">
        <img src="images/profile_img.png" />
        <div className="flex flex-col space-y-1">
          <p className="font-medium text-lg">Nabin Kawan</p>
          <p className="font-medium text-sm text-[#838383]">Voter_id: 1256</p>
        </div>
      </div>

      {/* progress details */}
      <div className="flex flex-col items-start my-8">
        <p className="font-medium text-sm text-[#717171] mb-2">2 steps to complete the vote.</p>
        <RoundedProgressBar
          barColor={'bg-primary'}
          fillPercentage={(votingProvider.completedSteps.length / posts.length) * 100}
          height={15}
        />

        {/* progress steps */}
        <div className="flex flex-col space-y-4 w-full">
          {posts.map((e, index) => (
            <ProgressStepCard
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
          votingProvider.completedSteps.length === posts.length
            ? 'cursor-pointer '
            : 'cursor-not-allowed'
        }`}
      >
        <RoundedTextBtn
          text={'Submit'}
          loading={loading}
          bgColor={
            votingProvider.completedSteps.length === posts.length ? 'bg-primary ' : 'bg-[#C6C6C6]'
          }
        />
      </div>
    </div>
  );
}
