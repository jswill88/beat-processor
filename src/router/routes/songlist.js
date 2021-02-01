// const base64 = require('base-64');
const User = require('../../models/userModel');

module.exports = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next({
      status: 400,
      message: 'Must be signed in to see song list',
    });
  }

  const user = await User.getUserFromToken(token);
  if (!user) {
    return next({ message: 'Error finding user' });
  }

  const songList = user.songs.map(({ title, _id }) => ({
    title,
    id: _id,
  }));

  res
    .status(200)
    .json(songList);
};
