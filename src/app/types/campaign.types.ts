export type RewardCampaign = {
  rewardTitle: string;
  rewardDescription: string;
  startTime: string;
  endTime: string;
};

export type LeaderboardUser = {
  rank: number;
  username: string;
  score: number;
  totalPoints: number;
};

export type Campaign = {
  id: number;
  title: string;
  slug: string;
  hasLeaderboard: boolean;
  isActive: boolean;
  description: string;
  uiProperties: {
    primaryColor: string;
    secondaryColor: string;
    images: string;
  };
  socialMediaAccounts: {
    twitter: string;
    website: string;
  };
  totalQuests: number;
  chads: number;
  chain: string;
};
