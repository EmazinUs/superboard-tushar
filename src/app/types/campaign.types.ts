import { StaticImageData } from 'next/image';
import { Quest } from './quests.types';

export interface CampaignProgress {
  completedQuests: number;
  totalQuests: number;
  earnedPoints: number;
  totalPoints: number;
  completionPercentage: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

export interface RewardCampaign {
  id: number;
  title: string;
  description: string;
  rewardAmount: number;
  rewardType: 'points' | 'tokens' | 'nft';
  imageUrl: string | StaticImageData;
  endDate: string;
}

export interface Campaign {
  id: number;
  title: string;
  description: string;
  imageUrl: string | StaticImageData;
  chainName: string;
  chainIcon: string | StaticImageData;
  questCount: number;
  chadCount: number;
  status: 'active' | 'completed' | 'upcoming';
  startDate: string;
  endDate: string;
  isLive: boolean;
  socialLinks: {
    website?: string;
    twitter?: string;
    discord?: string;
  };
}

export interface LeaderboardUser {
  rank: number;
  username: string;
  score: number;
  totalPoints: number;
}

export interface LeaderboardProps {
  entries: LeaderboardUser[];
  userRank?: {
    isLocked: boolean;
    message: string;
  };
}

export interface CampaignDetail extends Campaign {
  progress: CampaignProgress;
  reward: RewardCampaign;
  quests?: Quest[];
  leaderboard?: LeaderboardProps;
}
