const express = require('express');
const router = express.Router();

const signUp = require('./routes/signup');
const signIn = require('./routes/signin');
const logout = require('./routes/logout');
const save = require('./routes/save');
const test = require('./routes/test');
const deleteSong = require('./routes/deletesong');
const songList = require('./routes/songlist');
const open = require('./routes/open');
const update = require('./routes/update');
const rename = require('./routes/rename');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/save', save);

router.get('/logout', logout);
router.get('/songlist', songList);
router.get('/test', test);
router.get('/open', open);

router.delete('/deletesong', deleteSong);

router.put('/update', update);
router.patch('/rename', rename);

module.exports = router;
