const User = require('../model/user');

exports.getUserData = async (req, res) => {
  try {
    res.json({ message: 'Private user data', user: req.user });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
