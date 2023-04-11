//init modules
const fs = require("fs");
const util = require("util");

//custom fs function to promisify readFile method (readFromFile)
const readFromFile = util.promisify(fs.readFile);

//function to write data to JSON file (writeToFile)
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err
      ? console.error("Error: ", err)
      : console.info(`\nData has been written to ${destination} successfully!`)
  );

//function to read data and append new data (readAndAppend)
const readAndAppend = (newData, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    err ? console.error(err): 
    (() => {
      const parsedData = JSON.parse(data);
      parsedData.push(newData);
      writeToFile(file, parsedData);
    })();
      
  });
};

//export statement for fsUtils module
module.exports = { readFromFile, writeToFile, readAndAppend };
