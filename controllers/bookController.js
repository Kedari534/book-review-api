const Book = require('../models/Book');
const Review = require('../models/Review');

exports.addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const newBook = new Book({
      title,
      author,
      genre,
      createdBy: req.user.id
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const filter = {};
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = new RegExp(genre, 'i');

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Get reviews and average rating
    const reviews = await Review.find({ book: bookId })
      .populate('user', 'username')
      .limit(10); // pagination can be improved

    const avgRatingAggregate = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: '$book', avgRating: { $avg: '$rating' } } }
    ]);

    const avgRating = avgRatingAggregate.length > 0 ? avgRatingAggregate[0].avgRating : null;

    res.json({ book, avgRating, reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
