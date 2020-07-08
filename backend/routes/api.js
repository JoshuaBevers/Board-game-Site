// const express = require('express');
// const DataBase = require('../models/functions');
// require('dotenv').config();

// const router = express.Router();

// router.get('/api', async (req, res) => {
//   const response = await DataBase.getGameByName();
//   res.json(response).status(200);
// });

const express = require('express');
const DataBase = require('../models/functions');

const router = express.Router();

router.get('/game', async (req, res) => {
  //   res.render('index', { title: 'Express' });
  const response = await DataBase.getGameByName();
  console.log('hello!');
  res.status(200);
});

module.exports = router;
