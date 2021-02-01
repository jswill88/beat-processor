const User = require('../../models/userModel');

module.exports = async (req, res, next) => {
  try {
    
    const { token, songId } = req.cookies;
    const updatedSong = req.body;

    if(!token) {
      return next({
        status: 400,
        message: 'Must be signed in to save song',
      });
    }

    if(!songId) {
      return next({
        status: 400,
        message: 'Must have song selected to update',
      });
    }

    const user = await User.getUserFromToken(token);

    const song = user.songs.id(songId);

    for (let key in updatedSong) {
      song[key] = updatedSong[key];
    }

    await user.save();

    res.status(200).json('Song successfully saved');

  } catch (e) {

    next({ message: e.message });
  }
};
