const User = require('../../models/userModel');

module.exports = async (req, res, next) => {

  const { id } = req;

  const user = await User.findById(id);

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
