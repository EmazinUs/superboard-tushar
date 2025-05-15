import { Quest, Task } from '../types/quests.types';
import { questImages } from '../assets/exportData';

const now = () => new Date().toISOString();

export const createDummyQuest = (index: number): Quest => {
  const taskCount = 5;
  const tasks: Task[] = Array.from({ length: taskCount }, (_, i) =>
    createDummyTask(i + 1, index + 1, i)
  );

  // Use modulo to cycle through the questImages array
  const imageIndex = index % questImages.length;
  const questImage = questImages[imageIndex];

  return {
    id: index + 1,
    title: `Quest ${index + 1}: ${tasks[0].name}`,
    description: 'Complete this quest to earn rewards and climb the leaderboard!',
    imageUrl: questImage.src,
    rewardAmount: Math.floor(Math.random() * 100) + 50,
    tag: 'Quest',
    chadsCount: Math.floor(Math.random() * 10000) + 1000,
    tasks,
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

  return {
    id,
    questId,
    networkId: 1,
    name: names[displayPosition % names.length],
    description: 'Auto-generated task',
    type: displayPosition === 0 ? 'WEB3' : 'WEB2',
    category: displayPosition === 0 ? 'WEB3_ACTION' : 'WEB2_ACTION',
    displayPosition,
    uiProperties: {
      image: 'https://cdn.superboard.xyz/task/image/Bridge.svg',
      placeHolder: 'Action',
      web2_action: 'https://example.com',
    },
    optional: 0,
    createdAt: now(),
    updatedAt: now(),
    createdBy: 1,
    modifiedBy: 1,
  };
};
