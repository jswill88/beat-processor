require('dotenv').config();
const PORT = process.env.PORT || 8080;
const server = require('./src/server');
server.start(PORT);