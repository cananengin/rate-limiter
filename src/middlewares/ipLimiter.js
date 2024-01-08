const { RateLimiterRedis } = require('rate-limiter-flexible');
const redisClient = require('../config/redisConfig');

const IP_LIMIT = process.env.IP_LIMIT || 100;

const ipLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'ip',
    points: IP_LIMIT,
    duration: 60 * 60,
    blockDuration: 60 * 60
});

module.exports = ipLimiter;