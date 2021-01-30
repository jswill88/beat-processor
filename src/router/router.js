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
router.delete('/deletesong', async (req, res, next) => {
  try{
    const { songId } = req.body;
    const { token } = req.cookies;
    let songTitle;
  
    // if songId is the same as the one in the token, remove it from the token
    
    if (!token) {
      return next({
        status: 400,
        message: 'Must be signed in to delete song',
      });
    }
    if (!songId) {
      return next({
        status:400,
        message: 'Must select song to delete',
      });
    }
    const encryptedId = token.split('.')[1];
    const { id } = JSON.parse(base64.decode(encryptedId));
  
    await User.findByIdAndUpdate(id, {}, (err, user) => {
      if (err) return next({message:'Error finding user'});
      const songToDelete = user.songs.id(songId);
      if(!songToDelete) return next({message:'Error finding song'});
      songTitle = songToDelete.title;
      console.log(songTitle);
      user.songs.pull(songId);
      user.save();
    });
  
    await User.findById(id);
  
    res.status(200).send(`Successfully deleted ${songTitle}`);

  } catch (e) {
    next();
  }
});


module.exports = router;
