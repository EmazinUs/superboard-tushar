'use client';
import React, { useEffect } from 'react';
import Container from '@/app/components/common/container';
import Link from 'next/link';
import { ChevronLeft, CheckCircle, Trophy } from 'lucide-react';
import Image from 'next/image';
import './QuestDetails.scss';
import { useParams } from 'next/navigation';
import { useCampaign } from '@/app/context/campaignContext';
import coinBoxImage from '@/app/assets/coin-box.svg';
import QuestSkeleton from '@/app/components/common/questSkeleton';
import Modal from '@/app/components/common/Modal';

const QuestDetailsPage = () => {
  const params = useParams();
  const questId = params.id as string;
  const {
    campaignQuests,
    selectedCampaign,
    isLoadingDetails,
    taskModal,
    openTaskModal,
    closeTaskModal,
    completeTask,
  } = useCampaign();

  const quest = campaignQuests?.find(q => q.title.toLowerCase().replace(/\s+/g, '-') === questId);
  const currentTask = quest?.tasks.find(task => task.id === taskModal.taskId);

  // Log when tasks change to debug
  useEffect(() => {
    if (quest) {
      console.log('Quest tasks updated:', quest.tasks);
    }
  }, [quest?.tasks]);

  // Handle task completion
  const handleCompleteTask = () => {
    if (quest && currentTask) {
      completeTask(quest.id, currentTask.id);
    }
  };

  // Handle task click
  const handleTaskClick = (taskId: number, isOpen: boolean, isCompleted: boolean) => {
    console.log(`Task clicked: ${taskId}, isOpen: ${isOpen}, isCompleted: ${isCompleted}`);
    if (isOpen && !isCompleted) {
      openTaskModal(taskId);
    }
  };

  if (isLoadingDetails || !quest) {
    return (
      <div className="quest-details-page">
        <Container>
          <div className="quest-header">
            <Link href="/campaign" className="back-link">
              <ChevronLeft className="icon" /> BACK TO CAMPAIGN
            </Link>
          </div>
          <QuestSkeleton />
        </Container>
      </div>
    );
  }

  return (
    <div className="quest-details-page">
      <Container>
        <div className="quest-card">
          {quest.isCompleted && (
            <div className="quest-completed-banner">
              <Trophy size={24} />
              <span>Quest Completed!</span>
              <div className="rewards-earned">
                <Image src={coinBoxImage} alt="Coin" width={16} height={16} />
                <span>{quest.rewardAmount} points earned</span>
              </div>
            </div>
          )}

          {/* First Section: Split into left and right */}
          <div className="quest-main-content">
            <div className="quest-left-section">
              <div className="rewards-header">
                <span className="rewards-label">Rewards</span>
                <div className="rewards-value">
                  <Image src={coinBoxImage} alt="Coin" width={24} height={24} />
                  <span className="rewards-amount">{quest.rewardAmount}</span>
                </div>
              </div>

              <div className="quest-info-container">
                <div className="quest-header-section">
                  <div className="quest-logo">
                    <Image src={quest.imageUrl} alt="Campaign logo" width={40} height={40} />
                    <span className="quest-source">Superboard</span>
                  </div>
                  <div className="quest-external-link">
                    <svg
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </div>
                </div>

                <h1 className="quest-title">
                  {quest.title}
                  {quest.isCompleted && <CheckCircle size={20} className="quest-completed-icon" />}
                </h1>
                <p className="quest-description">{quest.description}</p>

                <div className="quest-stats">
                  <div className="stat-item">
                    <div className="stat-users">
                      <span className="user-icon">👤</span>
                      <span className="user-icon user-overlap">👤</span>
                      <span className="user-icon user-overlap">👤</span>
                    </div>
                    <span className="stat-value">{quest.chadsCount} chads</span>
                  </div>

                  <div className="stat-item">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${(quest.completedTasks / quest.totalTasks) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="stat-value">
                      {quest.completedTasks}/{quest.totalTasks} Tasks
                    </span>
                  </div>

                  <div className="stat-item">
                    <div className="blockchain-icon">
                      <Image src={quest.chainIcon} alt="Chain" width={24} height={24} />
                    </div>
                    <span className="stat-value">Chain</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="quest-right-section">
              <div className="campaign-banner">
                <div className="campaign-image">
                  <Image
                    src={quest.imageUrl}
                    alt={quest.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Second Section: Mission */}
          <div className="quest-mission-section">
            <div className="mission-section">
              <div className="mission-header">
                <h2 className="section-title">
                  Mission
                  {quest.isCompleted && (
                    <CheckCircle size={16} className="mission-completed-icon" />
                  )}
                </h2>
                <div className="mission-progress">
                  <span className="progress-text">
                    {quest.completedTasks}/{quest.totalTasks} Steps
                  </span>
                  <div className="progress-indicator">
                    {Array.from({ length: quest.totalTasks }).map((_, index) => (
                      <div
                        key={index}
                        className={`indicator-dot ${index < quest.completedTasks ? 'completed' : ''}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <ul className="mission-tasks">
                {quest.tasks.map((task, index) => (
                  <li
                    key={index}
                    className={`task-item ${!task.isOpen ? 'locked' : ''} ${task.isCompleted ? 'completed' : ''}`}
                    onClick={() => handleTaskClick(task.id, task.isOpen, task.isCompleted)}
                  >
                    <div className="task-number">{index + 1}.</div>
                    <div className="task-icon">{task.taskIcon}</div>
                    <div className="task-name">{task.name}</div>
                    <div className="task-status">
                      {!task.isOpen && (
                        <svg
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lock-icon"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      )}
                      {task.isOpen && !task.isCompleted && (
                        <svg
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="unlock-icon"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                        </svg>
                      )}
                      {task.isCompleted && (
                        <svg
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="check-icon"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <Modal isOpen={taskModal.isOpen} onClose={closeTaskModal} title="Task Details">
        {currentTask && (
          <div className="task-modal-content">
            <div className="task-detail-header">
              <div className="task-icon">{currentTask.taskIcon}</div>
              <div className="task-name">{currentTask.name}</div>
            </div>
            <div className="task-description">
              {currentTask.description}
              {currentTask.type === 'WEB2' && currentTask.uiProperties.web2_action && (
                <div className="web2-action">
                  <p>Complete this action on the external site:</p>
                  <a
                    href={currentTask.uiProperties.web2_action}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-link"
                  >
                    Visit Site
                  </a>
                </div>
              )}
            </div>
            <button className="task-complete-button" onClick={handleCompleteTask}>
              Complete Task
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default QuestDetailsPage;
