
const express = require('express');
const Genre = require('../models/genre');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find({}).lean();
        res.render('home', { genres, isAdmin: req.session.isAdmin });
    } catch (err) {
        console.error('Error fetching genres:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
