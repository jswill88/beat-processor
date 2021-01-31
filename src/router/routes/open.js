const User = require('../../models/userModel');

module.exports = async (req, res, next) => {
  try{
    const { songId } = req.body;
    const { token } = req.cookies;

    if(!songId) {
      return next({
        message: 'Need to select song to open',
        status: 400,
      });
    }
  
    const user = await User.getUserFromToken(token);
    const song = user.songs.id(songId);
  
    res
      .status(200)
      .cookie('songId', songId, {
        httpOnly: true,
      })
      .json(song);

  } catch(e) {
    next({ message: e.message });
  }
};
