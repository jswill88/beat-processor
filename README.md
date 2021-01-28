Routes:  
xPOST /signup  
xPOST /signin  
GET /open  
POST /save  
DELETE /delete  
PUT /update
GET /examples  

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