const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors)

module.exports = {
  start: port => app.listen(port, () => {
    console.log(`listening on ${port}`)
  })
}