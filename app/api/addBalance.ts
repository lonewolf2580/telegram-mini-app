// pages/api/addBalance.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import redis from '../../lib/redis';

interface BalanceRequest extends NextApiRequest {
  body: {
    userId: number;
    amount: number; // Amount to add to balance
  };
}

export default async function handler(req: BalanceRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, amount } = req.body;

    try {
      // Fetch the current balance, default to 0 if not found
      await redis.connect();
      const currentBalance = await redis.get(`balance:${userId}`);
      const newBalance = (currentBalance ? parseInt(currentBalance) : 0) + amount;

      // Update the balance in Redis
      await redis.set(`balance:${userId}`, newBalance);

      res.status(200).json({ userId, balance: newBalance });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update balance' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
