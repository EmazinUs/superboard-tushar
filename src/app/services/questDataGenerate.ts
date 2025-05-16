import { Quest, Task } from '../types/quests.types';
import { questImages, rariIcon } from '../assets/exportData';

const now = () => new Date().toISOString();

export const createDummyQuest = (index: number): Quest => {
  const taskCount = 5;
  const tasks: Task[] = Array.from({ length: taskCount }, (_, i) =>
    createDummyTask(i + 1, index + 1, i)
  );

  // Use modulo to cycle through the questImages array
  const imageIndex = index % questImages.length;
  const questImage = questImages[imageIndex];

  let isQuestStarted = false;
  let completedTasks = 0;

  if (typeof window !== 'undefined') {
    const startedQuests = JSON.parse(localStorage.getItem('startedQuests') || '[]');
    isQuestStarted = startedQuests.includes(index + 1);

    // If there's stored task progress, get it from there instead of auto-generating
    const tasksProgressStr = localStorage.getItem('tasksProgress');
    if (tasksProgressStr) {
      try {
        const tasksProgress = JSON.parse(tasksProgressStr);
        if (tasksProgress[index + 1]) {
          completedTasks = tasks.filter(task => {
            const taskProgress = tasksProgress[index + 1].tasks[task.id];
            return taskProgress && taskProgress.isCompleted;
          }).length;
        }
      } catch (e) {
        console.error('Error parsing tasks progress:', e);
      }
    }
  } else {
    // If no local storage (server-side), all tasks should be locked by default
    completedTasks = 0;
  }

  return {
    id: index + 1,
    title: `Quest ${index + 1} ${tasks[0].name} to ${tasks[tasks.length - 1].name}`,
    description: 'Complete this quest to earn rewards and climb the leaderboard!',
    imageUrl: questImage.src,
    chainIcon: rariIcon.src,
    rewardAmount: Math.floor(Math.random() * 100) + 50,
    tag: 'Quest',
    tags: ['Beginner', 'Chain', `${Math.floor(Math.random() * 15) + 5} min`],
    chadsCount: Math.floor(Math.random() * 10000) + 1000,
    tasks,
    totalTasks: tasks.length,
    completedTasks,
    isCompleted: completedTasks === tasks.length,
    isQuestStarted,
  };
};

const createDummyTask = (id: number, questId: number, displayPosition: number): Task => {
  const names = [
    'Bridge to Soneium',
    'Follow Soneium on X',
    'Join Soneium on Discord',
    'Join Soneium on Telegram',
    'RT on X',
  ];

  const descriptions = [
    'Bridge your assets from Ethereum to Soneium network to unlock new opportunities and benefits.',
    'Follow Soneium on X to stay updated with the latest news and announcements from the team.',
    'Join the Soneium Discord community to connect with other users and get direct support.',
    'Join Soneium on Telegram to engage with the community and get instant updates.',
    "Retweet Soneium's latest announcement on X to help spread the word.",
  ];

  const name = names[displayPosition % names.length];
  const description = descriptions[displayPosition % descriptions.length];

  let taskIcon = '🔄';
  if (name.toLowerCase().includes('bridge')) taskIcon = '🌉';
  else if (name.toLowerCase().includes('swap')) taskIcon = '💱';
  else if (name.toLowerCase().includes('follow')) taskIcon = '𝕏';
  else if (name.toLowerCase().includes('rt')) taskIcon = '𝕏';
  else if (name.toLowerCase().includes('discord')) taskIcon = '💬';
  else if (name.toLowerCase().includes('telegram')) taskIcon = '📨';
  else if (name.toLowerCase().includes('reward')) taskIcon = '🏆';

  // All tasks should be locked by default
  let isOpen = false;
  let isCompleted = false;

  // Check if there's any stored progress for this task in localStorage
  if (typeof window !== 'undefined') {
    const tasksProgressStr = localStorage.getItem('tasksProgress');
    if (tasksProgressStr) {
      try {
        const tasksProgress = JSON.parse(tasksProgressStr);
        const questProgress = tasksProgress[questId];
        if (questProgress && questProgress.tasks[id]) {
          isOpen = questProgress.tasks[id].isOpen;
          isCompleted = questProgress.tasks[id].isCompleted;
        }
      } catch (e) {
        console.error('Error parsing tasks progress from localStorage:', e);
      }
    }
  }

  return {
    id,
    questId,
    networkId: 1,
    name: names[displayPosition % names.length],
    description,
    type: displayPosition === 0 ? 'WEB3' : 'WEB2',
    category: displayPosition === 0 ? 'WEB3_ACTION' : 'WEB2_ACTION',
    displayPosition,
    optional: 0,
    isOpen,
    isCompleted,
    taskIcon,
    uiProperties: {
      image: 'https://cdn.superboard.xyz/task/image/Bridge.svg',
      placeHolder: 'Action',
      web2_action: 'https://example.com',
    },
    createdAt: now(),
    updatedAt: now(),
    createdBy: 1,
    modifiedBy: 1,
  };
};
