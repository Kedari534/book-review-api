const express = require('express');
const auth = require('../middleware/auth');
const {
  addBook,
  getBooks,
  getBookById
} = require('../controllers/bookController');

const router = express.Router();

router.post('/', auth, addBook);
router.get('/', getBooks);
router.get('/:id', getBookById);

module.exports = router;
