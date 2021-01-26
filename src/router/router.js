const express = require('express');
const router = express.Router();
const TestUser = require('../models/userModel');

router.post('/testsignup', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password))
      return res.status(400).json({
        error: 'Must have email and password to signup',
      });

    const newUser = await TestUser.create({ email, password });
    console.log(newUser);
    res.status(200).json(`email: ${email} password: ${password}`);

  } catch (e) {

    console.error(e.message);
    
    if (e.code && e.code === 11000) {
      next('Already an account with that email');
    } else {
      next(e.message);
    }
  }

});

module.exports = router;