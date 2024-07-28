const express = require('express');
const User = require('../models/user');
const Book = require('../models/book');
const Review = require('../models/reviews');
const router = express.Router();

router.get('/:email', async (req, res) => {
    try {
        const email = req.params.email;

        // Find the user data
        const userData = await User.findOne({ email }).lean();

        if (!userData) {
            return res.status(404).send('User not found');
        }

        // Find all reviews by the user
        const userReviews = await Review.find({ reviewerId: userData._id }).populate('bookId').lean();

        // Find all liked books by the user
        const likedBooks = await Book.find({ _id: { $in: userData.likedBooks } }).lean();
        /* console.log("USER REVIEWS: ", userReviews);
        console.log("USER DATA: ", userData); 
        console.log("LIKED BOOKS: ", likedBooks); */
        res.render('userProfile', { userData, userReviews, likedBooks, isAdmin: req.session.isAdmin });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/remove-from-favourites/:bookId', async (req, res) => {
    const { bookId } = req.params;
    try {
        // Find the user by email and update the likedBooks array
        const updatedUser = await User.findOneAndUpdate(
            { email: req.session.email },
            { $pull: { likedBooks: bookId } }, // Use $pull to remove the bookId from the array
            { new: true } // Return the updated document
        );
        res.status(200).json({ message: 'Book removed from favourites', user: updatedUser });
    } catch (error) {
        console.error('Error removing book from favourites:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;
