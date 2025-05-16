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

  // Calculate total and completed tasks
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const isCompleted = completedTasks === totalTasks;
  // A quest is considered started if at least one task is completed or any task is open
  const isQuestStarted = tasks.some(task => task.isCompleted || task.isOpen);

  return {
    id: index + 1,
    title: `Quest ${index + 1} ${tasks[0].name} to ${tasks[tasks.length - 1].name}`,
    description: 'Complete this quest to earn rewards and climb the leaderboard!',
    imageUrl: questImage.src,
    chainIcon: rariIcon.src,
    rewardAmount: Math.floor(Math.random() * 100) + 50,
    tag: 'Quest',
    chadsCount: Math.floor(Math.random() * 10000) + 1000,
    tasks,
    totalTasks,
    completedTasks,
    isCompleted,
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
  const name = names[displayPosition % names.length];
  let taskIcon = '🔄';
  if (name.toLowerCase().includes('bridge')) taskIcon = '🌉';
  else if (name.toLowerCase().includes('swap')) taskIcon = '💱';
  else if (name.toLowerCase().includes('follow')) taskIcon = '𝕏';
  else if (name.toLowerCase().includes('rt')) taskIcon = '𝕏';
  else if (name.toLowerCase().includes('reward')) taskIcon = '🏆';

  // Tasks are sequentially unlocked. First task is always open
  const isOpen = displayPosition === 0;
  // Randomly mark some tasks as completed if they're open
  const isCompleted = isOpen ? Math.random() > 0.7 : false;

  return {
    id,
    questId,
    networkId: 1,
    name: names[displayPosition % names.length],
    description: 'Auto-generated task',
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
