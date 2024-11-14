"use client";

import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../../lib/firebase"; // Import Firebase

// Interface for Firebase user data
interface FUserData {
  userId: string;
  username: string;
  balance: number;
  level: number;
  profitPerTap: number;
  tapLimit: number;
  tasks: any;
  skins: any;
  airdrop: number;
}

// Fetch user data from Firebase and calculate profit per tap and tap limit based on level
async function fetchFUserData(userId: string): Promise<FUserData | null> {
  const docRef = doc(db, "user", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const level = data.level || 0;

    // Determine profit per tap and tap limit based on level
    const profitPerTap = level < 50 ? level + 1 : 50;
    const tapLimit = level < 50 ? 1000 + level * 50 : 3500; // Adjust these values as needed

    return {
      ...data,
      profitPerTap,
      tapLimit,
      airdrop: data.balance / 1000,
    } as FUserData;
  } else {
    console.log("No such document!");
    return null;
  }
}

// Main Dashboard component
export default function Dashboard() {
  const [fuserData, setFUserData] = useState<FUserData | null>(null);
  const [balance, setBalance] = useState(0);
  const [tapLimit, setTapLimit] = useState(0);
  const [profitPerTap, setProfitPerTap] = useState(0);
  const [tasks, setTasks] = useState([
    { id: 1, description: "Double your balance", cost: 5, reward: "double" },
    { id: 2, description: "Increase profit per tap by 1", cost: 10, reward: "increaseProfit" },
    { id: 3, description: "Increase tap limit by 5", cost: 8, reward: "increaseLimit" },
  ]);

  useEffect(() => {
    // Fetch user data from Telegram WebApp and Firebase
    async function initializeData() {
      const userId = WebApp.initDataUnsafe?.user?.id?.toString();
      if (userId) {
        const data = await fetchFUserData(userId);
        if (data) {
          setFUserData(data);
          setBalance(data.balance);
          setTapLimit(data.tapLimit);
          setProfitPerTap(data.profitPerTap);
        }
      }
    }
    initializeData();

    // Recharge tap limit over time
    const rechargeInterval = setInterval(() => {
      setTapLimit((prev) => Math.min(prev + 1, fuserData?.tapLimit || 1000));
    }, 5000); // Recharges every 5 seconds

    return () => clearInterval(rechargeInterval);
  }, []);

  const handleTap = async () => {
    if (tapLimit > 0) {
      const newBalance = balance + profitPerTap;
      setBalance(newBalance);
      setTapLimit(tapLimit - 1);

      // Optionally, save the new balance back to Firebase or a server API here
    }
  };

  const handleTaskClick = (task: any) => {
    if (balance >= task.cost) {
      setBalance((prev) => prev - task.cost);
      if (task.reward === "double") setBalance((prev) => prev * 2);
      else if (task.reward === "increaseProfit") setProfitPerTap((prev) => prev + 1);
      else if (task.reward === "increaseLimit") setTapLimit((prev) => prev + 5);
    } else {
      alert("Not enough balance!");
    }
  };

  if (!fuserData) return <div>Loading...</div>;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>FortuneTap Dashboard</h1>
      <div>
        <h2>Balance: {balance} FortuneTap</h2>
        <h3>Tap Limit: {tapLimit} taps remaining</h3>
        <h4>Profit per Tap: {profitPerTap}</h4>
      </div>

      {/* Tap Button */}
      <div
        style={{
          display: "inline-block",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "#FFDDC1",
          margin: "20px",
          cursor: "pointer",
        }}
        onClick={handleTap}
      >
        <img
          src="/circle-image.png"
          alt="Tap Circle"
          style={{ width: "100%", height: "100%", borderRadius: "50%" }}
        />
      </div>

      {/* Task List */}
      <div>
        <h2>Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: "10px" }}>
              <p>{task.description}</p>
              <p>Cost: {task.cost} TON</p>
              <button
                onClick={() => handleTaskClick(task)}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Complete Task
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
