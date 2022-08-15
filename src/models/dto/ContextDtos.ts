export type AdminContextDto = {
  currentContainer: string;
  // @ts-ignore: Unreachable code error
  setCurrentContainer: (string) => null;
};

export type VotingContextDto = {
  completedSteps: string[];
  votes: {};
  addVote: (post: string, candidateId: string) => null;
  addStep: (step: string) => null;
  clearVotes: () => null;
};
