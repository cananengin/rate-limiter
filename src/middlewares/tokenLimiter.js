const { RateLimiterRedis } = require('rate-limiter-flexible');
const redisClient = require('../config/redisConfig');
const TOKEN_LIMIT = process.env.TOKEN_LIMIT || 200;

const tokenLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'token',
    points: TOKEN_LIMIT,
    duration: 60 * 60 * 2,
    blockDuration: 60 * 60 * 2
});

module.exports = tokenLimiter;
