//import modules (router, fsUtil, uuid)
const notes = require("express").Router();
const { readAndAppend } = require('../helpers/fsUtils')
const { v4: uuidv4 } = require("uuid");

//GET for retrieving all notes
notes.get("/", (req, res) => {
  readFromFile("./db/feedback.json")
    .then((data) => {
      res.json(JSON.parse(data));
    })
    .catch((err) => {
      res.status(500).send("Server error");
    });
});

//POST for submitting new notes
notes.post("/", (req, res) => {
  //destructured items from request
  const { title, text } = req.body;
  //if statement to check for all conditions met
  if (title && text) {
    const newNote = {
      id: uuidv4(),
      title,
      text,
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.status(400).send("Error in posting a new note.");
  }
});

//export statement for notes module
module.exports = notes;
