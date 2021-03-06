const User = require('../../models/userModel');
/**
 * @name deleteSong Takes in songIdToDelete from the request body
 * and the user token from the cookie. Finds the user and deletes
 * the song from their account
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
module.exports = async (req, res, next) => {
  try {
    const { songIdToDelete } = req.body;
    const { id } = req;
    const { songId } = req.cookies;

    if (!songIdToDelete) {
      return next({
        status: 400,
        message: 'Must select song to delete',
      });
    }

    const user = await User.findById(id);

    const songToDelete = user.songs.id(songIdToDelete);
    
    if (!songToDelete) {
      return next({ message: 'Error finding song' });
    }

    const { title } = songToDelete;
    user.songs.pull(songIdToDelete);

    await user.save();

    if (songId === songIdToDelete) {
      res.clearCookie('songId', {
        httpOnly: true,
        //////////////////
        secure: true,
        sameSite: 'None',
        domain: '*.cake-pop.netlify.app',
        // maxAge: 600000000,
        //////////////////
      });
    }
    res
      .status(200)
      .json({ title });

  } catch (e) {
    next({ message: e.message });
  }
};
