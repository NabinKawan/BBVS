import { hasDuplicates, removeDuplicates } from './helperUtils';

function checkForElectedCandidates(candidates: any) {
  const voteCounts = removeDuplicates(candidates.map((candidate: any) => candidate.voteCount));

  const hasSameVotes = hasDuplicates(voteCounts);
  if (hasSameVotes) {
    return null;
  } else if (voteCounts[0] === 0) {
    return null;
  }

  return candidates[0].candidateId;
}

export const getElectedCandidates = (posts_: any, candidates: any) => {
  const electedCandidates: any = [];
  const groupByCategory = candidates.reduce((group: any, candidate: any) => {
    const { post } = candidate;
    group[post] = group[post] ?? [];
    group[post].push(candidate);
    return group;
  }, {});

  posts_.forEach((post: any) => {
    groupByCategory[`${post}`].sort((a: any, b: any) => b.voteCount - a.voteCount);
    const electedCandidate = checkForElectedCandidates(groupByCategory[`${post}`]);

    if (electedCandidate) {
      electedCandidates.push(electedCandidate);
    }
  });
  return electedCandidates;
};
