const { User } = require('../../models/userModel');

module.exports = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return next({
        status: 400,
        message: 'Missing email or password',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next({
        status: 401,
        message: 'No user found with that email',
      });
    }

    const match = await user.comparePasswords(password);
    if (!match) {
      return next({
        status: 401,
        message: 'Wrong password',
      });
    }

    const token = user.generateToken();

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
      })
      .json('User successfully signed in');

  } catch (e) {
    next({ message: e.message });
  }

};
