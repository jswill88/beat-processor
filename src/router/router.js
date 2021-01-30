const express = require('express');
const router = express.Router();

const signUp = require('./routes/signup');
const signIn = require('./routes/signin');
const logout = require('./routes/logout');
const save = require('./routes/save');
const test = require('./routes/test');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/save', save);

router.get('/logout', logout);
router.get('/test', test);


const base64 = require('base-64');
const User = require('../models/userModel');

// try moving the active song out of the token, and back into 
// it's own songId or something. Just clear taht cookie if you 
// deleting the active song

// maybe consider moving some of the logic outside of the
// callback function
router.delete('/deletesong', async (req, res, next) => {
  try {
    const { songIdToDelete } = req.body;
    const { token, songId } = req.cookies;
    let songTitle;

    console.log(songIdToDelete, songId);

    if (!token || token === 'undefined') {
      return next({
        status: 400,
        message: 'Must be signed in to delete song',
      });
    }
    if (!songIdToDelete) {
      return next({
        status: 400,
        message: 'Must select song to delete',
      });
    }

    const encryptedId = token.split('.')[1];
    const { id } = JSON.parse(base64.decode(encryptedId));

    let songExists = true;

    await User.findByIdAndUpdate(id, {}, async (err, user) => {

      if (err) return next({ message: 'Error finding user' });
      console.log(user.songs);

      const songToDelete = await user.songs.id(songIdToDelete);
      console.log('song to delete', songToDelete);
      if (!songToDelete) {
        console.log('in if');
        songExists = false;
        return;
      }
      console.log('after if');
      songTitle = songToDelete['title'];
      console.log('song title', songTitle);
      await user.songs.pull(songIdToDelete);
      user.save();

      return;
    });

    if (!songExists || !songTitle) {
      console.log('in not !songExists', songExists);
      return next({ message: 'Error finding song' });
    }

    else {
      console.log('after next', songExists);
      if (songId === songIdToDelete) {
        res.clearCookie('songId');
      }
      res
        .status(200)
        .json(`Successfully deleted ${songTitle}`);
    }
    console.log('somehow in neither');
  } catch (e) {

    next({ message: e.message });
  }
});


module.exports = router;
