//import modules (router, fsUtil, uuid)
const notes = require("express").Router();
const fs = require("fs");
const { readFromFile, readAndAppend } = require('../helpers/fsUtils')
const { v4: uuidv4 } = require("uuid");

//GET for retrieving all notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json")
    .then((data) => {
      res.status(200).json(JSON.parse(data));
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send("Server error");
    });
});

//POST for submitting new notes
notes.post("/", (req, res) => {
  console.log(req.body);
  //destructured items from request
  const { title, text } = req.body;
  //if statement to check for all conditions met
  if (title && text) {
    const newNote = {
      id: uuidv4(),
      title,
      text,
    };
    //read and append will grab new note and append it to the old note
    readAndAppend(newNote, "./db/db.json");
    //this response will send success status and show the new note object 
    const response = {
      status: "success",
      body: newNote,
    };

    res.status(200).json(response);
  } else {
    res.status(400).send("Error in posting a new note.");
  }
});

//DELETE route for deleting notes
notes.delete('/:id', (req, res) => {
  console.log('Delete request received');
  //reads content of the json with callback function
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    //error handler
    if (err) return res.status(422).send(err);
    //try statement to handle more complex code
    try {
      //this gives ID the parameter data 
      const id = req.params.id;
      //this parses the data from the readFile call
      const jsonData = JSON.parse(data);
      //this function will filter out the note of that specific id
      const eraseNote = jsonData.filter(note => note.id !== id);
      //creates new json without deleted note 
      fs.writeFile('./db/db.json', JSON.stringify(eraseNote, null, 4), err => {
        //error handler callback function
        if (err) return res.status(422).send(err);
        //success status and log message
        console.log('Note deleted successfully');
        res.status(200).send('Note deleted successfully');
      });
    //catch error handler
    } catch (err) {
      console.error(err);
      res.status(422).send(err);
    }
  });
});



//export statement for notes module
module.exports = notes;
