const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

module.exports = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token || token === 'undefined') {
      return res.status(200).json(false);
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    const songList = user.songs.map(({ title, _id }) => ({
      title,
      id: _id,
    }));
    const { username } = user;

    res.status(200)
      .send({ songList, username });

  } catch (e) {
    res.status(200).json(false);
  }
};
