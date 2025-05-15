import React from 'react';
import Image from 'next/image';
import './LeaderBoard.scss';
import { LeaderboardProps } from '@/app/types/campaign.types';
import { bronzeMedal, goldMedal, silverMedal, globalIcon } from '@/app/assets/exportData';
import { formatId, formatPoints, formatScore } from '@/app/utils/dataFormat';
import { RankCard } from '@/app/components/common/rankCard';

const LeaderBoard: React.FC<LeaderboardProps> = ({ entries, userRank }) => {
  const getMedalImage = (rank: number) => {
    if (rank === 1) return goldMedal;
    if (rank === 2) return silverMedal;
    if (rank === 3) return bronzeMedal;
    return null;
  };

  return (
    <div className="leaderboard-wrapper">
      {userRank && (
        <div className="user-rank-banner">
          <RankCard isLocked={userRank.isLocked} userRank={userRank} />
        </div>
      )}

      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <div className="earth-icon">
            <Image src={globalIcon} alt="Global icon" width={24} height={24} />
          </div>
          <h2>Campaign leaderboard</h2>
        </div>

        <div className="leaderboard-table">
          <div className="table-header">
            <div className="column rank-col">Rank</div>
            <div className="column user-col">User</div>
            <div className="column earned-col">Earned SUPR</div>
            <div className="column points-col">Points</div>
          </div>

          <div className="table-body">
            {entries.map(entry => (
              <div key={entry.rank} className={`table-row ${entry.rank <= 3 ? 'top-three' : ''}`}>
                <div className="column rank-col">
                  {getMedalImage(entry.rank) ? (
                    <div className="medal-container">
                      <Image
                        src={getMedalImage(entry.rank) as string}
                        alt={`Rank ${entry.rank}`}
                        width={24}
                        height={24}
                      />
                    </div>
                  ) : (
                    <span>{entry.rank}</span>
                  )}
                </div>
                <div className="column user-col">{formatId(entry.username)}</div>
                <div className="column earned-col">{formatScore(entry.score)}</div>
                <div className="column points-col">{formatPoints(entry.totalPoints)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
