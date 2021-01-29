Routes:  
xPOST /signup  
xPOST /signin  
xGET /logout  
xPOST /save - behaves like save as  
GET /open  
DELETE /delete - delete a song  
PUT /update - update song already saved without renaming  
PUT /rename  
GET /example songs  
POST /examples  

DB:  
User  
  email: String required  
  username: String  
  password: String required  
  songs: Array of Songs default []  
  role: String, enum [user, admin], default user  

Song  
  title: String  
  buttonsPressed: Object  
  bpm: Number  
  volume: Number  
  numberOfBeats: Number  
  chordProgression: Array  




Resource:  
https://www.youtube.com/watch?v=scYojqjnHzI&t=145s  
