const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

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

      const token = jwt.sign({
        userId: savedUser._id,
      }, process.env.JWT_SECRET);

      console.log(token);

      res
        .status(201)
        .cookie('token', token, {
          httpOnly: true,
        })
        .send('User successfully added');
    }

  } catch (e) {

    if (e.code && e.code === 11000) {
      next({ message: 'Account with that email already exists' });
    } else {
      next({ message: e.message });
    }
  }

});

module.exports = router;
