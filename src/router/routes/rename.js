const User = require('../../models/userModel');

module.exports = async (req, res, next) => {
  try {

    let { id } = req;
    let { songId, newTitle } = req.body;

    if (!songId || !newTitle) {
      return next({
        status: 400,
        message: 'Must select a song to rename and provide a new title',
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return next({
        status: 401,
        message: 'Error finding user',
      });
    }

    const otherSongTitles = user.songs
      .filter(({ _id }) => String(_id) !== String(songId))
      .map(({ title }) => title);
    if (otherSongTitles.includes(newTitle)) {
      let i = 1;
      while (otherSongTitles.includes(newTitle + `-${i}`)) {
        i++;
      }
      newTitle += `-${i}`;
    }

    const song = user.songs.id(songId);

    song.title = newTitle;

    await user.save();

    res.status(200).json(`Song successfully renamed ${newTitle}`);

  } catch (e) {
    next({ message: e.message });
  }
};
