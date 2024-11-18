'use client';
import BottomMenu from '../components/BottomMenu';
import styles from './Referrals.module.css';

export default function Referrals() {
  const dummyReferrals = [
    { id: 1, name: 'John Doe', reward: '50 TON' },
    { id: 2, name: 'Jane Smith', reward: '25 TON' },
    { id: 3, name: 'Alice Johnson', reward: '75 TON' },
    { id: 4, name: 'Bob Brown', reward: '30 TON' },
    { id: 5, name: 'Charlie White', reward: '60 TON' },
  ];

  return (
    <div className={styles.referralsPage}>
      <h1 className={styles.title}>👥 Referrals</h1>
      <p className={styles.subtitle}>
        Invite friends and earn rewards! Below is a list of your referred friends and their rewards.
      </p>
      <ul className={styles.referralList}>
        {dummyReferrals.map((referral) => (
          <li key={referral.id} className={styles.referralItem}>
            <div className={styles.referralDetails}>
              <span className={styles.referralName}>{referral.name}</span>
              <span className={styles.referralReward}>{referral.reward}</span>
            </div>
          </li>
        ))}
      </ul>
      <button className={styles.inviteButton}>Invite More Friends</button>
      <BottomMenu />
    </div>
  );
}
