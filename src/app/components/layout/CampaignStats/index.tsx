'use client';
import React from 'react';
import './CampaignStats.scss';
import CampaignStatsCard from '../../common/campaignStatsCard';
import { rewardProgressCat } from '@/app/assets/exportData';
import { useCampaign } from '@/app/context/campaignContext';

interface CampaignStatsProps {
  className?: string;
}

const CampaignStats: React.FC<CampaignStatsProps> = ({ className = '' }) => {
  const { campaignReward, campaignProgress, isLoadingDetails } = useCampaign();

  return (
    <div className={`campaign-stats ${className}`}>
      <CampaignStatsCard
        type="rewards"
        title="REWARDS"
        value={`${campaignReward?.rewardAmount || 0} ${campaignReward?.rewardType || ''}`}
        description={campaignReward?.description || ''}
        imageUrl={rewardProgressCat}
        isLoading={isLoadingDetails}
      />

      <CampaignStatsCard
        type="progress"
        title="CAMPAIGN PROGRESS"
        value={`${campaignProgress?.completedQuests || 0}/${campaignProgress?.totalQuests || 0} Quests Completed`}
        description={`${campaignProgress?.completionPercentage || 0}% Complete - ${campaignProgress?.earnedPoints || 0} Points Earned`}
        imageUrl={rewardProgressCat}
        isLoading={isLoadingDetails}
      />
    </div>
  );
};

export default CampaignStats;
