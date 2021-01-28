const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/signup', async (req, res, next) => {
  try {
    let {
      email,
      password,
      passwordVerify,
      username,
    } = req.body;

    if (password !== passwordVerify) {
      return next({ status: 400, message: 'Passwords do not match' });
    }

    if (!username) {
      username = email;
    }

    const newUser = new User({ email, password, username });
    let error = newUser.validateSync();

    if (error) {

      let messageArray = [];
      for (let type in error.errors) {
        messageArray.push(error.errors[type].message);
      }
      const message = messageArray.join(', ');
      return next({ status: 400, message });

    } else {

      const savedUser = await newUser.save();

      const token = savedUser.generateToken();

      res
        .status(201)
        .cookie('token', token, {
          httpOnly: true,
        })
        .json('User successfully added');
    }

  } catch (e) {

    if (e.code && e.code === 11000) {
      next({ message: 'Account with that email already exists' });
    } else {
      next({ message: e.message });
    }
  }

});

router.post('/signin', async (req, res, next) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next({
        status: 400,
        message: 'No user found with that email',
      });
    }

    const match = await user.comparePasswords(password);
    if (!match) {
      return next({
        status: 400,
        message: 'Wrong password',
      });
    }

    const token = user.generateToken();

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
      })
      .json('User successfully signed in');

  } catch (e) {
    next({ message: e.message });
  }

});

router.post('/save', (req, res, next) => {
  try {
    const { token, song } = req.body;
    // get id from token
    // see if a song already exists of that name
    // add new song to array in songs for user

  } catch (e) {
    next({ message: e.message});
  }
});

module.exports = router;
