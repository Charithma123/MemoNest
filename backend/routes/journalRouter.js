const express = require("express");
const { getAllJournals, createJournal, getJournalById, updateJournal, deleteJournal } = require("../controller/journalController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect);

router.route('/').get(getAllJournals).post(createJournal);
router.route('/:id').get(getJournalById).patch(updateJournal).delete(deleteJournal);

module.exports = router;