const express = require('express');

const router = express.Router();

const DataBase = require('../models/functions');

/* GET home page. */
router.get('/', async (req, res) => {
  const response = await DataBase.getGameByName();
  console.log(response);
  console.log('Reponse?');
  res.render('index', { title: 'Express' });
});

module.exports = router;
