const jwt = require('jsonwebtoken');
const User = require('../model/user');
const redisClient = require('../config/redisConfig');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const cachedUser = await redisClient.get(token);

    if (cachedUser) {
      await redisClient.expire(token, 3600);
      req.user = JSON.parse(cachedUser);
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({ error: 'Token payload does not contain an id' });
    }

    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    await redisClient.setEx(token, 3600, JSON.stringify(user));
    req.user = user;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Token is not valid', details: error.message });
  }
};
