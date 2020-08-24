const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');
const search = require('./routes/search');
const getName = require('./routes/gamename');
const getUser = require('./routes/user');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  // 'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Headers':
  //   'Origin, X-Requested-With, Content-Type, Accept',
};

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.use('/search', search);
app.use('/game', getName);
app.use('/user', getUser);
app.use('/', indexRouter);

module.exports = app;
