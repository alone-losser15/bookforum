const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for the 'reviews' collection
const reviewSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book', // Reference to the 'books' collection
        required: true
    },
    reviewText: {
        type: String,
        required: true
    },
    reviewDate: {
        type: Date,
        default: Date.now
    },
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the 'users' collection
        required: true
    },
    likedBy: [{
        type: String, // Change the type to String to store email addresses
        required: false
    }]
});

// Create a model for the 'reviews' collection
const Review = mongoose.model('Review', reviewSchema);

// Export the Review model
module.exports = Review;
