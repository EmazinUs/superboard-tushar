import { Campaign, RewardCampaign } from '../types/campaign.types';
import { Quest } from '../types/quests.types';
import { mockApiRequest } from './api';
import { mockCampaigns, mockRewardCampaign } from './mockData';
import { createDummyQuest } from './questDataGenerate';

export const CampaignService = {
  getCampaignQuests: async (campaignId: number): Promise<Quest[]> => {
    const mockQuests: Quest[] = Array.from({ length: 12 }, (_, i) => createDummyQuest(i));
    return mockApiRequest(mockQuests);
  },

  getRewardCampaign: async (): Promise<RewardCampaign> => mockApiRequest(mockRewardCampaign),

  getCampaigns: async (): Promise<Campaign> => mockApiRequest(mockCampaigns),
};
