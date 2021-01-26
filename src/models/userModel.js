const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const testUserSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

testUserSchema.pre('save', async function () {
  if(this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});



module.exports = mongoose.model('testUser', testUserSchema);