'use client';
import React, { useEffect } from 'react';
import './CampaignPage.scss';
import Container from '@/app/components/common/container';
import Link from 'next/link';
import { ChevronLeft, Copy } from 'lucide-react';
import CampaignStats from '@/app/components/layout/CampaignStats';
import SegmentControl from '@/app/components/common/segmentControl';
import QuestCard from '@/app/components/common/questCard';
import questImage from '@/app/assets/quest_images/image_1.png';
import coinBoxImage from '@/app/assets/coin-box.svg';
import CampaignCard from '@/app/components/layout/CampaignCard';
import { useCampaign } from '@/app/context/campaignContext';

const MOCK_CAMPAIGN_ID = 11;

const CampaignPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('QUESTS');

  const { selectedCampaign, campaignQuests, isLoadingDetails, selectCampaign } = useCampaign();

  useEffect(() => {
    selectCampaign(MOCK_CAMPAIGN_ID);
  }, [selectCampaign]);

  if (isLoadingDetails || !selectedCampaign) {
    return (
      <div className="campaign-page">
        <Container>
          <div className="loading-container">
            <div className="loading-spinner" />
            <p>Loading campaign details...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="campaign-page">
      <Container>
        <div className="campaign-layout">
          <div className="campaign-left">
            <div className="campaign-cards">
              <CampaignCard
                title={selectedCampaign.title}
                description={selectedCampaign.description}
                imageUrl={selectedCampaign.imageUrl}
                liveStatus={selectedCampaign.isLive}
                questCount={selectedCampaign.questCount}
                chadCount={selectedCampaign.chadCount}
                chainName={selectedCampaign.chainName}
                chainIcon={selectedCampaign.chainIcon}
                reward={`${selectedCampaign.reward.rewardAmount} ${selectedCampaign.reward.rewardType}`}
              />
            </div>
          </div>

          <div className="campaign-right">
            <div className="campaign-header">
              <Link href="/campaigns" className="back-link">
                <ChevronLeft className="iconClass" /> ALL CAMPAIGNS
              </Link>
              <div className="campaign-actions">
                <button className="share-button">
                  <Copy className="iconClass" /> SHARE
                </button>
              </div>
            </div>

            <div className="campaign-stats-cards">
              <CampaignStats />
            </div>

            <SegmentControl
              segments={['QUESTS', 'LEADERBOARD']}
              activeSegment={activeTab}
              onChange={setActiveTab}
            />

            <div className="campaign-quests">
              {(campaignQuests || []).map((quest, index) => (
                <QuestCard
                  key={quest.id || index}
                  href={`/quests/${quest.id}`}
                  backgroundImage={quest.imageUrl || questImage.src}
                  coinIcon={coinBoxImage.src}
                  rewardAmount={quest.rewardAmount}
                  title={quest.title}
                  tag={quest.tag || 'Quest'}
                  chadsCount={`${quest.chadsCount || 0} CHADS`}
                  boardLabel="SUPERBOARD"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CampaignPage;
