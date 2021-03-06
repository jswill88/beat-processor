const express = require('express');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const router = require('./router/router');
const generalError = require('./errors/generalError');
const routeError = require('./errors/404');

console.log(process.env.ORIGIN_DEV);

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    process.env.ORIGIN_DEV,
    process.env.ORIGIN_PROD,
  ],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET','PUT','POST','DELETE','PATCH','HEAD'],
  preflightContinue: true,
}));

app.use('/api/v1', router);
app.get('/', (_req,res) => res.status(200).json('Cake Pop API'));

app.use('*', routeError);
app.use(generalError);

module.exports = {
  start: port => app.listen(port, () => {
    console.log(`listening on ${port}`);
  }),
};
