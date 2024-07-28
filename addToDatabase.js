const mongoose = require('mongoose');
const mongoString = 'mongodb://localhost:27017/BookReviewForum';

mongoose.connect(mongoString);
const database = mongoose.connection;

// Define a Mongoose schema for the user data
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String
});

// Create a Mongoose model for the 'userDatabase' collection
const UserDatabase = mongoose.model('UserDatabase', userSchema, 'userDatabase');

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', async () => {
    console.log('Database Connected');

    // Sample user data
    const sampleUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        password: 'password123'
    };

    // Create a new user instance
    const newUser = new UserDatabase(sampleUser);

    try {
        // Save the new user to the 'userDatabase' collection using async/await
        const savedUser = await newUser.save();
        console.log('User saved to database:', savedUser);
    } catch (err) {
        console.error('Error saving user to database:', err);
    } finally {
        mongoose.connection.close();
    }
});
