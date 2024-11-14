// lib/redis.ts
// import Redis from 'ioredis';

// const redis = new Redis({
//   host: 'redis-16296.c74.us-east-1-4.ec2.redns.redis-cloud.com',
//   port: 16296,
//   password: 'ajRH6ov6RAaMiGxMrK9ML2LhJ08ltyZQ', // Only if you set a password in Redis
// });

// export default redis;


import { createClient } from 'redis';

const redis = createClient({
    password: 'ajRH6ov6RAaMiGxMrK9ML2LhJ08ltyZQ',
    socket: {
        host: 'redis-16296.c74.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 16296
    }
});

redis.connect();

export default redis;