const mongoose = require('mongoose');

const testUserSchema = new mongoose.Schema({
  email: {type: String, required: true},
  passwordHash: {type: String, required: true},
});

module.exports = mongoose.model('testUser', testUserSchema);