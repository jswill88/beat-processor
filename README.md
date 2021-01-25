Routes:
POST /signup
POST /signin
GET /open
POST /save
DELETE /delete
PUT /update

DB:
Users
  email: String required
  username: String
  password: String required
  songs: Array of Songs default []
  authorization: Stringm, enum [user, admin], default user

Songs