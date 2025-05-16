'use client';
import React from 'react';
import { Navbar } from '@/app/components/layout/Navbar';
import styles from '../page.module.css';

export default function QuestsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
