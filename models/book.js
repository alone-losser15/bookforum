
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookName: { type: String, required: true },
    authors: { type: [String], required: true },
    bookTagline: { type: String },
    publishedYear: { type: String },
    genres: { type: [String] },
    bookCoverPath: { type: String },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
