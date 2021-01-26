const express = require('express');
const router = express.Router();
const TestUser = require('../models/userModel');

router.post('/testsignup', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return next({
        status: 400,
        message: 'Must provide email and password to signup',
      });
    }

    if (
      password.length < 6
      || password.length > 32
      || !password.match(/[0-9]/)
      || !password.match(/[a-z]/)
      || !password.match(/[A-Z]/)
    ) {
      return next({
        status: 400,
        message: 'Password must be between 6 and 32 characters and include an uppercase letter, a lowercase letter, and a number',
      });
    }
    
    const newUser = await TestUser.create({ email, password });
    console.log(newUser);
    res.status(200).json(`email: ${email} password: ${password}`);

  } catch (e) {

    console.error(e.message);

    if (e.code && e.code === 11000) {
      next({ message: 'Account with that email already exists' });
    } else {
      next({ message: e.message });
    }
  }

});

module.exports = router;