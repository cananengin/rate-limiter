const express = require('express');
const router = express.Router();
const ipLimiter = require('../middlewares/ipLimiter');

router.get('/public', async (req, res) => {
    try {
      await ipLimiter.consume(req.ip);
      res.json({ message: 'Public data'});
    } catch (error) {
      res.status(429).json({
        error: 'IP limit exceeded',
        resetTime: Date.now() + 60 * 60 * 1000
      });
    }
});

module.exports = router;