const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');

module.exports = async (req, res, next) => {
  try {
    console.log('something happening');
    const { token, songId } = req.cookies;
    console.log('login route token', token);
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
    // get all info needed if user logged in (name, songlist)
    if (songId) res.clearCookie('songId',
      {
        httpOnly: true,
        //////////////////
        secure: true,
        sameSite: 'None',
        domain: '*.cake-pop.netlify.app',
        // maxAge: 600000000,
        //////////////////
      });

    res.status(200)
      .send({ songList, username });

  } catch (e) {
    res.status(200).json(false);
  }
};
