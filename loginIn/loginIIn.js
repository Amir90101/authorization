const express = require('express');
const loginIn = express.Router();
const fs = require('fs').promises;


loginIn.get('/data', async (req, res) => {
  try {
    const rawdata = await fs.readFile('./db/db.json', 'utf8');
    const data = JSON.parse(rawdata);
    res.json(data);
  } catch (error) {
    res.sendStatus(500);
  }
});


module.exports = loginIn;