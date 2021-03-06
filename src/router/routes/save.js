const User = require('../../models/userModel');
/**
 * @name save Saves a new song. Adds a number to the title if 
 * the title already exists. Calls the song 'Untitled' if no 
 * title provided. Adds new song to cookie
 * 
 * @param {Object} req New song in req.body, id in req
 * @param {Object} res Responds with object containing title and id
 * @param {Function} next 
 */
module.exports = async (req, res, next) => {
  try {
    const songToSave = req.body;
    const { id } = req;

    if (!songToSave) {
      return next({
        status: 500,
        message: 'Missing song to save',
      });
    }
    if (!songToSave.title) {
      songToSave.title = 'Untitled';
    }

    const user = await User.findById(id);

    const currentSongs = user.songs;

    const titles = currentSongs.map(({ title }) => title);

    if (titles.includes(songToSave.title)) {
      let i = 1;
      while (titles.includes(songToSave.title + `-${i}`)) {
        i++;
      }
      songToSave.title += `-${i}`;
    }

    currentSongs.push(songToSave);

    await User.findByIdAndUpdate(id, { songs: currentSongs });

    const { songs } = await User.findById(id);
    const newSongId = songs.pop()._id;

    res
      .status(201)
      .json({
        title: songToSave.title,
        id: newSongId,
      });
  } catch (e) {
    next({ message: e.message, status: e.status || 500 });
  }
};
