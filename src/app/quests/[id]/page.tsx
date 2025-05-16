'use client';
import React from 'react';
import Container from '@/app/components/common/container';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import './QuestDetails.scss';
import { useParams } from 'next/navigation';

const QuestDetailsPage = () => {
  const params = useParams();
  const questId = params.id;

  const questDetails = {
    title: 'Quest Title',
    description: 'Detailed description of the quest and what users need to do to complete it.',
    imageUrl: '/quest_images/image_1.png',
    rewardAmount: '1000',
    coinIcon: '/coin-box.svg',
    status: 'active',
    completionSteps: [
      'Connect your wallet',
      'Complete the task',
      'Verify your participation',
      'Claim your rewards',
    ],
    requirements: [
      'Must have a compatible wallet',
      'Must complete within the campaign duration',
      'Must follow all guidelines',
    ],
  };

  return (
    <div className="quest-details-page">
      <Container>
        <div className="quest-details-content">
          <div className="quest-header">
            <Link href="/campaign" className="back-link">
              <ChevronLeft className="icon" /> BACK TO CAMPAIGN
            </Link>
          </div>

          <div className="quest-main">
            <div className="quest-image-container">
              <Image
                src={questDetails.imageUrl}
                alt={questDetails.title}
                fill
                className="quest-image"
                priority
              />
              <div className="quest-reward">
                <div className="reward-badge">
                  <Image
                    src={questDetails.coinIcon}
                    alt="Reward coin"
                    width={25}
                    height={20}
                    className="coin-icon"
                  />
                  <span className="reward-amount">{questDetails.rewardAmount}</span>
                </div>
              </div>
            </div>

            <div className="quest-info">
              <h1 className="quest-title">{questDetails.title}</h1>
              <p className="quest-description">{questDetails.description}</p>

              <div className="quest-section">
                <h2>How to Complete</h2>
                <ol className="completion-steps">
                  {questDetails.completionSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="quest-section">
                <h2>Requirements</h2>
                <ul className="requirements-list">
                  {questDetails.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <button className="start-quest-btn">Start Quest</button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default QuestDetailsPage;
