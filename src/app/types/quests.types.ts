import { StaticImageData } from 'next/image';

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
  title: string;
  description: string;
  imageUrl: string | StaticImageData;
  rewardAmount: number;
  tag?: string;
  tags?: string[];
  chadsCount: number;
  tasks: Task[];
};
