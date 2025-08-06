import {
  Campaign,
  CampaignDetail,
  CampaignProgress,
  RewardCampaign,
  LeaderboardProps,
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

// Helper function to reset all progress data in localStorage (for testing only)
export const resetAllProgress = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('startedQuests');
    localStorage.removeItem('tasksProgress');
    console.log('All progress data has been reset for testing');
  }
};

// Uncomment to reset progress data when app loads
// setTimeout(() => resetAllProgress(), 2000);

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

  getMockLeaderboard: async (): Promise<LeaderboardProps> => {
    const entries = Array.from({ length: 50 }, (_, i) => ({
      rank: i + 1,
      username: generateRandomAddress(),
      score: Math.floor(Math.random() * 5000) + 1000 + parseFloat((Math.random() * 200).toFixed(6)),
      totalPoints: Math.floor(Math.random() * 5000) + 1000,
    }));

    entries.sort((a, b) => b.score - a.score);
    entries.forEach((item, idx) => {
      item.rank = idx + 1;
    });

    // Add user rank information
    const userRank = {
      // isLocked: Math.random() > 0.5,
      isLocked: true,
      message:
        Math.random() > 0.5
          ? 'Complete at least 3 quests to unlock your rank'
          : `You're ranked #${Math.floor(Math.random() * 50) + 1}`,
    };

    return mockApiRequest({
      entries,
      userRank,
    });
  },
};
