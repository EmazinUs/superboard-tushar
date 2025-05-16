import { StaticImageData } from 'next/image';

export interface NavbarProps {
  treatCount?: number;
}

export interface CampaignStatsCardProps {
  type: 'rewards' | 'progress';
  title: string;
  value: string;
  description: string;
  imageUrl: string | StaticImageData;
  isLoading?: boolean;
}

export interface CampaignCardProps {
  title: string;
  description: string;
  imageUrl: string | StaticImageData;
  liveStatus?: boolean;
  questCount: number;
  chadCount: number;
  chainName: string;
  chainIcon: string | StaticImageData;
  reward?: string;
}

export interface QuestCardProps {
  href: string;
  backgroundImage: string | StaticImageData;
  coinIcon: string;
  rewardAmount: number;
  title: string;
  tag: string;
  chadsCount: string;
  boardLabel: string;
  isQuestStarted?: boolean;
  isQuestCompleted?: boolean;
}

export interface SegmentControlProps {
  segments: string[];
  activeSegment: string;
  onChange: (segment: string) => void;
  ariaLabel?: string;
}
