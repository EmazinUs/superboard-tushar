import React from 'react';
import './questSkeleton.scss';

interface QuestSkeletonProps {
  isLoading?: boolean;
}

const QuestSkeleton: React.FC<QuestSkeletonProps> = ({ isLoading = true }) => (
  <div className="skeleton-quest-container skeleton">
    <div className="skeleton-quest-content">
      <div className="skeleton-rewards-bar skeleton-item">
        <div className="skeleton-text skeleton-text-short"></div>
        <div className="skeleton-rewards-count"></div>
      </div>

      <div className="skeleton-main-content">
        <div className="skeleton-info-section">
          <div className="skeleton-header">
            <div className="skeleton-superboard skeleton-item">
              <div className="skeleton-circle-sm"></div>
              <div className="skeleton-text skeleton-text-short"></div>
            </div>
            <div className="skeleton-title skeleton-item"></div>
            <div className="skeleton-text skeleton-text-medium"></div>

            <div className="skeleton-stats">
              <div className="skeleton-stat-item skeleton-item">
                <div className="skeleton-circles-group"></div>
                <div className="skeleton-text skeleton-text-short"></div>
              </div>
              <div className="skeleton-divider"></div>
              <div className="skeleton-stat-item skeleton-item">
                <div className="skeleton-bar-sm"></div>
                <div className="skeleton-text skeleton-text-short"></div>
              </div>
              <div className="skeleton-divider"></div>
              <div className="skeleton-stat-item skeleton-item">
                <div className="skeleton-circle-sm"></div>
                <div className="skeleton-text skeleton-text-short"></div>
              </div>
            </div>
          </div>

          <div className="skeleton-mission-section">
            <div className="skeleton-mission-header skeleton-item">
              <div className="skeleton-text skeleton-text-medium"></div>
              <div className="skeleton-text skeleton-text-short"></div>
            </div>
            <div className="skeleton-progress-bar skeleton-item">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="skeleton-progress-segment"></div>
              ))}
            </div>

            <div className="skeleton-mission-steps">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="skeleton-mission-step skeleton-item">
                  <div className="skeleton-text skeleton-text-number"></div>
                  <div className="skeleton-circle"></div>
                  <div className="skeleton-text skeleton-text-long"></div>
                  <div className="skeleton-circle-sm"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="skeleton-game-image skeleton-item">
          <div className="skeleton-image-placeholder"></div>
        </div>
      </div>
    </div>
  </div>
);

export default QuestSkeleton;
