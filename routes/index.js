//init modules (express)
const express = require('express');

//import module routes for notes
const notesRouter = require('./notes');
const app = express();

//middleware in order to tie router to notes pathway
app.use('/notes', notesRouter)

module.exports = app;