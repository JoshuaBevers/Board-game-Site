const express = require('express');

const router = express.Router();

const DataBase = require('../models/functions');

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const response = await DataBase.getGameList();
    console.log('hello from search.js!');
    console.log(response);
    res.send(response).status(200);
  } catch (e) {
    console.log('the api on backend failed to fetch in index.');
    return e;
  }
});

module.exports = router;
