const express = require('express');
const DataBase = require('../models/functions');
require('dotenv').config();

const API_KEY = process.env.OT_API;
const API_SECRET = process.env.OT_API_SECRET;

router.get('/game', async (req, res) => {
  const response = await DataBase.getGameByName();
  res.json(response).status(200);
});
