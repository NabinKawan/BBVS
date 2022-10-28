import React, { useEffect, useRef, useState } from 'react';
import ElectionCard from '../components/election/ElectionCard';
import CountUp from 'react-countup';
import { totalVoted, totalVoters } from '../dummy/data';
import ElectionCDetails from '../shared/ElectionDetails';
import ElectionDetails from '../shared/ElectionDetails';
import ContractService from '../services/ContractService';
import { toast } from 'react-toastify';
import ElectionResult from '../components/election/ElectionResult';
import Swal from 'sweetalert2';

export default function Election() {
  const [votersPercent, setVotePercent] = useState(0);
  const [votersCount, setVotersCount] = useState(0);
  const [reload, setReload] = useState(false);
  const [endTime, setEndTime] = useState(0);
  const [isElectionStarted, setElectionStatus] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const getElectionResult = () => {
    Swal.fire({
      title: 'Please wait',
      text: 'We are navigating you to election result. This may take a while.',
      allowOutsideClick: false,
      allowEnterKey: false,
      timer: 30000,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((val) => {
      setElectionStatus(false);
    });
  };

  // const votersRef = useRef({ votersPercent: 0, incVoters: 0 });
  useEffect(() => {
    ContractService.getVotingEndTime()
      .then((val) => {
        if (val) {
          if (val !== endTime) {
            console.log({ end_time: val });
            const date = new Date();
            const nowTime = date.getTime() / 1000;
            if (val - nowTime > 0) {
              setElectionStatus(true);
              setEndTime(val);
            }
            setIsFetched(true);
          }
        }
      })
      .catch((e) => {
        toast.error(e.message, { autoClose: 2000 });
      });

    // if (votersPercent === 0) {
    //   const votePercent = (totalVoted / totalVoters) * 100;
    //   const incVoters = totalVoters / totalVoted / 10;
    //   votersRef.current.votersPercent = votePercent;
    //   votersRef.current.incVoters = incVoters;
    // }

    // if (votersPercent === 0 || votersPercent < votersRef.current.votersPercent) {
    //   setVotePercent(votersPercent + 0.1);
    //   setVotersCount(votersCount + votersRef.current.incVoters);
    //   setReload(!reload);
    // }
  }, []);

  return (
    isFetched &&
    (isElectionStarted ? (
      <div className="flex flex-col w-screen h-screen justify-start font-sans bg-white">
        <ElectionDetails
          onElectionEnd={getElectionResult}
          endTime={endTime}
          isElectionPage
          message="Class Election is going on. You can see the results after the election session is ended."
        />
      </div>
    ) : (
      <ElectionResult />
    ))
  );
}
