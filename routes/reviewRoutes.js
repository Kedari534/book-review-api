const express = require('express');
const auth = require('../middleware/auth');
const {
  addReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

const router = express.Router();

router.post('/:bookId', auth, addReview);
router.put('/:id', auth, updateReview);
router.delete('/:id', auth, deleteReview);

module.exports = router;
