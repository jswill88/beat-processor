require('dotenv').config();
const PORT = process.env.PORT || 8080;
const server = require('./src/server');
const mongoose = require('mongoose');


const mongoError = err => {
  if (err) return console.error(err);
  console.log('Connected to MongoDB');
};
mongoose.connect(process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  mongoError);

server.start(PORT);
