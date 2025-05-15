'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  Campaign,
  CampaignDetail,
  CampaignProgress,
  LeaderboardProps,
  RewardCampaign,
} from '../types/campaign.types';
import { Quest } from '../types/quests.types';
import { CampaignService } from '../services/campaignService';

interface CampaignContextType {
  // Campaign lists and details
  campaigns: Campaign[];
  selectedCampaign: CampaignDetail | null;

  // Campaign components
  campaignQuests: Quest[];
  campaignProgress: CampaignProgress | null;
  campaignReward: RewardCampaign | null;
  leaderboard: LeaderboardProps | null;

  // Loading states
  isLoadingCampaigns: boolean;
  isLoadingDetails: boolean;

  // Actions
  selectCampaign: (id: number) => Promise<void>;
  refreshCampaignData: () => Promise<void>;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

interface CampaignProviderProps {
  children: ReactNode;
}

export const CampaignProvider: React.FC<CampaignProviderProps> = ({ children }) => {
  // State for campaigns list
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignDetail | null>(null);

  // State for campaign components
  const [campaignQuests, setCampaignQuests] = useState<Quest[]>([]);
  const [campaignProgress, setCampaignProgress] = useState<CampaignProgress | null>(null);
  const [campaignReward, setCampaignReward] = useState<RewardCampaign | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardProps | null>(null);

  // Loading states
  const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Fetch initial campaigns data
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = React.useCallback(async () => {
    try {
      setIsLoadingCampaigns(true);
      const fetchedCampaigns = await CampaignService.getCampaigns();
      setCampaigns(fetchedCampaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setIsLoadingCampaigns(false);
    }
  }, []);

  const selectCampaign = React.useCallback(async (id: number) => {
    try {
      setIsLoadingDetails(true);

      // Fetch all campaign details in parallel
      const [campaignDetail, quests, progress, reward, leaderboardData] = await Promise.all([
        CampaignService.getCampaignById(id),
        CampaignService.getCampaignQuests(id),
        CampaignService.getCampaignProgress(id),
        CampaignService.getCampaignReward(id),
        CampaignService.getMockLeaderboard(),
      ]);

      setSelectedCampaign(campaignDetail);
      setCampaignQuests(quests);
      setCampaignProgress(progress);
      setCampaignReward(reward);
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Error fetching campaign details:', error);
    } finally {
      setIsLoadingDetails(false);
    }
  }, []);

  const refreshCampaignData = React.useCallback(async () => {
    if (selectedCampaign) {
      await selectCampaign(selectedCampaign.id);
    }
    await fetchCampaigns();
  }, [selectedCampaign, selectCampaign, fetchCampaigns]);

  const value = {
    campaigns,
    selectedCampaign,
    campaignQuests,
    campaignProgress,
    campaignReward,
    leaderboard,
    isLoadingCampaigns,
    isLoadingDetails,
    selectCampaign,
    refreshCampaignData,
  };

  return <CampaignContext.Provider value={value}>{children}</CampaignContext.Provider>;
};

// Custom hook to use the campaign context
export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};
