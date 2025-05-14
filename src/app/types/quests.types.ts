export type Task = {
  id: number;
  questId: number;
  networkId: number;
  name: string;
  description: string;
  type: 'WEB2' | 'WEB3';
  category: 'WEB2_ACTION' | 'WEB3_ACTION';
  displayPosition: number;
  optional: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  modifiedBy: number;
  uiProperties: {
    image: string;
    placeHolder: string;
    web2_action: string;
  };
  verifyData?: Array<{
    methodArgs: object;
    methodName: string;
    additionalArgs: object;
  }>;
};

export type Quest = {
  id: number;
  name: string;
  slug: string;
  description: string;
  constraints: {
    methods: string[];
    maximumAmountOfPlayers: number;
  };
  completionRules: object;
  uiProperties: {
    image: string;
    level: number;
    headerImage: string;
    primaryColor: string;
    secondaryColor: string;
  };
  entitiesId: number[];
  reward: object;
  rewardPoints: number;
  estimatedTime: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  modifiedBy: number;
  isActive: boolean;
  tags: string[];
  _count: {
    userQuest: number;
  };
  tasks: Task[];
};
