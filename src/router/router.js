const express = require('express');
const router = express.Router();

const signUp = require('./routes/signup');
const signIn = require('./routes/signin');
const logout = require('./routes/logout');
const save = require('./routes/save');
const test = require('./routes/test');
const deleteSong = require('./routes/deletesong');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/save', save);
router.get('/logout', logout);
router.get('/test', test);
router.delete('/deletesong', deleteSong);

module.exports = router;
