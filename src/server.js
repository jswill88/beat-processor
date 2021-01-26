const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router/router');
const serverError = require('./errors/500');

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);
app.use(serverError);


module.exports = {
  start: port => app.listen(port, () => {
    console.log(`listening on ${port}`);
  }),
};
