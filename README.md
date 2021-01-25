Routes:
POST /signup
POST /signin
GET /open
POST /save
DELETE /delete
PUT /update

DB:
User
  email: String required
  username: String
  password: String required
  songs: Array of Songs default []
  role: Stringm, enum [user, admin], default user

Song
  title: String
  buttonsPressed: Object
  bpm: Number
  volume: Number
  numberOfBeats: Number
  chordProgression: Array



Resource: 
https://www.youtube.com/watch?v=scYojqjnHzI&t=145s