const User = require('../../models/userModel');

module.exports = async (req, res, next) => {
  try{

    console.log(req.body);
    const { songId } = req.body;
    const { id } = req;

    if(!songId) {
      return next({
        message: 'Need to select song to open',
        status: 400,
      });
    }
    const user = await User.findById(id);

    const song = user.songs.id(songId);
  
    res
      .status(200)
      .cookie('songId', songId, {
        httpOnly: true,
        //////////////////
        secure: true,
        sameSite: 'none',
        //////////////////
      })
      .json(song);

  } catch(e) {
    next({ message: e.message });
  }
};
