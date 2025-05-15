import {
  Campaign,
  CampaignDetail,
  CampaignProgress,
  LeaderboardUser,
  RewardCampaign,
} from '../types/campaign.types';
import { Quest } from '../types/quests.types';
import { generateRandomAddress } from '../utils/randomUserAddressGenerate';
import { mockApiRequest } from './api';
import {
  mockCampaign,
  mockCampaignDetail,
  mockCampaignProgress,
  mockRewardCampaign,
} from './mockData';
import { createDummyQuest } from './questDataGenerate';

export const CampaignService = {
  getCampaignById: async (id: number): Promise<CampaignDetail> =>
    mockApiRequest(mockCampaignDetail),

  getCampaigns: async (): Promise<Campaign[]> => {
    const campaigns = Array.from({ length: 5 }, (_, i) => ({
      ...mockCampaign,
      id: i + 1,
      title: `${mockCampaign.title} ${i + 1}`,
    }));
    return mockApiRequest(campaigns);
  },

  getCampaignQuests: async (campaignId: number): Promise<Quest[]> => {
    const mockQuests = Array.from({ length: 12 }, (_, i) => createDummyQuest(i));
    return mockApiRequest(mockQuests);
  },

  getCampaignProgress: async (campaignId: number): Promise<CampaignProgress> =>
    mockApiRequest(mockCampaignProgress),

  getCampaignReward: async (campaignId: number): Promise<RewardCampaign> =>
    mockApiRequest(mockRewardCampaign),

  getMockLeaderboard: async (): Promise<LeaderboardUser[]> => {
    const data = Array.from({ length: 50 }, (_, i) => ({
      rank: i + 1,
      username: generateRandomAddress(),
      score: Math.floor(Math.random() * 5000) + 1000 + parseFloat((Math.random() * 200).toFixed(6)),
      totalPoints: Math.floor(Math.random() * 5000) + 1000,
    }));

    data.sort((a, b) => b.score - a.score);
    data.forEach((item, idx) => {
      item.rank = idx + 1;
    });

    return mockApiRequest(data);
  },
};
