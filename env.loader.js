const fs = require('fs'); //module for work with files
const path = require('path'); //module for work with paths

//finding path to file
const envPath = path.resolve('.env');

//read content of the file as a text
const envFile = fs.readFileSync(envPath, 'utf-8');

//We split the text into lines and process each one
envFile.split('\n').forEach((line) => {
  line = line.trim(); //remove whitespaces in line
  if (!line || line.startsWith('#')) return; //Skipping blank lines and comments
  const parts = line.split(/=(.+)/); //This is a regular
  // expression (RegExp) that is used to split a string
  // into only two parts: the key and everything
  // else as the value,
  //  even if there is = inside the value.
  const key = parts[0];
  const value = parts[1];
  if (key && value) {
    process.env[key.trim()] = value.trim(); //save in process.env
  }
});
//We add a variable to process.env so that
//  it can be used in code via process.env.KEY.

module.exports = process.env;
