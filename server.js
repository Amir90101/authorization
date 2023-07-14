const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const fs = require('fs/promises');
const loginUp = require('./loginUp/loginUpp')
const loginIn = require('./loginIn/loginIIn')
const notes = require('./notes/notess')



app.use(express.static('loginUp'));
app.use(express.static('loginIn'));
app.use(express.static('notes'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/loginUp/loginUp.html'));
});
app.get('/loginIn', (req, res) => {
  res.sendFile(path.join(__dirname, '/loginIn/loginIn.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/notes/notes.html'));
});




app.use('/', loginUp);

app.use('/', loginIn);

app.use('/', notes);













app.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`));