const express = require('express');
const DataBase = require('../models/functions');

const router = express.Router();

router.get('/', cors(), async (req, res) => {
  console.log('the api is about to try and fetch.');
  try {
    const response = await DataBase.getGameByName();
    console.log('hello!');
    console.log(response);
    res.send(response).status(200);
  } catch (e) {
    console.log('the api on backend failed to fetch.');
    res.send(status(400));
    return e;
  }
});

module.exports = router;