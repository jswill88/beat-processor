const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router/router');
const generalError = require('./errors/generalError');
const routeError = require('./errors/404');

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);
app.use('*', routeError);
app.use(generalError);

module.exports = {
  start: port => app.listen(port, () => {
    console.log(`listening on ${port}`);
  }),
};
