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
// it's own songId or something
router.delete('/deletesong', async (req, res, next) => {
  try {
    const { songIdToDelete } = req.body;
    const { token } = req.cookies;
    let songTitle;

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

    const { id, songId } = JSON.parse(base64.decode(encryptedId));

    let updatedToken;
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

      updatedToken = String(songId) === String(songIdToDelete) ?
        await user.generateToken() : token;

      console.log('updated Token', JSON.parse(base64.decode(updatedToken.split('.')[1])));
      return;
    });

    if (!songExists || !songTitle) {
      console.log('in not !songExists', songExists);
      return next({ message: 'Error finding song' });
    }

    else {
      console.log('after next', songExists);
      res
        .status(200)
        .cookie('token', updatedToken, {
          httpOnly: true,
        }).json(`Successfully deleted ${songTitle}`);
    }

  } catch (e) {
    next({ message: e.message });
  }
});


module.exports = router;
