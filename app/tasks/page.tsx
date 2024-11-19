'use client';
import BottomMenu from '../components/BottomMenu';
import styles from './Tasks.module.css';
import { SendTransactionRequest, useTonConnectUI } from '@tonconnect/ui-react'

const destination = "UQDL480evEKX7PtGVD0xyVUdEdyg0c8XtRBR9jbIOp-3vx45"
const body = "TON Task on Our Airdrop App"
const transaction: SendTransactionRequest = {
    validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
    messages: [
      {
        address:
          "UQDL480evEKX7PtGVD0xyVUdEdyg0c8XtRBR9jbIOp-3vx45", // message destination in user-friendly format
        amount: "20000000", // Toncoin in nanotons
      },
    ],
};

export default function Tasks() {
  const dummyTasks = [
    { id: 1, description: 'Double your balance', cost: '5 TON', reward: 'Double your current balance.' },
    { id: 2, description: 'Increase profit per tap by 1', cost: '10 TON', reward: 'Boost profit per tap by 1.' },
    { id: 3, description: 'Increase tap limit by 5', cost: '8 TON', reward: 'Expand your tap limit by 5.' },
    { id: 4, description: 'Unlock exclusive skin', cost: '15 TON', reward: 'Get a unique skin for your profile.' },
    { id: 5, description: 'Claim an airdrop', cost: '20 TON', reward: 'Receive a surprise airdrop reward.' },
  ];

  return (
    <div className={styles.tasksPage}>
      <h1 className={styles.title}>📋 Tasks</h1>
      <ul className={styles.taskList}>
        {dummyTasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <div className={styles.taskHeader}>
              <h2 className={styles.taskDescription}>{task.description}</h2>
              <span className={styles.taskCost}>{task.cost}</span>
            </div>
            <p className={styles.taskReward}>{task.reward}</p>
            <button  className={styles.completeButton}>Complete</button>
          </li>
        ))}
      </ul>
      <BottomMenu />
    </div>
  );
}
