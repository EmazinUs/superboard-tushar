import { LockIcon } from 'lucide-react';
import Image from 'next/image';
import { avatar } from '@/app/assets/exportData';
import './rankCard.scss';

interface RankCardProps {
  isLocked: boolean;
  userRank: {
    isLocked: boolean;
    message: string;
  };
}

export const RankCard: React.FC<RankCardProps> = ({ isLocked, userRank }) => (
  <div className="rank-card">
    {isLocked ? (
      <>
        <div className="locked-rank">
          <div className="rank-info">
            <div className="lock-icon">
              <LockIcon size={20} />
            </div>
            <div className="you-badge">
              <Image src={avatar} alt="User avatar" width={24} height={24} />
              <span>You</span>
            </div>
            <div className="unlock-message">
              <div className="unlock-title">Unlock your rank</div>
              <div className="unlock-subtitle">Complete quests from campaign to view ranking</div>
            </div>
          </div>
          {/* <div className="rank-message">{userRank.message}</div> */}
        </div>
      </>
    ) : (
      <div className="unlocked-rank">
        <div className="you-badge">
          <Image src={avatar} alt="User avatar" width={24} height={24} priority />
          <span>You</span>
        </div>
        <div className="rank-text">{userRank.message}</div>
      </div>
    )}
  </div>
);
