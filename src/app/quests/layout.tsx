'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/app/components/layout/Navbar';
import { ActionBar, ActionBarState } from '@/app/components/layout/ActionBar';
import { useCampaign } from '@/app/context/campaignContext';
import { resetAllProgress } from '@/app/services/campaignService';
import styles from '../page.module.css';

export default function QuestsLayout({ children }: { children: React.ReactNode }) {
  const { campaignQuests, startQuest, openTaskModal } = useCampaign();
  const params = useParams();
  const router = useRouter();
  const questId = params.id as string;

  const quest = campaignQuests?.find(q => q.title.toLowerCase().replace(/\s+/g, '-') === questId);

  const getButtonState = (): { state: ActionBarState; text: string } => {
    if (!quest) return { state: 'locked', text: 'Loading...' };

    if (quest.isCompleted) {
      return { state: 'completed', text: 'Quest Completed' };
    }

    if (quest.isQuestStarted) {
      const openTask = quest.tasks.find(t => t.isOpen && !t.isCompleted);
      if (openTask) {
        return { state: 'continue', text: 'Continue Quest' };
      }
      return quest.completedTasks < quest.totalTasks
        ? { state: 'continue', text: 'Continue Quest' }
        : { state: 'completed', text: 'Quest Completed' };
    }

    return { state: 'start', text: 'Start Quest' };
  };

  const { state: buttonState, text: buttonText } = getButtonState();

  const handleActionButton = () => {
    if (!quest) return;

    if (buttonState === 'completed') {
      return;
    }

    if (buttonState === 'start') {
      console.log('Starting quest:', quest.id);
      startQuest(quest.id);

      setTimeout(() => {
        router.refresh();
      }, 100);
      return;
    }

    if (buttonState === 'continue') {
      const nextTask = quest.tasks.find(t => t.isOpen && !t.isCompleted);
      if (nextTask) {
        console.log('Opening task modal for:', nextTask.id);
        openTaskModal(nextTask.id);
      } else {
        console.log('Starting quest:', quest.id);
        startQuest(quest.id);
      }
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        {/* Uncomment to add a reset button for testing */}
        {/* <button 
          onClick={resetAllProgress} 
          style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 9999, padding: '5px 10px', background: 'red', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Reset Progress
        </button> */}
        {children}
      </main>
      {quest && (
        <ActionBar buttonText={buttonText} onClick={handleActionButton} state={buttonState} />
      )}
    </div>
  );
}
