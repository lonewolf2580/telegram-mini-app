'use client'
// In /dashboard page or tap game component
import { useEffect, useState } from 'react';

async function updateBalance(userId: string, amount: number) {
  const response = await fetch('/api/addBalance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, amount }),
  });
  return response.json();
}

function TapGame() {
  const userId = "123"; // Example user ID
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Fetch initial balance when component mounts
    async function fetchBalance() {
      const response = await fetch(`/api/getBalance?userId=${userId}`);
      const data = await response.json();
      setBalance(data.balance);
    }
    fetchBalance();
  }, []);

  const handleTap = async () => {
    const result = await updateBalance(userId, 1); // Increase by 1 on tap
    setBalance(result.balance); // Update local balance state
  };

  return (
    <div>
      <h1>Balance: {balance} FortuneTap</h1>
      <button onClick={handleTap}>Tap</button>
    </div>
  );
}
