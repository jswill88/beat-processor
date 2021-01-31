const User = require('../../models/userModel');

module.exports = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    let { songId, newTitle } = req.body;

    if (!token) {
      return next({
        status: 400,
        message: 'Must be signed in to rename a song',
      });
    }
    if (!songId || !newTitle) {
      return next({
        status: 400,
        message: 'Must select a song to rename and provide a new title',
      });
    }

    const user = await User.getUserFromToken(token);

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
