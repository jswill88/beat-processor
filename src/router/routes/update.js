const User = require('../../models/userModel');

module.exports = async (req, res, next) => {
  try {
    const { id } = req;
    const updatedSong = req.body;
    const { songId } = updatedSong;

    if(!songId) {
      return next({
        status: 400,
        message: 'Must have song selected to update',
      });
    }

    const user = await User.findById(id);
    const song = user.songs.id(songId);

    for (let key in updatedSong) {
      song[key] = updatedSong[key];
    }

    await user.save();

    res.status(200).json({title: song.title});

  } catch (e) {

    next({ message: e.message });
  }
};
