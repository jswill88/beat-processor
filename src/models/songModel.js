const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  buttonsPressed: { type: Object },
  bpm: { type: Number, required: true },
  numberOfBeats: { type: Number, required: true }, 
  chordProgression: { type: Array, required: true }, 
});

module.exports = {
  songSchema,
  Song: mongoose.model('Song', songSchema),
};

