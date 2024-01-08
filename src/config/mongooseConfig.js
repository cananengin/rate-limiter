const mongoose = require('mongoose');
require('dotenv').config();

const mongooseConfig = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
};

module.exports = mongooseConfig;
