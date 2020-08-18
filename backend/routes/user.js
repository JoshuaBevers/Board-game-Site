const express = require('express');

const router = express.Router();

const DataBase = require('../models/functions');

/* GET home page. */
router.get('/', async (req, res) => {
  const { username, password } = req.body;
  console.log(
    'the username and password received from the website is: ',
    username,
    password,
  );
  try {
    const response = await DataBase.getByUsername(req.headers.body);
    console.log('hello from test.js!');
    console.log(response);
    console.log(req.headers);

    res.json(response).status(200);
    return response;
  } catch (e) {
    console.log('the api on backend failed to fetch in user.js.');
    return e;
  }
});

module.exports = router;
