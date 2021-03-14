const express = require('express');
const router = express.Router();

const signUp = require('./routes/signup');
const signIn = require('./routes/signin');
const logout = require('./routes/logout');
const save = require('./routes/save');
const deleteSong = require('./routes/deletesong');
const songList = require('./routes/songlist');
const open = require('./routes/open');
const update = require('./routes/update');
const rename = require('./routes/rename');
const auth = require('../middleware/auth');
const loggedIn = require('./routes/loggedIn');


router.get('/logout', logout);
router.get('/songlist', auth, songList);

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/save', auth, save);
router.post('/open', auth, open);
router.post('/loggedin', loggedIn);

router.put('/update', auth, update);
router.patch('/rename', auth, rename);

router.delete('/deletesong', auth, deleteSong);

module.exports = router;
