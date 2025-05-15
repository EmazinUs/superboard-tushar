'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Globe, Twitter } from 'lucide-react';
import './CampaignCard.scss';

interface CampaignCardProps {
  title: string;
  description: string;
  imageUrl: string;
  liveStatus?: boolean;
  questCount: number;
  chadCount: number;
  chainName: string;
  chainIcon?: string;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  title,
  description,
  imageUrl,
  liveStatus = false,
  questCount,
  chadCount,
  chainName,
  chainIcon,
}) => (
  <div className="campaign-left-section">
    <div className="image-container">
      {liveStatus && (
        <div className="live-indicator">
          <span className="live-icon">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                fill="currentColor"
              />
              <circle cx="12" cy="12" r="5" fill="currentColor" />
            </svg>
          </span>
          <span className="live-text">LIVE</span>
        </div>
      )}
      <Image src={imageUrl} alt={title} fill className="campaign-image" priority />
    </div>

    <div className="campaign-info">
      <div className="campaign-type">CAMPAIGN</div>
      <h1 className="campaign-title">{title}</h1>
      <p className="campaign-description">{description}</p>

      <div className="social-links">
        <Link href="#" className="social-icon">
          <Globe size={20} />
        </Link>
        <Link href="#" className="social-icon">
          <Twitter size={20} />
        </Link>
        <Link href="#" className="social-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 4H16.5C17.12 4 17.72 4.25 18.17 4.67C18.61 5.09 18.88 5.67 18.88 6.29V14.25C18.88 14.88 18.61 15.46 18.17 15.88C17.72 16.3 17.12 16.55 16.5 16.55H13.37L9.75 19.17C9.62 19.26 9.44 19.28 9.31 19.19C9.19 19.11 9.12 18.98 9.12 18.83V16.55H7.5C6.88 16.55 6.28 16.3 5.83 15.88C5.39 15.46 5.12 14.88 5.12 14.25V6.29C5.12 5.67 5.39 5.09 5.83 4.67C6.28 4.25 6.88 4 7.5 4Z"
              fill="currentColor"
            />
          </svg>
        </Link>
      </div>

      <div className="stats-container">
        <div className="stat">
          <div className="stat-label">Quests</div>
          <div className="stat-value">{questCount}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Chads</div>
          <div className="stat-value">{chadCount.toLocaleString()}</div>
        </div>
        <div className="stat chain">
          <div className="stat-label">Chain</div>
          <div className="chain-info">
            {chainIcon && (
              <div className="chain-icon">
                <Image src={chainIcon} alt={chainName} width={20} height={20} />
              </div>
            )}
            <div className="chain-name">{chainName}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CampaignCard;
