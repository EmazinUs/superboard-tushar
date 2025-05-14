import { Campaign, LeaderboardUser, RewardCampaign } from '../types/campaign.types';
import { Quest } from '../types/quests.types';
import { generateRandomAddress } from '../utils/randomUserAddressGenerate';
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

  getMockLeaderboard: async (): Promise<LeaderboardUser[]> => {
    const data: LeaderboardUser[] = Array.from({ length: 50 }, (_, i) => {
      const totalPoints = Math.floor(Math.random() * 5000) + 1000;
      const score = totalPoints + parseFloat((Math.random() * 200).toFixed(6));

      return {
        rank: i + 1,
        username: generateRandomAddress(),
        score,
        totalPoints,
      };
    });

    // Sort by score descending
    data.sort((a, b) => b.score - a.score);

    // Assign correct rank after sort
    data.forEach((item, idx) => {
      item.rank = idx + 1;
    });

    return new Promise(resolve => setTimeout(() => resolve(data), 300));
  },
};
