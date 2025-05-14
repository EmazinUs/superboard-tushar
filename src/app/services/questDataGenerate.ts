import { Quest, Task } from '../types/quests.types';

const now = () => new Date().toISOString();

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

export const createDummyQuest = (index: number): Quest => {
  const id = 1400 + index;
  return {
    id,
    name: `Assemble on Soneium ${index + 1}`,
    slug: `assemble-on-soneium-${index + 1}`,
    description: 'Ethereum layer-2 solution to empower builders and drive Web3 adoption.',
    constraints: {
      methods: ['constraintMaxAmountOfPlayersService'],
      maximumAmountOfPlayers: 1000000,
    },
    completionRules: {},
    uiProperties: {
      image: 'https://cdn.superboard.xyz/uiProperties/images/newsol.png',
      level: 1,
      headerImage: 'https://cdn.superboard.xyz/uiProperties/seo/camps.png',
      primaryColor: '#b2ffa4',
      secondaryColor: '#000000',
    },
    entitiesId: [29, 1047, 1048],
    reward: {},
    rewardPoints: 50,
    estimatedTime: 3,
    startTime: now(),
    endTime: now(),
    createdAt: now(),
    updatedAt: now(),
    createdBy: 65191,
    modifiedBy: 65191,
    isActive: true,
    tags: [],
    _count: {
      userQuest: Math.floor(Math.random() * 15000),
    },
    tasks: Array.from({ length: 5 }, (_, i) => createDummyTask(id * 10 + i, id, i)),
  };
};
