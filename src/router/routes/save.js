const base64 = require('base-64');
const User = require('../../models/userModel');

module.exports = async (req, res, next) => {
  try {
    const songToSave = req.body;
    const token = req.cookies.token;

    if(!token) { 
      return next({
        status: 400,
        message: 'Must be signed in to save song',
      });
    }
    if(!songToSave) {
      return next({
        status: 500,
        message: 'Missing song to save',
      });
    }
    if(!songToSave.title) {
      songToSave.title = 'Untitled';
    }

    const encryptedId = token.split('.')[1];
    const id = JSON.parse(base64.decode(encryptedId)).id;

    const user = await User.findById(id);

    const currentSongs = user.songs;

    const titles = currentSongs.map(({ title }) => title);

    let i = 1;
    if(titles.includes(songToSave.title)) {
      while(titles.includes(songToSave.title + `-${i}`)) {
        i++;
      }
      songToSave.title += `-${i}`;
    }

    currentSongs.push(songToSave);

    await User.findByIdAndUpdate(id, { songs: currentSongs });

    res.status(201).send(`Song '${songToSave.title}' saved`);
  } catch (e) {
    next({ message: e.message });
  }
};
