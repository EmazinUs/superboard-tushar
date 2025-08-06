'use client';
import React, { useEffect, useState, useCallback } from 'react';
import './CampaignPage.scss';
import Container from '@/app/components/common/container';
import Link from 'next/link';
import { ChevronLeft, Copy, Check } from 'lucide-react';
import CampaignStats from '@/app/components/layout/CampaignStats';
import SegmentControl from '@/app/components/common/segmentControl';
import QuestCard from '@/app/components/common/questCard';
import LeaderBoard from '@/app/components/layout/LeaderBoard';
import questImage from '@/app/assets/quest_images/image_1.png';
import coinBoxImage from '@/app/assets/coin-box.svg';
import CampaignCard from '@/app/components/layout/CampaignCard';
import { useCampaign } from '@/app/context/campaignContext';

const MOCK_CAMPAIGN_ID = 11;

const CampaignPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('QUESTS');
  const [copyStatus, setCopyStatus] = useState('idle');

  const { selectedCampaign, campaignQuests, leaderboard, isLoadingDetails, selectCampaign } =
    useCampaign();

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus('copied');

      // Reset after 2 sec
      setTimeout(() => {
        setCopyStatus('idle');
      }, 800);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  }, []);

  useEffect(() => {
    selectCampaign(MOCK_CAMPAIGN_ID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <Link href="/campaign" className="back-link">
                <ChevronLeft className="iconClass" /> ALL CAMPAIGNS
              </Link>
              <div className="campaign-actions">
                <button
                  className="share-button"
                  onClick={handleCopyLink}
                  aria-label="Share campaign"
                >
                  {copyStatus === 'idle' ? (
                    <>
                      <Copy size={16} className="iconClass" /> SHARE
                    </>
                  ) : (
                    <>
                      <Check size={16} className="iconClass" /> URL COPIED
                    </>
                  )}
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
              ariaLabel="Campaign tabs"
            />

            {activeTab === 'QUESTS' ? (
              <div className="campaign-quests">
                {(campaignQuests || []).map((quest, index) => (
                  <QuestCard
                    key={quest.id || index}
                    href={`/quests/${quest.title}` || '#'}
                    backgroundImage={quest.imageUrl || questImage.src}
                    coinIcon={coinBoxImage.src}
                    rewardAmount={quest.rewardAmount}
                    title={quest.title}
                    tag={quest.tag || 'Quest'}
                    chadsCount={`${quest.chadsCount.toString() || 0} CHADS`}
                    boardLabel="SUPERBOARD"
                    isQuestStarted={quest.isQuestStarted}
                    isQuestCompleted={quest.isCompleted}
                  />
                ))}
              </div>
            ) : (
              leaderboard && <LeaderBoard {...leaderboard} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CampaignPage;
