import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ElectionResultDto } from '../../models/dto/ContractDtos';
import ContractService from '../../services/ContractService';
import ElectionCard from './ElectionCard';

export default function ElectionResult() {
  const [totalVoters, setTotalVoters] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [electionName, setElectionName] = useState('');
  const [votingResults, setVotingResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const [electedCandidates, setElectedCandidates] = useState([]);

  const getDetails = () => {
    try {
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

      ContractService.getElectionName().then((val) => {
        if (val) {
          if (electionName !== val) setElectionName(val);
        }
      });
    } catch (e: any) {
      toast.error(e.message, { autoClose: 2000 });
    }
  };

  const getFormatVotingResults = () => {
    getDetails();

    ContractService.getResults()
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
          };
          posts_.push(e.post);
          result.name = e.name;
          result.post = e.post;
          result.imageUrl = e.imageUrl;
          result.candidateId = e.candidateId;
          result.voteCount = e.voteCount.toNumber();
          formattedResults.push(result);
        });
        const postSet = new Set(posts_);
        posts_ = Array.from(postSet);
        //@ts-ignore
        setPosts(posts_);
        formattedResults.sort(function (a: any, b: any) {
          return b.voteCount - a.voteCount;
        });
        console.log({ formattedResults });
        const electedCandidates_: any[] = [];
        electedCandidates_.push(formattedResults[0].candidateId);
        electedCandidates_.push(formattedResults[1].candidateId);
        console.log(electedCandidates);
        //@ts-ignore
        setElectedCandidates(electedCandidates_);
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
    <div className="flex flex-col h-screen overflow-y-auto items-start py-20 font-sans  bg-white  px-64">
      <div className="flex w-full justify-between items-center px-44">
        <div className="flex items-center">
          <img src="logos/logo.png" />
          <div className="flex flex-col justify-center">
            <p className="font-bold  text-2xl text-[#202020]">BBVS</p>
            <p className="font-medium text-base text-[#979797]">Blockchain Based Voting System</p>
          </div>
        </div>

        <p className=" text-3xl  text-gray-800"> Voting result of {electionName}</p>
      </div>
      <div className="flex rounded-sm flex-col w-full bg-gray-100 mt-20">
        <p className="font-medium text-lg pl-2 pt-4 text-gray-800"> Class Election</p>

        <div className="flex rounded-sm border-l border-gray-200 bg-white ml-2 mt-8 flex-row w-full h-full divide-x-2 py-12 ">
          {posts.map((post) => (
            <div className=" flex flex-col w-1/2 px-6 ">
              <p className="font-semibold text-lg text-gray-800 pb-3"> {post}</p>
              <div className="w-full h-[2px] bg-gray-200"></div>
              <div className="flex flex-col  pt-6">
                {votingResults.map(
                  (result: any, index) =>
                    post === result.post && (
                      <ElectionCard
                        isElected={electedCandidates.includes(result.candidateId) ? true : false}
                        key={result.candidateId}
                        name={result.name}
                        voteCount={result.voteCount}
                        totalVotes={totalVotes}
                        image={result.imageUrl}
                      />
                    ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
