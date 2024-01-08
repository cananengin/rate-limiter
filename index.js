const express = require('express');
const mongooseConfig = require('./src/config/mongooseConfig');
const redisClient = require('./src/config/redisConfig');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const publicRoutes = require('./src/routes/publicRoutes');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(express.json());

//redisClient.on('error', (err) => console.error('Redis error', err));

mongooseConfig();

app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', publicRoutes);

app.get('/', (req, res) => {
  res.send('Main page');
});

const server = app.listen(port, () => {
  console.log(`Server running on ${port}`);
  console.log("Redis URL:" + process.env.REDIS_URL);
});

redisClient.on('error', (err) => {
  console.error('Redis error', err);
  server.close();
});
module.exports = server;