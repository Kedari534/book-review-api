const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({ book: bookId, user: userId });
    if (existingReview)
      return res.status(400).json({ message: 'You have already reviewed this book' });

    const newReview = new Review({
      book: bookId,
      user: userId,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);
    if (!review)
      return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== userId)
      return res.status(403).json({ message: 'Not authorized to update this review' });

    review.rating = rating !== undefined ? rating : review.rating;
    review.comment = comment !== undefined ? comment : review.comment;

    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id;

    const review = await Review.findById(reviewId);
    if (!review)
      return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== userId)
      return res.status(403).json({ message: 'Not authorized to delete this review' });

    await review.deleteOne();
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
