const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const songSchema = require('./songModel');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
  username: {
    type: String,
    required: true,
  },
  songs: {
    type: [songSchema],
    required: true,
  },
  role: {
    type: String,
    enum: ['user','admin'],
    default: 'user',
    required: true, 
  },
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign({
    id: this._id,
  }, process.env.JWT_SECRET);
  return token;
};

module.exports = mongoose.model('User', userSchema);