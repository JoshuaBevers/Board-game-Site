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

router.get('/', async (req, res) => {
  try {
  } catch (e) {}
  const response = await DataBase.getGameByName();
  console.log('hello!');
  console.log(response);
  res.send(response).status(200);
});

module.exports = router;
