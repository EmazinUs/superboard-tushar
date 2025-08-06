import {
  Campaign,
  CampaignDetail,
  CampaignProgress,
  RewardCampaign,
} from '../types/campaign.types';
import { rariIcon, rewardProgressCat } from '../assets/exportData';
import { quest1 } from '../assets/exportData';

export const mockCampaignProgress: CampaignProgress = {
  completedQuests: 8,
  totalQuests: 26,
  earnedPoints: 2500,
  totalPoints: 10000,
  completionPercentage: 30.77,
  status: 'in_progress',
};

export const mockRewardCampaign: RewardCampaign = {
  id: 11,
  title: 'Assemble on Soneium: $25K Up for Grabs!',
  description:
    'Complete all quests and loops, stack SUPR points, and climb the leaderboard for your share of $25,000 in rewards!',
  rewardAmount: 25000,
  rewardType: 'tokens',
  imageUrl: rewardProgressCat,
  endDate: '2025-05-16T10:26:00.000Z',
};

export const mockCampaign: Campaign = {
  id: 11,
  title: 'Assemble on Soneium',
  description:
    'Swap, stake, bridge, and mint your way to the top! Complete quests, stack SUPR points, and climb the leaderboard to claim your share of $25,000 in rewards.',
  imageUrl: quest1,
  chainName: 'Soneium',
  chainIcon: rariIcon,
  questCount: 26,
  chadCount: 434342,
  status: 'active',
  startDate: '2025-04-15T23:59:00.000Z',
  endDate: '2025-05-16T10:26:00.000Z',
  isLive: true,
  socialLinks: {
    website: 'https://soneium.org/',
    twitter: 'https://x.com/soneium',
    discord: 'https://discord.gg/soneium',
  },
};

export const mockCampaignDetail: CampaignDetail = {
  ...mockCampaign,
  progress: mockCampaignProgress,
  reward: mockRewardCampaign,
};
