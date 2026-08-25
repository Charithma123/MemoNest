const express = require("express");
const { getAllNotes, createNote, getNoteById, updateNote, deleteNote } = require("../controller/noteController");
const router =  express.Router();

router.route('/').get(getAllNotes).post(createNote); //localhost:3000/api/v1/notes/
router.route("/:id").get(getNoteById).patch(updateNote).delete(deleteNote); //localhost:3000/api/v1/notes/id1

module.exports = router;
