const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        console.log('Received sign-up request for:', username);

        // Check if the username is already taken
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Username is already taken');
            return res.status(400).json({ message: 'Email Already in Use.' });
        }

        // Create a new user instance
        const newUser = new User({ username, email, password });

        // Save the new user to the database
        await newUser.save();
        
        // Set the username and profilePicURL in the session
        req.session.username = newUser.username;
        req.session.profilePicURL = "/profile_pics/blank-profile-picture.png";

        console.log('User saved to database:', newUser);
        res.redirect('/home'); // Redirect to login page after successful signup
    } catch (err) {
        console.error('Error saving user to database:', err);
        res.sendStatus(500); // Internal server error
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if username and password are correct
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        req.session.username = user.username;
        req.session.email = user.email;
        req.session.profilePicURL = user.profilePicURL;
        req.session.isAdmin = user.isAdmin;

        // Redirect or send a success response
        res.redirect('/home');
    } catch (err) {
        console.error('Error authenticating user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
