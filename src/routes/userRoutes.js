const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const tokenLimiter = require('../middlewares/tokenLimiter');

router.get('/private', authMiddleware, async (req, res) => {
    try {
        await tokenLimiter.consume(req.headers.authorization);
        res.json({ message: 'Private data'});
    } catch (error) {
        res.status(429).json({
          error: 'Token limit exceeded',
          resetTime: error.msBeforeNext ? Date.now() + error.msBeforeNext : undefined
        });
      }
});

module.exports = router;
