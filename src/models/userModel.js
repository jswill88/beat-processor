const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { songSchema } = require('./songModel');
const jwt = require('jsonwebtoken');
const base64 = require('base-64');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password required'],
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

userSchema.statics.getUserFromToken = async function (token) {

  const encryptedId = token.split('.')[1];
  const { id } = JSON.parse(base64.decode(encryptedId));
  
  const user = await this.findById(id);
  if(!user) {
    throw new Error('Error finding user');
  }
  return user;

};

module.exports = mongoose.model('User', userSchema);