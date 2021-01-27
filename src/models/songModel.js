const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String }, 
  buttonsPressed: { type: Object },
  bpm: { type: Number },
  volume: { type: Number }, 
  numberOfBeats: { type: Number }, 
  chordProgression: { type: Array }, 
});

module.exports = songSchema;

