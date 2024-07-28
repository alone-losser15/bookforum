const express = require('express');
const Book = require('../models/book');
const router = express.Router();

// Utility function to format genre name
function formatGenreName(genreName) {
    // Remove hyphens and capitalize first letter of every word
    return genreName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

router.get('/:genreName', async (req, res) => {

    const { genreName } = req.params;
    const formattedGenreName = formatGenreName(genreName); // Format the genre name

    try 
    {
        // Query the database for books where the genres array includes the formatted genre name
        const books = await Book.find ( { genres: { $in: [formattedGenreName ] }  } ).lean();

        // Render a page displaying the details of the books
        const genreTitle = genreName.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
        res.render('genre_menu', { books, genreTitle,isAdmin: req.session.isAdmin });
    } 
    catch (err) {
        console.error('Error fetching books:', err);
        res.sendStatus(500); // Internal server error
    }
});


module.exports = router;
