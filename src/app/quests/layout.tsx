'use client';
import React from 'react';
import { Navbar } from '@/app/components/layout/Navbar';
import { ActionBar } from '@/app/components/layout/ActionBar';
import styles from '../page.module.css';

export default function QuestsLayout({ children }: { children: React.ReactNode }) {
  const handleStartQuest = () => {
    // Add your quest start logic here
    console.log('Starting quest...');
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <ActionBar buttonText="Start Quest" onClick={handleStartQuest} />
    </div>
  );
}
