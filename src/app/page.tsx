import styles from './page.module.css';
import { Navbar } from './components/layout/Navbar';
import CampaignPage from '@/pages/Campaign';

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <CampaignPage />
      </main>
    </div>
  );
}
