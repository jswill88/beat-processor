const base64 = require('base-64');
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
    const { token, songId } = req.cookies;

    if (!token || token === 'undefined') {
      return next({
        status: 400,
        message: 'Must be signed in to delete song',
      });
    }
    if (!songIdToDelete) {
      return next({
        status: 400,
        message: 'Must select song to delete',
      });
    }

    const encryptedId = token.split('.')[1];
    const { id } = JSON.parse(base64.decode(encryptedId));

    const user = await User.findById(id);
    if (!user) {
      return next({ message: 'Error finding user' });
    }
    // console.log(user.songs);
    const songToDelete = user.songs.id(songIdToDelete);
    if (!songToDelete) {
      return next({ message: 'Error finding song' });
    }

    const { title } = songToDelete;
    user.songs.pull(songIdToDelete);

    await user.save();

    if (songId === songIdToDelete) {
      res.clearCookie('songId');
    }
    res
      .status(200)
      .json(`Successfully deleted ${title}`);

  } catch (e) {
    next({ message: e.message });
  }
};
