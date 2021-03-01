const User = require('../../models/userModel');

module.exports = async (req, res, next) => {
  try {
    let {
      email,
      password,
      passwordVerify,
      username,
    } = req.body;

    if (password !== passwordVerify) {
      return next({ status: 400, message: 'Passwords do not match' });
    }
    const { length } = password;
    if(length < 6 || length > 32) {
      return next({
        status: 400,
        message: 'Password must be from 6-32 characters',
      });
    }

    email = email.toLowerCase();

    if (!username) {
      username = email;
    }

    const newUser = new User({ email, password, username });
    let error = newUser.validateSync();

    if (error) {

      let messageArray = [];
      for (let type in error.errors) {
        messageArray.push(error.errors[type].message);
      }
      const message = messageArray.join(', ');
      return next({ status: 400, message });

    } else {

      const savedUser = await newUser.save();

      const token = savedUser.generateToken();

      res
        .status(201)
        .cookie('token', token, {
          httpOnly: true,
        })
        .json('User successfully added');
    }

  } catch (e) {

    if (e.code && e.code === 11000) {
      next({ message: 'Account with that email already exists' });
    } else {
      next({ message: e.message });
    }
  }
};