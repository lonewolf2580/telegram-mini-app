'use client';
import { useState } from 'react';
import Link from 'next/link';
import BottomMenu from '../components/BottomMenu';
import styles from './Dashboard.module.css';
import { TonConnectButton, useTonAddress, useTonWallet } from '@tonconnect/ui-react'

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const profitPerTap = 1;
  const wallet = useTonWallet()

  const handleTap = () => {
    setBalance(prevBalance => prevBalance + profitPerTap);
  };

  return (
    <main className={styles.container}>
      <TonConnectButton className="my-button-class" style={{ float: "right" }}/>
      <h1 className={styles.title}>Dashboard</h1>

      wallet && (
        <div>
          <span>Connected wallet address: {wallet?.account.address}</span>
          <span>Device: {wallet?.device.appName}</span>
          <span>Connected via: {wallet?.provider}</span>
          {/* {wallet?.connectItems?.tonProof?.proof && <span>Ton proof: {wallet?.connectItems.tonProof.proof}</span>} */}

          {/* <div>Connected wallet info:</div>
          <div>
            {wallet?.name} <img src={wallet?.imageUrl} />
          </div> */}
        </div>
      )

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
