"use client"; // Indicates this is a client-side component

import { useEffect, useState } from 'react';

// Function to update balance by making a POST request to the backend API
async function updateBalance(userId: string, amount: number): Promise<{ balance: number }> {
  const response = await fetch('/api/addBalance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, amount }),
  });
  return response.json();
}

// Main tap game component
export default function TapGame(): JSX.Element {
  const userId = "123"; // Replace with the actual user ID
  const [balance, setBalance] = useState<number>(0);

  // Fetch initial balance when component mounts
  useEffect(() => {
    async function fetchBalance() {
      const response = await fetch(`/api/getBalance?userId=${userId}`);
      const data = await response.json();
      setBalance(data.balance);
    }
    fetchBalance();
  }, []);

  // Function to handle tap and update balance
  const handleTap = async () => {
    const result = await updateBalance(userId, 1); // Increase by 1 on tap
    setBalance(result.balance); // Update local balance state
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Balance: {balance} FortuneTap</h1>
      <button onClick={handleTap} style={{ fontSize: "18px", padding: "10px", cursor: "pointer" }}>
        Tap
      </button>
    </div>
  );
}
