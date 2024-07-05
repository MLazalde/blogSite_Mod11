const fb = require("express").Router(); //router object

// Helper function to generate unique ids
const uuid = require("../helpers/uuid");

// Helper functions for reading and writing to the JSON file
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

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

// POST Route for submitting notes
//http://localhost:3001/api/notes
fb.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  console.info(
    `${req.method} request received to delete note with id: ${noteId}`
  );

  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Create a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.title_id !== noteId);

      // Save that array to the filesystem
      writeToFile("./db/db.json", result);

      // Respond to the DELETE request
      res.json(`Note ${noteId} has been deleted`);
    });
});

module.exports = fb;
