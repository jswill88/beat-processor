const base64 = require('base-64');
const express = require('express');
const router = express.Router();
const { User } = require('../models/userModel');

const signUp = require('./routes/signup');
const signIn = require('./routes/signin');
const logout = require('./routes/logout');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/logout', logout);

router.get('/test', (req, res, next) => {
  console.log(req.cookies);
  res.send();
});

router.post('/save', async (req, res, next) => {
  try {
    const songToSave = req.body;
    const token = req.cookies.token;

    if(!token) { 
      return next({
        status: 400,
        message: 'Must be signed in to save song',
      });
    }
    if(!songToSave) {
      return next({
        status: 500,
        message: 'Missing song to save',
      });
    }
    if(!songToSave.title) {
      songToSave.title = 'Untitled';
    }

    const encryptedId = token.split('.')[1];
    const id = JSON.parse(base64.decode(encryptedId)).id;

    const user = await User.findById(id);

    const currentSongs = user.songs;

    const titles = currentSongs.map(({ title }) => title);

    let i = 1;
    if(titles.includes(songToSave.title)) {
      while(titles.includes(songToSave.title + `-${i}`)) {
        i++;
      }
      songToSave.title += `-${i}`;
    }

    currentSongs.push(songToSave);

    await User.findByIdAndUpdate(id, { songs: currentSongs });

    res.status(201).send(`Song '${songToSave.title}' saved`);
  } catch (e) {
    next({ message: e.message });
  }
});

module.exports = router;
