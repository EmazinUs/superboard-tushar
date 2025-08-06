'use client';
import React from 'react';
import Image from 'next/image';
import './campaignStatsCard.scss';
import { Tally5, Trophy } from 'lucide-react';
import { CampaignStatsCardProps } from '@/app/types/global.types';

const CampaignStatsCard: React.FC<CampaignStatsCardProps> = ({
  type,
  title,
  value,
  description,
  imageUrl,
  isLoading = false,
}) => {
  const cardClassName = `campaign-stats-card ${type}-type`;

  return (
    <div className={cardClassName}>
      {isLoading ? (
        <div className="skeleton">
          <div className="skeleton-title"></div>
          <div className="skeleton-value"></div>
          <div className="skeleton-description"></div>
        </div>
      ) : (
        <>
          <div className="content">
            <div className="header">
              {type === 'rewards' && (
                <span className="icon">
                  <Trophy className="iconClass" />
                </span>
              )}
              {type === 'progress' && (
                <span className="icon">
                  <Tally5 className="iconClass" />
                </span>
              )}
              <h3 className="title">{title}</h3>
            </div>
            <div className="value-section">
              <h2 className="value">{value}</h2>
              <p className="description">{description}</p>
            </div>
          </div>
          <div className="image-container">
            <Image src={imageUrl} alt="Campaign icon" width={64} height={64} />
          </div>
        </>
      )}
    </div>
  );
};

export default CampaignStatsCard;
