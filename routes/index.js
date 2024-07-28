
const express = require('express');
const path = require('path');
const router = express.Router();

router.get(['/', '/login'], (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login', 'login.html'));
});

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'signup', 'signup.html'));
});
console.log("PASSED INDEX ROUTE");


module.exports = router;
