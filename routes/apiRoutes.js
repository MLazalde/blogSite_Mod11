const fb = require("express").Router(); //router object

// Helper function to generate unique ids
const uuid = require("../helpers/uuid");

// Helper functions for reading and writing to the JSON file
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");

// GET Route for retrieving all the notes
//http://localhost:3001/api/notes
fb.get("/notes", (req, res) => {
  console.info(`${req.method} request received for notes`);

  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting notes
//http://localhost:3001/api/notes
fb.post("/notes", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to submit a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      title_id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting feedback");
  }
});

module.exports = fb;
