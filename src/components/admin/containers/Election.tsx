import React, { useEffect, useState, useContext } from 'react';
import Router from 'next/router';
import { CandidateContextDto, VoterContextDto } from '../../../models/dto/ContextDtos';
import CandidateContext from '../../../context/candidate/CandidateContext';
import TextInputField from '../TextInputField';
import { TextFieldIdEnum } from '../../../models/enums/TextFieldEnums';
import RoundedTextBtn from '../../../shared/button/RoundedTextBtn';
import ElectionDetails from '../../../shared/ElectionDetails';
import VoterContext from '../../../context/voter/VoterContext';
import ContractService from '../../../services/ContractService';
import { ContractCandidateDto, ContractVoterDto } from '../../../models/dto/ContractDtos';
import { toast } from 'react-toastify';
import { AiOutlineLink } from 'react-icons/ai';
import CompilerService from '../../../services/CompilerService';

export default function Election() {
  // const [candidates, setCandidates] = useState<CandidateDto[]>([]);
  // @ts-ignore
  const candidateProvider = useContext(CandidateContext) as CandidateContextDto;

  //@ts-ignore
  const voterProvider = useContext(VoterContext) as VoterContextDto;

  const [formErrors, setFormErrors] = useState({
    electionName: '',
    electionEndTime: '',
  });

  const [isElectionStarted, setElectionStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [electionName, setElectionName] = useState('');
  const [electionEndTime, setElectionEndTime] = useState('');
  const [endTime, setEndTime] = useState(0);

  const handleElectionNameInput = (event: any) => {
    setElectionName(event?.target.value);
  };
  const hadndleEndTimeInput = (event: any) => {
    setElectionEndTime(event?.target.value);
  };

  const endElectionSession = () => {
    setElectionStatus(false);
  };

  const getEndTime = () => {
    const date = new Date();
    const nowTime = date.getTime() / 1000;
    return nowTime + parseInt(electionEndTime) * 60;
  };

  const handleSubmit = () => {
    formValidation();

    if (
      formErrors.electionName.length === 0 &&
      formErrors.electionEndTime.length === 0 &&
      !loading
    ) {
      setLoading(true);
      const contractCandidates: ContractCandidateDto[] = [];
      const contractVoters: ContractVoterDto[] = [];

      const posts: string[] = [];

      candidateProvider.candidates.forEach((candidate) => {
        const contractCandidate = { candidate_id: '', name: '', image_url: '', post: '', logo: '' };
        contractCandidate.name =
          candidate.first_name + ' ' + candidate.middle_name + ' ' + candidate.last_name;
        contractCandidate.image_url = candidate.image!;
        contractCandidate.logo = candidate.logo!;
        contractCandidate.post = candidate.post;
        contractCandidate.candidate_id = candidate.candidate_id;
        contractCandidates.push(contractCandidate);
        posts.push(candidate.post);
      });

      voterProvider.voters.forEach((voter) => {
        const contractVoter = { voterId: '', name: '', votedTo: [], isVoted: false };
        contractVoter.name = voter.first_name + ' ' + voter.middle_name + ' ' + voter.last_name;
        contractVoter.voterId = voter.voter_id;
        contractVoters.push(contractVoter);
      });
      const postsSet = new Set(posts);
      const posts_ = Array.from(postsSet);

      CompilerService.startElection(
        electionName,
        parseInt(electionEndTime),
        contractCandidates,
        contractVoters,
        posts_,
      )
        .catch((e) => {
          toast.error(e.message, { autoClose: 2000 });
          setLoading(false);
        })
        .then((val) => {
          if (val) {
            toast.success('Minted', { autoClose: 2000 });
            setElectionStatus(true);
            setLoading(false);
          }
        });
    }
  };

  useEffect(() => {
    CompilerService.getVotingEndTime()
      .then((val) => {
        if (val) {
          const date = new Date();
          const nowTime = date.getTime() / 1000;
          if (val - nowTime > 0) {
            setElectionStatus(true);
            setEndTime(val);
          }
        }
      })
      .catch((e) => {
        toast.error(e.message, { autoClose: 2000 });
      });
  }, []);
  return (
    <div className="flex flex-col">
      {/* title */}
      <p className="font-medium text-[#575353] text-lg ">Election</p>

      {/* container card*/}
      <div className="flex flex-col bg-white rounded-xl shadow-md mt-20 ">
        {!isElectionStarted && (
          <div className="flex flex-col ">
            <p className="font-bold text-lg pt-7 px-11 text-black">Election</p>

            <p className=" text-sm pt-2 pb-7 px-11 text-gray-500">
              All the candidates and voters inside the database will be uploaded into smartcontract.
            </p>
          </div>
        )}

        {/* election form */}
        {!isElectionStarted ? (
          <div className="flex flex-col  divide-gray-50  px-12 pb-8">
            {/* election card */}
            <div className="flex md:space-x-12">
              <div className="flex flex-col w-1/2 pt-4  text-sm justify-start space-y-2">
                <p className="text-[#424040] text-base mb-2">
                  Election<span className="text-red-500">*</span>
                </p>

                <input
                  className={`flex bg-[#F7F7F7] rounded-xl 
               text-[#242424]
               text-base px-6 py-4 outline-none w-full`}
                  placeholder={'Enter the election name.'}
                  value={electionName}
                  onChange={handleElectionNameInput}
                />
                {<p className="font-normal text-xs text-red-500">{formErrors.electionName}</p>}
              </div>

              <div className="flex flex-col w-64 pt-4  font-medium text-sm justify-start space-y-2">
                <p className="text-[#424040] text-base mb-2">
                  End time (minutes)<span className="text-red-500">*</span>
                </p>

                <input
                  type="number"
                  className={`flex bg-[#F7F7F7] rounded-xl 
               text-[#242424] 
               text-base px-6 py-4 outline-none w-full`}
                  placeholder={'30'}
                  value={electionEndTime}
                  onChange={hadndleEndTimeInput}
                />
                {<p className="font-normal text-xs text-red-500">{formErrors.electionEndTime}</p>}
              </div>
            </div>
            <div className="flex w-36 h-11 mt-8 ">
              {' '}
              <RoundedTextBtn
                text={'Start Election'}
                bgColor={'bg-primary'}
                onClick={handleSubmit}
                loading={loading}
              />
            </div>
            <div
              onClick={() => {
                Router.push('/election');
              }}
              className="flex space-x-2 pt-12 items-center cursor-pointer"
            >
              <p className=" text-sm   text-red-400">View recent election result</p>
              <AiOutlineLink className="text-red-400" />
            </div>
          </div>
        ) : (
          <div className="w-full h-full py-20">
            <ElectionDetails
              endTime={endTime !== 0 ? endTime : getEndTime()}
              onElectionEnd={endElectionSession}
              message="  You cannot start new election during the voting session, Once the election time is
        completed you can make a new election."
            />
          </div>
        )}
      </div>
    </div>
  );

  function formValidation() {
    const errors = formErrors;
    if (electionName.length === 0) {
      errors.electionName = 'Election Name is required';
    } else {
      errors.electionName = '';
    }
    if (electionEndTime.length === 0) {
      errors.electionEndTime = 'Election end time is required';
    } else {
      errors.electionEndTime = '';
    }

    setFormErrors({ electionName: errors.electionName, electionEndTime: errors.electionEndTime });
  }
}
