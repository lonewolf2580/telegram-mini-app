'use client';
import { useState } from 'react';
import Link from 'next/link';
import BottomMenu from '../components/BottomMenu';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [tapLimit, setTapLimit] = useState(1000); // Initial tap limit
  const maxTapLimit = 1000; // Maximum tap limit
  const profitPerTap = 1; // Profit per tap increment

  const handleTap = () => {
    if (tapLimit > 0) {
      setBalance(prevBalance => prevBalance + profitPerTap);
      setTapLimit((prev) => prev - profitPerTap); // Reduce tap limit on tap
    } else {
      alert('No taps remaining! Please wait for recharge.');
    }
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
      
      {/* Tap Limit Meter */}
      <div className={styles.meterSection}>
        <div className={styles.meterContainer}>
          <div
            className={styles.meterBar}
            style={{ width: `${(tapLimit / maxTapLimit) * 100}%` }}
          ></div>
        </div>
        <span className={styles.meterText}>{`${tapLimit}/${maxTapLimit}`}</span>
      </div>

      {/* Bottom Menu */}
      <BottomMenu />
    </main>
  );
}
