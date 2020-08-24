const express = require('express');

const router = express.Router();

const DataBase = require('../models/functions');

/* POST user page. */
router.post('/', async (req, res) => {
  const { Username, UserPassword } = req.body;
  console.log(Username, UserPassword);

  try {
    const response = await DataBase.getByUsername(Username);
    console.log('hello from user.js!');

    //whole data is currently here.
    //things that need to happen.
    //test password.
    //mutate data to remove password to send back to the front end.

    const workData = response;
    if (UserPassword === workData.password) {
      console.log('The password checks out, boss.');
      const { username, first_name, last_name } = workData;
      const SendingData = { username, first_name, last_name };
      res.json(SendingData).status(200);
    } else {
      if (response === 'No data returned from the query.') {
        res
          .json({
            error:
              'Sorry! That username or password is invalid! Try again, Batman!',
          })
          .status(200);
      } else {
        res
          .json({
            error:
              'Sorry! That username or password is invalid! Try again, Batman!',
          })
          .status(200);
      }
    }
  } catch (e) {
    console.log('the api on backend failed to fetch in user.js.');
    return e;
  }
});

module.exports = router;
