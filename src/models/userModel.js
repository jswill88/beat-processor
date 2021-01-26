const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const testUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: [6, 'Password must be at least 6 characters'],
    maxlength: [32, 'Password must be less than 32 characters'],
    validate: {
      validator: input => (
        input.match(/[0-9]/)
        && input.match(/[a-z]/)
        && input.match(/[A-Z]/)
      ),
      message: 'Password must include an uppercase letter, a lowercase letter, and a number',
    },
  },
});

testUserSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

module.exports = mongoose.model('testUser', testUserSchema);