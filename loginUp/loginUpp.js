const express = require('express');
const page = express.Router();
const fs = require('fs').promises;

page.post('/submit', async (req, res) => {
  try {
    const rawdata = await fs.readFile('./db/db.json', 'utf8');
    const data = JSON.parse(rawdata);
    const identifier = new Date().getTime().toString();
    data[identifier] = req.body;
    await fs.writeFile('./db/db.json', JSON.stringify(data));
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = page;