import React, { useContext, useEffect, useState } from 'react';
import { candidates, posts } from '../../dummy/data';
import VotingCard from './VotingCard';
import VotingContext from '../../context/voting/VotingContext';
import CandidateContext from '../../context/candidate/CandidateContext';
import { VotingContextDto, CandidateContextDto } from '../../models/dto/ContextDtos';
import ServerOp from '../../services/ServerOp';
import { CandidateDto } from '../../models/dto/ServerOpDtos';
import DrawerButton from '../ui/drawer-button';
import RoundedTextBtn from '../../shared/button/RoundedTextBtn';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AnimatePresence } from 'framer-motion';
import TransistionAnimation from '../animations/tansistion-animation';
import VotingResultCard from './VotingResultCard';
import { toast } from 'react-toastify';
import Router from 'next/router';
import Swal from 'sweetalert2';
import { CachNamesEnum } from '../../models/enums/CacheEnums';
import CachService from '../../services/CacheService';
import { MdEditOff } from 'react-icons/md';
import RoundedIconBtn from '../../shared/button/RoundedIconBtn';
import CompilerService from '../../services/CompilerService';
import { copyToClipboard } from '../../utils/transactionUtils';
import ContractService from '../../services/ContractService';

export default function VotingContainer() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isEdit, setEdit] = useState(false);
  const [electionName, setElectionName] = useState('');
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
        text: 'Your vote is being submitted',
        allowOutsideClick: false,
        allowEnterKey: false,
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        didOpen: () => {
          Swal.showLoading();
          ContractService.vote(votingProvider.voter.voter_id, votingProvider.getVotes())
            .then((val) => {
              if (val) {
                toast.success('Voted successfully', { autoClose: 2000 });
                Swal.close();
                Swal.fire({
                  icon: 'success',
                  title: 'Congratulations',
                  html: `Your vote has been submitted successfully.<br/><br/><b>Transaction hash:</b><br/>${val}`,
                  allowOutsideClick: false,
                  allowEnterKey: false,
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp',
                  },
                  showConfirmButton: true,
                  showDenyButton: true,
                  denyButtonText: 'CopyTxHash',
                  denyButtonColor: '#9c9c9c',
                  confirmButtonText: 'Done',
                  confirmButtonColor: '#1c4e80',
                }).then((result) => {
                  /* Read more about handling dismissals below */
                  if (result.isConfirmed) {
                    CachService.deleteCache(CachNamesEnum.Voter).then((value) => {
                      if (value) {
                        Router.push('/login');
                        votingProvider.clearVotes();
                      }
                    });
                  } else if (result.isDenied) {
                    copyToClipboard(val);
                    setTimeout(() => {
                      CachService.deleteCache(CachNamesEnum.Voter).then((value) => {
                        if (value) {
                          Router.push('/login');
                          votingProvider.clearVotes();
                        }
                      });
                    }, 1000);
                  }
                });
              }
            })
            .catch((e) => {
              toast.error(e.message, { autoClose: 2000 });
              CachService.deleteCache(CachNamesEnum.Voter).then((value) => {
                if (value) {
                  Router.push('/login');
                  votingProvider.clearVotes();
                }
              });
              votingProvider.clearVotes();
              Swal.close();
            });
        },

        showConfirmButton: false,
      });
    }
  };

  const getSubmitComponent = () => {
    return (
      <div>
        <p className="font-bold text-xl text-black mb-6">Your votes</p>

        <div
          onClick={onVote}
          className={`flex w-28 mb-10 ${
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
        <div className="space-y-8">
          {
            // @ts-ignore
            Object.values(votingProvider.votes).map((candidate: CandidateDto, index) => {
              return (
                <VotingResultCard
                  key={index}
                  candidate={candidate}
                  handleEdit={() => {
                    setCurrentPage(index);
                    setEdit(true);
                  }}
                />
              );
            })
          }
        </div>
      </div>
    );
  };

  const handleNext = () => {
    if (currentPage < candidateProvider.posts.length) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleVote = (candidate: CandidateDto | null) => {
    debugger;
    votingProvider.addVote(candidateProvider.posts[currentPage], candidate);
    votingProvider.addStep(candidateProvider.posts[currentPage]);
    setTimeout(() => {
      if (isEdit) {
        setCurrentPage(candidateProvider.posts.length);
        setEdit(!isEdit);
      } else {
        setCurrentPage(currentPage + 1);
      }
    }, 500);
  };
  useEffect(() => {
    ContractService.getElectionName()
      .then((val) => {
        if (val) {
          if (electionName !== val) setElectionName(val);
        }
      })
      .catch((e) => {
        toast.error(e.message, { autoClose: 2000 });
      });
  });
  return (
    <div className="w-full  min-h-full overflow-y-auto bg-AdminBg px-6 md:px-16 py-8">
      <DrawerButton drawerType="VOTING" />
      <div className="w-full  bg-AdminBg ">
        {/* title */}
        <div className=" font-medium text-[#575353] text-lg ">{electionName}</div>
        <div className="flex justify-between my-12 -ml-1">
          <div
            className={`flex font-medium space-x-2 cursor-pointer ${
              currentPage > 0 ? 'text-gray-700' : 'text-gray-300'
            }`}
            onClick={handlePrev}
          >
            <IoIosArrowBack size={24} /> <p>Previous</p>
          </div>

          <div
            className={`flex font-medium space-x-2 cursor-pointer ${
              currentPage < candidateProvider.posts.length ? 'text-gray-700' : 'text-gray-300'
            }`}
            onClick={handleNext}
          >
            <p>Next</p> <IoIosArrowForward size={24} />
          </div>
        </div>
        <AnimatePresence mode="wait">
          <TransistionAnimation key={currentPage}>
            {currentPage === candidateProvider.posts.length ? (
              getSubmitComponent()
            ) : (
              <div className="flex flex-col mb-20 divide-y-2 divide-gray-200">
                <div className="flex flex-col pb-32">
                  <div className="flex flex-col ">
                    <p className="font-bold text-xl text-black">{`Vote for ${candidateProvider.posts[currentPage]}`}</p>
                    <p className="font-medium text-sm text-[#717171] mt-2">{`Choose your ${candidateProvider.posts[currentPage]}`}</p>
                    <div className="w-32 mt-8">
                      <RoundedIconBtn
                        icon={<MdEditOff size={20} />}
                        text={'No Vote'}
                        // loading={loading}
                        bgColor={'bg-red-300 hover:bg-red-400 '}
                        onClick={() => {
                          handleVote(null);
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-8 mt-14">
                    {
                      // @ts-ignore
                      candidateProvider.candidates.map(
                        (e: CandidateDto) =>
                          e.post === candidateProvider.posts[currentPage] && (
                            <VotingCard
                              key={e.candidate_id}
                              candidate={e}
                              isSelected={Object.values(votingProvider.votes).includes(e)}
                              onClick={() => {
                                handleVote(e);
                              }}
                            />
                          ),
                      )
                    }
                  </div>
                </div>
              </div>
            )}
          </TransistionAnimation>
        </AnimatePresence>
      </div>
    </div>
  );
}
