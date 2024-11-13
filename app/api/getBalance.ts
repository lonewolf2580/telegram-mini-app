// pages/api/getBalance.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import redis from '../../lib/redis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const userId = parseInt(req.query.userId as string);

    try {
      await redis.connect();
      const balance = await redis.get(`balance:${userId}`);
      res.status(200).json({ userId, balance: balance ? parseInt(balance) : 0 });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve balance' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
