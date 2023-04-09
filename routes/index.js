//init modules (express)
const express = require("express");

//import module routes for notes
const notesRouter = require("./notes");
const app = express();

//middleware in order to tie router to notes pathway
app.use("/notes", notesRouter);

//middleware error handler for server errors
app.use((err, req, res, next) => {
  res.status(500).send("Internal Server Error");
});

module.exports = app;
