const mongodb = require('mongodb');

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/BookReviewForum';

// Create a MongoClient
const MongoClient = mongodb.MongoClient;

// Sample user data
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  username: 'johndoe',
  password: 'password123'
};

// Connect to the MongoDB database
MongoClient.connect(mongoURI, (err, client) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to MongoDB');

  // Access the database and collection
  const db = client.db('BookReviewForum');
  const collection = db.collection('userDatabase');

  // Insert the sample user data into the "userDatabase" collection
  collection.insertOne(userData, (err, result) => {
    if (err) {
      console.error('Error inserting document into the database:', err);
      return;
    }

    console.log('User inserted into the database');
    client.close();
  });
});
