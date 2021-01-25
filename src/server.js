const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/test', (req, res) => res.send('it works'));

module.exports = {
  start: port => app.listen(port, () => {
    console.log(`listening on ${port}`);
  }),
};
