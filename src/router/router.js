const express = require('express');
const router = express.Router();

const signUp = require('./routes/signup');
const signIn = require('./routes/signin');
const logout = require('./routes/logout');
const save = require('./routes/save');

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/save', save);

router.get('/logout', logout);

router.get('/test', (req, res, next) => {
  console.log(req.cookies);
  res.send();
});


module.exports = router;
