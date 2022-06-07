const express = require("express");
const {
    findDiary, createDiary, diaryById, updateDiary, deleteDiary
} = require('../controllers/diary');
const { checkToken } = require('../middleware/auth');

const router = express.Router();

// In index.js, we told express that the /customer route should use this router file
// The below /register route extends that, so the end result will be a URL
// that looks like http://localhost:4000/customer/register
router.get("/", findDiary);
router.post('/:id', createDiary);
router.get('/:id', diaryById);
router.patch('/:id', updateDiary);
router.delete('/:id', deleteDiary);


// router.get('/profile', checkToken, getdiary);

module.exports = router;