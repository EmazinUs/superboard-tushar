import { RewardCampaign } from '../types/campaign.types';
import { Quest } from '../types/quests.types';
import { mockApiRequest } from './api';
import { createDummyQuest } from './questDataGenerate';

const mockRewardCampaign: RewardCampaign = {
  rewardTitle: 'Assemble on Soneium: $25K Up for Grabs!',
  rewardDescription:
    'Complete all quests and loops, stack SUPR points, and climb the leaderboard for your share of $25,000 in rewards!',
  startTime: '2025-04-15T23:59:00.000Z',
  endTime: '2025-05-16T10:26:00.000Z',
};

export const CampaignService = {
  getCampaignQuests: async (campaignId: string): Promise<Quest[]> => {
    const mockQuests: Quest[] = Array.from({ length: 12 }, (_, i) => createDummyQuest(i));
    return mockApiRequest(mockQuests);
  },

  getRewardCampaign: async (campaignId: string): Promise<RewardCampaign> =>
    new Promise(resolve => setTimeout(() => resolve(mockRewardCampaign), 300)),
};
