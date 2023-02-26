import { hasDuplicates, removeDuplicates } from './helperUtils';

function checkForElectedCandidates(candidates: any) {
  console.log({ candidates });
  const voteCounts = removeDuplicates(candidates.map((candidate: any) => candidate.voteCount));

  console.log({ voteCounts });
  const hasSameVotes = hasDuplicates(voteCounts);
  console.log({ hasSameVotes });
  if (hasSameVotes) {
    return null;
  }

  return candidates[0].candidateId;
}

export const getElectedCandidates = (posts_: any, candidates: any) => {
  console.log({ posts_ });
  const electedCandidates: any = [];
  const groupByCategory = candidates.reduce((group: any, candidate: any) => {
    const { post } = candidate;
    group[post] = group[post] ?? [];
    group[post].push(candidate);
    return group;
  }, {});
  console.log({ groupByCategory });

  posts_.forEach((post: any) => {
    groupByCategory[`${post}`].sort((a: any, b: any) => b.voteCount - a.voteCount);
    const electedCandidate = checkForElectedCandidates(groupByCategory[`${post}`]);
    console.log({ electedCandidate });
    if (electedCandidate) {
      electedCandidates.push(electedCandidate);
    }
  });
  return electedCandidates;
};
