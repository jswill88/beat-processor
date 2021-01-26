const express = require('express');
const router = express.Router();
const TestUser = require('../models/userModel');

router.post('/testsignup', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const newUser = new TestUser({email, password});
    let error = newUser.validateSync();

    if(error) {

      let messageArray = [];
      for (let type in error.errors){
        messageArray.push(error.errors[type].message);
      }
      const message = messageArray.join(', ');
      return next({status: 400, message});

    } else {

      await newUser.save();

    }

    res.status(201).json(`email: ${email} password: ${password}`);

  } catch (e) {

    if (e.code && e.code === 11000) {
      next({ message: 'Account with that email already exists' });
    } else {
      next({ message: e.message });
    }
  }

});

module.exports = router;