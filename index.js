require('dotenv').config();
const server = require('./src/server');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;

const mongoError = err => {
  if (err) return console.error(err);
  console.log('Connected to MongoDB');
};
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify:false,
},
mongoError);

server.start(PORT);
