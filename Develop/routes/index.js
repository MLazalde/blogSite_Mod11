const router = require("express").Router(); //router object -mini app

// Import our files containing our routes
const notesRouter = require("./notes"); //router object with the fb routes attached.

//MIDDLEWARE

//http://localhost:3001/api/notes
router.use("/notes", notesRouter);
