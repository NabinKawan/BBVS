import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ElectionResultDto } from '../../models/dto/ContractDtos';
import CompilerService from '../../services/CompilerService';
import ContractService from '../../services/ContractService';
import { getElectedCandidates } from '../../utils/electionUtils';
import ElectionCard from './ElectionCard';

export default function ElectionResult() {
  const [totalVoters, setTotalVoters] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [electionName, setElectionName] = useState('');
  const [votingResults, setVotingResults] = useState([]);
  const [postArr, setPostArr] = useState([]);
  const [electedCandidates, setElectedCandidates] = useState([]);

  const getElectionDetails = () => {
    try {
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

      CompilerService.getElectionName().then((val) => {
        if (val) {
          if (electionName !== val) setElectionName(val);
        }
      });
    } catch (e: any) {
      toast.error(e.message, { autoClose: 2000 });
    }
  };

  const getFormatVotingResults = () => {
    getElectionDetails();

    CompilerService.getResults()
      .then((results: []) => {
        let posts_: string[] = [];
        let formattedResults: any[] = [];
        results.forEach((e: ElectionResultDto) => {
          const result = {
            name: '',
            imageUrl: '',
            candidateId: '',
            post: '',
            voteCount: 0,
            logo: '',
          };
          posts_.push(e.post);
          result.name = e.name;
          result.post = e.post;
          result.imageUrl = e.image_url;
          result.candidateId = e.candidate_id;
          result.voteCount = e.votecount;
          result.logo = e.logo;
          formattedResults.push(result);
        });
        const postSet = new Set(posts_);
        posts_ = Array.from(postSet);
        const electedCandidates_ = getElectedCandidates(Array.from(postSet), formattedResults);
        //@ts-ignore
        setElectedCandidates(electedCandidates_);
        const newPosts: string[] = [];
        //@ts-ignore
        while (posts_.length) newPosts.push(posts_.splice(0, 2));
        //@ts-ignore
        setPostArr(newPosts);
        formattedResults.sort(function (a: any, b: any) {
          return b.voteCount - a.voteCount;
        });

        //@ts-ignore
        setVotingResults(formattedResults);
      })
      .catch((e) => {
        toast.error(e.message, { autoClose: 2000 });
      });
  };

  useEffect(() => {
    getFormatVotingResults();
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-y-auto items-start py-20 font-sans  bg-white  xl:px-20 2xl:px-64">
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 px-4 sm:px-12 w-full justify-between items-start lg:items-center lg:px-20  2xl:px-20 3xl:px-44">
        <div
          className="flex items-center ml-0 md:-ml-4 cursor-pointer "
          onClick={() => {
            Router.push('/login');
          }}
        >
          <img src="logos/logo.png" />
          <div className="flex flex-col justify-center">
            <p className="font-bold  text-2xl text-[#202020]">BBVS</p>
            <p className="font-medium text-base text-[#979797]">Blockchain Based Voting System</p>
          </div>
        </div>

        <p className=" text-3xl  text-gray-800"> Voting result of {electionName}</p>
      </div>
      <div className="flex rounded-sm flex-col w-full bg-gray-100 mt-20">
        <p className="font-medium text-lg pl-2 pt-4 text-gray-800"> {electionName}</p>

        <div className="flex flex-col rounded-sm border-l border-gray-200 bg-white ml-2 mt-8 w-full h-full pt-12 space-y-12">
          {postArr.map((posts, index) => (
            <div
              key={index}
              className="flex flex-col space-y-12 lg:flex-row w-full lg:divide-x-2 lg:space-y-0  "
            >
              {
                //@ts-ignore
                posts.map(
                  (post: string) =>
                    index % 1 == 0 && (
                      <div key={post} className=" flex flex-col w-full lg:w-1/2 px-6    ">
                        <p className="font-semibold text-lg text-gray-800 pb-3"> {post}</p>
                        <div className="w-full h-[2px] bg-gray-200"></div>
                        <div className="flex flex-col  pt-6">
                          {votingResults.map(
                            (result: any, index) =>
                              post === result.post && (
                                <ElectionCard
                                  isElected={
                                    //@ts-ignore
                                    electedCandidates.includes(result.candidateId)
                                  }
                                  key={result.candidateId}
                                  candidateId={result.candidateId}
                                  name={result.name}
                                  voteCount={result.voteCount}
                                  totalVotes={totalVotes}
                                  image={result.imageUrl}
                                  logo={result.logo}
                                />
                              ),
                          )}
                        </div>
                      </div>
                    ),
                )
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
