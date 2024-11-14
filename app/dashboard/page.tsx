'use client';
import { useState } from 'react';
import Link from 'next/link';
import BottomMenu from '../components/BottomMenu';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const profitPerTap = 1;

  const handleTap = () => {
    setBalance(prevBalance => prevBalance + profitPerTap);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.balanceDisplay}>
        <span className={styles.balanceLabel}>Balance:</span>
        <span className={styles.balanceValue}>{balance}</span>
      </div>

      <div className={styles.tapCircle} onClick={handleTap}>
        <img
          src="/fortune.jpg"
          alt="Tap Circle"
          className={styles.circleImage}
        />
        <p className={styles.tapInstruction}>Tap to Earn!</p>
      </div>

      {/* Bottom Menu */}
      <BottomMenu />
    </main>
  );
}
