const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  profilePicURL: {
    type: String,
    default: "/profile_pics/blank-profile-picture.png"
  },
  reviewedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  likedReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  likedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }], // New field for liked books
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
