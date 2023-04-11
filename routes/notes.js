//import modules (router, fsUtil, uuid)
const notes =  require('express').Router();
//const { readAndAppend } = require('../helpers/fsUtils')
const { v4: uuidv4 } = require('uuid');

//GET for retrieving all notes
notes.get('/', (req , res) => {
  readFromFile('./db/feedback.json')
  .then((data) => {
    res.json(JSON.parse(data));
  })
  .catch((err) => {
    res.status(500).send('Server error');
  })
});

//POST for submitting new notes

  //destructured items from request
  //if statement to check for all conditions met
  
//export statement for notes module
