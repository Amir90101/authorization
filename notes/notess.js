const express = require('express');
const notes = express.Router();
const fs = require('fs').promises;


notes.post('/create-user', async (req, res) => {
  try {
    const rawdata = await fs.readFile('./db/userNotes.json', 'utf8');
    const data = JSON.parse(rawdata);
    const identifier = new Date().getTime().toString();
    data[identifier] = req.body;
    await fs.writeFile('./db/userNotes.json', JSON.stringify(data));
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
notes.delete('/dataa/:id',async(req,res)=>{
  const rawdata = await fs.readFile('./db/userNotes.json', 'utf8');
  const data = JSON.parse(rawdata);
  const id = req.params.id
  if (data.hasOwnProperty(id)) {
    delete data[id];
    await fs.writeFile('./db/userNotes.json', JSON.stringify(data));
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
})
notes.get('/dataa', async (req, res) => {
  try {
    const rawdata = await fs.readFile('./db/userNotes.json', 'utf8');
    const data = JSON.parse(rawdata);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
notes.put('/dataa/:id', async (req, res) => {
  const id = req.params.id; 
  const newData = req.body; 

  try {
    const rawdata = await fs.readFile('./db/userNotes.json', 'utf8');
    const data = JSON.parse(rawdata);
    
    if (data.hasOwnProperty(id)) {
      data[id].name = newData.name;

      await fs.writeFile('./db/userNotes.json', JSON.stringify(data)); 

      res.sendStatus(200); 
    } else {
      res.sendStatus(404); 
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});






















// notes.post('/create-user', async (req, res) => {
//   try {
//     const rawdata = await fs.readFile('./db/userNotes.json', 'utf8');
//     const data = JSON.parse(rawdata);
//     const identifier = new Date().getTime().toString();
//     data[identifier] = req.body;
//     await fs.writeFile('./db/userNotes.json', JSON.stringify(data));
//     res.sendStatus(200);
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });





// notes.delete('/dataa/:id', async (req, res) => {
//   const rawdata = await fs.readFile('./db/userNotes.json', 'utf8');
//   const data = JSON.parse(rawdata);
//   const id = req.params.id
//   if (data.hasOwnProperty(id)) {
//     delete data[id];
//     await fs.writeFile('./db/userNotes.json', JSON.stringify(data));
//     res.sendStatus(200);
//   } else {
//     res.sendStatus(404);
//   }
// })






// notes.get('/dataa', async (req, res) => {
//   try {
//     const rawdata = await fs.readFile('./db/userNotes.json', 'utf8');
//     const data = JSON.parse(rawdata);
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });





// notes.put('/dataa/:id', async (req, res) => {
//   const id = req.params.id;
//   const data = req.body;

//   try {
//     const rawdata = await fs.readFile('./db/userNotes.json', 'utf8');
//     const data = JSON.parse(rawdata);

//     if (data.hasOwnProperty(id)) {
//       data[id].name = data.name;

//       await fs.writeFile('./db/userNotes.json', JSON.stringify(data));

//       res.sendStatus(200);
//     } else {
//       res.sendStatus(404);
//     }
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });


module.exports = notes