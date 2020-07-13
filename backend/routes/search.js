const express = require('express');

const router = express.Router();

const DataBase = require('../models/functions');

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const response = await DataBase.getGameList(req.headers.game);
    console.log('hello from search.js!');
    console.log(response);
    console.log(req.headers);

    res.json(response).status(200);
  } catch (e) {
    console.log('the api on backend failed to fetch in search.js.');
    return e;
  }
});

module.exports = router;
