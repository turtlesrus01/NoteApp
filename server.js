//init modules (fs, uuid, express, path)
const express = require('express');
const fs = require('fs');
const uuid = require('uuid');
const path = require('path');
const app = express();

//init middleware (api, urlencoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//port handler 
const PORT = process.env.PORT || 3001;

//get route for index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//get route for notes.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//app listener once server has started
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);