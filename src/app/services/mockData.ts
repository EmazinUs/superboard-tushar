import { Campaign, RewardCampaign } from '../types/campaign.types';

export const mockCampaigns: Campaign = {
  id: 11,
  title: 'Assemble on Soneium',
  slug: 'assemble-on-soneium',
  hasLeaderboard: true,
  isActive: true,
  description:
    'Swap, stake, bridge, and mint your way to the top! Complete quests, stack SUPR points, and climb the leaderboard to claim your share of $25,000 in rewards.',
  uiProperties: {
    primaryColor: '#EC9DE9',
    secondaryColor: '#000000',
    images: 'https://cdn.superboard.xyz/uiProperties/images/newsol.png',
  },
  socialMediaAccounts: {
    twitter: 'https://x.com/soneium',
    website: 'https://soneium.org/',
  },
  totalQuests: 26,
  chads: 434342,
  chain: 'Sonieum',
};

export const mockRewardCampaign: RewardCampaign = {
  rewardTitle: 'Assemble on Soneium: $25K Up for Grabs!',
  rewardDescription:
    'Complete all quests and loops, stack SUPR points, and climb the leaderboard for your share of $25,000 in rewards!',
  startTime: '2025-04-15T23:59:00.000Z',
  endTime: '2025-05-16T10:26:00.000Z',
};
