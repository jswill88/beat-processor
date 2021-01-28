const base64 = require('base-64');
const express = require('express');
const router = express.Router();
const { User } = require('../models/userModel');

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

    if (!email || !password) {
      return next({
        status: 400,
        message: 'Missing email or password',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next({
        status: 401,
        message: 'No user found with that email',
      });
    }

    const match = await user.comparePasswords(password);
    if (!match) {
      return next({
        status: 401,
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

router.get('/logout', (_req, res, next) => {
  try {
    res
      .status(200)
      .cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
      })
      .send();
  } catch (e) {
    next({ message: e.message });
  }
});

router.get('/test', (req, res, next) => {
  console.log(req.cookies);
  res.send();
});

router.post('/save', async (req, res, next) => {
  try {
    const song = req.body;
    const token = req.cookies.token;

    const encryptedId = token.split('.')[1];
    const id = JSON.parse(base64.decode(encryptedId)).id;
    console.log(id);
    const user = await User.findById(id);
    const currentSongs = user.songs;
    currentSongs.push(song);
    
    // get id from token
    // see if a song already exists of that name
    // add new song to array in songs for user
    res.status(201).send('Song saved');
  } catch (e) {
    next({ message: e.message });
  }
});

module.exports = router;
