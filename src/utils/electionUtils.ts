import { hasDuplicates, isEmpty, removeDuplicatesAndOriginal } from './helperUtils';

function checkForElectedCandidates(candidates: any) {
  const voteCounts = removeDuplicatesAndOriginal(
    candidates.map((candidate: any) => candidate.voteCount),
  );

  // const hasSameVotes = hasDuplicates(voteCounts);
  if (isEmpty(voteCounts)) {
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
