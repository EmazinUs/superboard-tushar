'use client';
import React from 'react';
import Image from 'next/image';
import './questCard.scss';
import { QuestCardProps } from '@/app/types/global.types';
import { formatNumberToK } from '@/app/utils/dataFormat';
import Link from 'next/link';
import { Hourglass, CheckCircle } from 'lucide-react';

const QuestCard: React.FC<QuestCardProps> = ({
  href,
  backgroundImage,
  coinIcon,
  rewardAmount,
  title,
  tag,
  chadsCount,
  boardLabel,
  isQuestStarted = false,
  isQuestCompleted = false,
}) => (
  <Link href={href.toLowerCase().replace(/\s+/g, '-')} className="quest-link">
    <div className={`quest-card ${isQuestCompleted ? 'quest-card--completed' : ''}`}>
      <div className="image-wrapper">
        <Image src={backgroundImage} alt="Quest Background" fill className="image-background" />
        <div className="reward-tag">
          <div className="reward-badge">
            <Image src={coinIcon} alt="coin" width={25} height={20} className="coin-icon" />
            <span className="reward-text">{rewardAmount}</span>
          </div>
        </div>

        {isQuestCompleted && (
          <div className="completion-badge">
            <CheckCircle size={20} />
            <span>Completed</span>
          </div>
        )}
      </div>

      <div className="card-content">
        <h3 className="title">
          {title}
          {isQuestCompleted && <CheckCircle size={16} className="title-completion-icon" />}
        </h3>
        <span className="quest-tag">{tag}</span>
        <div className="meta">
          {isQuestCompleted ? (
            <span className="completed">
              <CheckCircle size={16} />
              <span>Completed</span>
            </span>
          ) : isQuestStarted ? (
            <span className="in-progress">
              <Hourglass size={16} />
              <span>In Progress</span>
            </span>
          ) : (
            <span className="chads">{formatNumberToK(chadsCount)}</span>
          )}
          <span className="board">{boardLabel}</span>
        </div>
      </div>
    </div>
  </Link>
);

export default QuestCard;
