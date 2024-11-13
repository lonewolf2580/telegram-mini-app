"use client";

import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk'; // Import Telegram Web App SDK

// Fetch balance data for a specific user
async function fetchBalanceData(userId: string) {
  const response = await fetch(`/api/getBalance?userId=${userId}`);
  return response.json();
}

// Update balance for a specific user
async function updateBalance(userId: string, amount: number) {
  const response = await fetch('/api/addBalance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, amount }),
  });
  return response.json();
}

export default function Dashboard() {
  const [userId, setUserId] = useState<string | null>(null); // Store user ID
  const [balance, setBalance] = useState(0);
  const [tapLimit, setTapLimit] = useState(10);
  const [profitPerTap, setProfitPerTap] = useState(1);
  const [tasks, setTasks] = useState([
    { id: 1, description: "Double your balance", cost: 5, reward: "double" },
    { id: 2, description: "Increase profit per tap by 1", cost: 10, reward: "increaseProfit" },
    { id: 3, description: "Increase tap limit by 5", cost: 8, reward: "increaseLimit" },
  ]);

  // Fetch and set user ID from Telegram WebApp data
  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserId(WebApp.initDataUnsafe.user.id.toString()); // Set the Telegram user ID
    }
  }, []);

  useEffect(() => {
    async function initializeData() {
      if (userId) {
        const data = await fetchBalanceData(userId);
        setBalance(data.balance);
        setTapLimit(data.tapLimit);
        setProfitPerTap(data.profitPerTap);
      }
    }
    initializeData();

    // Recharge the tap limit over time
    const rechargeInterval = setInterval(() => {
      setTapLimit((prev) => Math.min(prev + 1, 10));
    }, 5000); // Increase tap limit by 1 every 5 seconds

    return () => clearInterval(rechargeInterval);
  }, [userId]);

  const handleTap = async () => {
    if (tapLimit > 0 && userId) {
      const result = await updateBalance(userId, profitPerTap);
      setBalance(result.balance);
      setTapLimit(result.tapLimit);
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

  if (!userId) return <div>Loading...</div>; // Display loading until user ID is retrieved

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
