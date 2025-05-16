'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  Campaign,
  CampaignDetail,
  CampaignProgress,
  LeaderboardProps,
  RewardCampaign,
} from '../types/campaign.types';
import { Quest, Task, TaskModalState } from '../types/quests.types';
import { CampaignService } from '../services/campaignService';

interface CampaignContextType {
  // Campaign lists and details
  campaigns: Campaign[];
  selectedCampaign: CampaignDetail | null;

  // Campaign components
  campaignQuests: Quest[];
  campaignProgress: CampaignProgress | null;
  campaignReward: RewardCampaign | null;
  leaderboard: LeaderboardProps | null;

  // Loading states
  isLoadingCampaigns: boolean;
  isLoadingDetails: boolean;

  // Task modal state
  taskModal: TaskModalState;

  // Actions
  selectCampaign: (id: number) => Promise<void>;
  refreshCampaignData: () => Promise<void>;
  startQuest: (questId: number) => void;
  openTaskModal: (taskId: number) => void;
  closeTaskModal: () => void;
  completeTask: (questId: number, taskId: number) => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

interface CampaignProviderProps {
  children: ReactNode;
}

export const CampaignProvider: React.FC<CampaignProviderProps> = ({ children }) => {
  // State for campaigns list
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignDetail | null>(null);

  // State for campaign components
  const [campaignQuests, setCampaignQuests] = useState<Quest[]>([]);
  const [campaignProgress, setCampaignProgress] = useState<CampaignProgress | null>(null);
  const [campaignReward, setCampaignReward] = useState<RewardCampaign | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardProps | null>(null);

  // Task modal state
  const [taskModal, setTaskModal] = useState<TaskModalState>({
    isOpen: false,
    taskId: null,
  });

  // Loading states
  const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Fetch initial campaigns data
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = React.useCallback(async () => {
    try {
      setIsLoadingCampaigns(true);
      const fetchedCampaigns = await CampaignService.getCampaigns();
      setCampaigns(fetchedCampaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setIsLoadingCampaigns(false);
    }
  }, []);

  const selectCampaign = React.useCallback(async (id: number) => {
    try {
      setIsLoadingDetails(true);

      // Fetch all campaign details in parallel
      const [campaignDetail, quests, progress, reward, leaderboardData] = await Promise.all([
        CampaignService.getCampaignById(id),
        CampaignService.getCampaignQuests(id),
        CampaignService.getCampaignProgress(id),
        CampaignService.getCampaignReward(id),
        CampaignService.getMockLeaderboard(),
      ]);

      setSelectedCampaign(campaignDetail);
      setCampaignQuests(quests);
      setCampaignProgress(progress);
      setCampaignReward(reward);
      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error('Error fetching campaign details:', error);
    } finally {
      setIsLoadingDetails(false);
    }
  }, []);

  const refreshCampaignData = React.useCallback(async () => {
    if (selectedCampaign) {
      await selectCampaign(selectedCampaign.id);
    }
    await fetchCampaigns();
  }, [selectedCampaign, selectCampaign, fetchCampaigns]);

  // Load started quests and tasks progress from localStorage on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load started quests
      const startedQuestsStr = localStorage.getItem('startedQuests');
      if (startedQuestsStr) {
        const startedQuestIds = JSON.parse(startedQuestsStr);
        setCampaignQuests(prevQuests =>
          prevQuests.map(quest => ({
            ...quest,
            isQuestStarted: startedQuestIds.includes(quest.id),
          }))
        );
      }

      // Load task progress
      const tasksProgressStr = localStorage.getItem('tasksProgress');
      if (tasksProgressStr && campaignQuests.length > 0) {
        const tasksProgress = JSON.parse(tasksProgressStr);

        setCampaignQuests(prevQuests =>
          prevQuests.map(quest => {
            const questProgress = tasksProgress[quest.id];
            if (!questProgress) return quest;

            // Update tasks based on stored progress
            const updatedTasks = quest.tasks.map(task => {
              const taskProgress = questProgress.tasks[task.id];
              if (!taskProgress) return task;

              return {
                ...task,
                isOpen: taskProgress.isOpen,
                isCompleted: taskProgress.isCompleted,
              };
            });

            // Recalculate completed tasks count
            const completedTasksCount = updatedTasks.filter(task => task.isCompleted).length;

            return {
              ...quest,
              tasks: updatedTasks,
              completedTasks: completedTasksCount,
              isCompleted: completedTasksCount === quest.totalTasks,
            };
          })
        );
      }
    }
  }, []);

  const startQuest = React.useCallback((questId: number) => {
    setCampaignQuests(prevQuests => {
      const questIndex = prevQuests.findIndex(q => q.id === questId);

      if (questIndex === -1) return prevQuests;

      const updatedQuests = [...prevQuests];
      const quest = { ...updatedQuests[questIndex] };

      // Mark quest as started
      quest.isQuestStarted = true;

      // If this is the first time starting the quest, unlock the first task
      // Make sure all other tasks are locked first
      const updatedTasks = quest.tasks.map(task => ({
        ...task,
        isOpen: false, // Reset all tasks to locked
        isCompleted: false, // Reset all tasks to not completed (only for testing) - remove this in production
      }));

      // Find the first task by display position
      const tasksByPosition = [...updatedTasks].sort(
        (a, b) => a.displayPosition - b.displayPosition
      );
      if (tasksByPosition.length > 0) {
        const firstTaskIndex = updatedTasks.findIndex(task => task.id === tasksByPosition[0].id);
        if (firstTaskIndex !== -1) {
          updatedTasks[firstTaskIndex] = {
            ...updatedTasks[firstTaskIndex],
            isOpen: true,
          };
        }
      }

      quest.tasks = updatedTasks;
      quest.completedTasks = 0; // Reset completed tasks count (only for testing) - remove this in production
      updatedQuests[questIndex] = quest;

      // Save to localStorage
      if (typeof window !== 'undefined') {
        // Save started quests
        const startedQuestIds = updatedQuests.filter(q => q.isQuestStarted).map(q => q.id);
        localStorage.setItem('startedQuests', JSON.stringify(startedQuestIds));

        // Save tasks progress
        saveTasksProgress(updatedQuests);
      }

      return updatedQuests;
    });
  }, []);

  // Helper function to save tasks progress to localStorage
  const saveTasksProgress = (quests: Quest[]) => {
    if (typeof window === 'undefined') return;

    const tasksProgress = quests.reduce(
      (acc, quest) => {
        acc[quest.id] = {
          tasks: quest.tasks.reduce(
            (taskAcc, task) => {
              taskAcc[task.id] = {
                isOpen: task.isOpen,
                isCompleted: task.isCompleted,
              };
              return taskAcc;
            },
            {} as Record<number, { isOpen: boolean; isCompleted: boolean }>
          ),
        };
        return acc;
      },
      {} as Record<number, { tasks: Record<number, { isOpen: boolean; isCompleted: boolean }> }>
    );

    localStorage.setItem('tasksProgress', JSON.stringify(tasksProgress));
  };

  // Open task modal
  const openTaskModal = React.useCallback((taskId: number) => {
    setTaskModal({
      isOpen: true,
      taskId,
    });
  }, []);

  // Close task modal
  const closeTaskModal = React.useCallback(() => {
    setTaskModal({
      isOpen: false,
      taskId: null,
    });
  }, []);

  // Complete a task and unlock the next task if available
  const completeTask = React.useCallback(
    (questId: number, taskId: number) => {
      setCampaignQuests(prevQuests => {
        const questIndex = prevQuests.findIndex(q => q.id === questId);

        if (questIndex === -1) return prevQuests;

        const updatedQuests = [...prevQuests];
        const quest = { ...updatedQuests[questIndex] };
        const updatedTasks = [...quest.tasks];

        // Find and complete the current task
        const taskIndex = updatedTasks.findIndex(t => t.id === taskId);

        if (taskIndex === -1) return prevQuests;

        updatedTasks[taskIndex] = {
          ...updatedTasks[taskIndex],
          isCompleted: true,
        };

        // Find the next task to unlock
        const currentPosition = updatedTasks[taskIndex].displayPosition;
        const availablePositions = updatedTasks
          .filter(t => !t.isOpen && !t.isCompleted)
          .map(t => t.displayPosition);

        if (availablePositions.length > 0) {
          const nextPosition = Math.min(...availablePositions);
          const nextTaskIndex = updatedTasks.findIndex(t => t.displayPosition === nextPosition);

          if (nextTaskIndex !== -1) {
            updatedTasks[nextTaskIndex] = {
              ...updatedTasks[nextTaskIndex],
              isOpen: true,
            };
          }
        }

        // Update quest with new tasks and recalculate completed tasks
        quest.tasks = updatedTasks;
        quest.completedTasks = updatedTasks.filter(t => t.isCompleted).length;
        quest.isCompleted = quest.completedTasks === quest.totalTasks;

        updatedQuests[questIndex] = quest;

        // Save to localStorage
        saveTasksProgress(updatedQuests);

        return updatedQuests;
      });

      // Close the modal after completing the task
      closeTaskModal();
    },
    [closeTaskModal]
  );

  const value = {
    campaigns,
    selectedCampaign,
    campaignQuests,
    campaignProgress,
    campaignReward,
    leaderboard,
    isLoadingCampaigns,
    isLoadingDetails,
    taskModal,
    selectCampaign,
    refreshCampaignData,
    startQuest,
    openTaskModal,
    closeTaskModal,
    completeTask,
  };

  return <CampaignContext.Provider value={value}>{children}</CampaignContext.Provider>;
};

// Custom hook to use the campaign context
export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};
