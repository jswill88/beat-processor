const User = require('../../models/userModel');

module.exports = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return next({
        status: 400,
        message: 'Missing email or password',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
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
    const { username } = user;
    const songs = user.songs.map(({title, _id}) => ({title, id: _id}));

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        //////////////////
        sameSite: 'none',
        secure: true,
        domain: '*.cake-pop.netlify.app',
        // maxAge: 600000000,
        //////////////////
      })
      .json({ username, songs });

  } catch (e) {
    next({ message: e.message });
  }

};
