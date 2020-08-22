const express = require('express');

const router = express.Router();

const DataBase = require('../models/functions');

/* GET home page. */
router.post('/', async (req, res) => {
  const { Username, UserPassword } = req.body;
  console.log(Username, UserPassword);

  try {
    const response = await DataBase.getByUsername(Username);
    console.log('hello from user.js!');
    console.log(
      'the data about to be sent back to the front end is: ',
      response,
    );

    res.json('hello').status(200);
    return response;
  } catch (e) {
    console.log('the api on backend failed to fetch in user.js.');
    return e;
  }
});

module.exports = router;
