'use client';
import React from 'react';
import Image from 'next/image';
import './questCard.scss';
import { QuestCardProps } from '@/app/types/global.types';

const QuestCard: React.FC<QuestCardProps> = ({
  href = '#',
  backgroundImage: backgroundImage,
  coinIcon,
  rewardAmount,
  title,
  tag,
  chadsCount,
  boardLabel,
}) => (
  <div className="quest-link">
    <div className="quest-card">
      <div className="image-wrapper">
        <Image src={backgroundImage} alt="Quest Background" fill className={'image-background'} />
        <div className="reward-tag">
          <div className="reward-badge">
            <Image src={coinIcon} alt="coin" width={25} height={20} className="coin-icon" />
            <span className="reward-text">{rewardAmount}</span>
          </div>
        </div>
      </div>

      <div className="card-content">
        <h3 className="title">{title}</h3>
        <span className="quest-tag">{tag}</span>
        <div className="meta">
          <span className="chads">{chadsCount}</span>
          <span className="board">{boardLabel}</span>
        </div>
      </div>
    </div>
  </div>
);

export default QuestCard;
