import React from 'react';
import './questSkeleton.scss';

interface QuestSkeletonProps {
  isLoading?: boolean;
}

const QuestSkeleton: React.FC<QuestSkeletonProps> = ({ isLoading = true }) => (
  <div className="quest-container skeleton">
    <div className="quest-content">
      <div className="rewards-bar skeleton-item">
        <div className="skeleton-text skeleton-text-short"></div>
        <div className="skeleton-rewards-count"></div>
      </div>

      <div className="main-content">
        <div className="info-section">
          <div className="header">
            <div className="superboard skeleton-item">
              <div className="skeleton-circle-sm"></div>
              <div className="skeleton-text skeleton-text-short"></div>
            </div>
            <div className="skeleton-title skeleton-item"></div>
            <div className="skeleton-text skeleton-text-medium"></div>

            <div className="stats">
              <div className="stat-item skeleton-item">
                <div className="skeleton-circles-group"></div>
                <div className="skeleton-text skeleton-text-short"></div>
              </div>
              <div className="divider"></div>
              <div className="stat-item skeleton-item">
                <div className="skeleton-bar-sm"></div>
                <div className="skeleton-text skeleton-text-short"></div>
              </div>
              <div className="divider"></div>
              <div className="stat-item skeleton-item">
                <div className="skeleton-circle-sm"></div>
                <div className="skeleton-text skeleton-text-short"></div>
              </div>
            </div>
          </div>

          <div className="mission-section">
            <div className="mission-header skeleton-item">
              <div className="skeleton-text skeleton-text-medium"></div>
              <div className="skeleton-text skeleton-text-short"></div>
            </div>
            <div className="progress-bar skeleton-item">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="skeleton-progress-segment"></div>
              ))}
            </div>

            <div className="mission-steps">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="mission-step skeleton-item">
                  <div className="skeleton-text skeleton-text-number"></div>
                  <div className="skeleton-circle"></div>
                  <div className="skeleton-text skeleton-text-long"></div>
                  <div className="skeleton-circle-sm"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="game-image skeleton-item">
          <div className="skeleton-image-placeholder"></div>
        </div>
      </div>
    </div>
  </div>
);

export default QuestSkeleton;
