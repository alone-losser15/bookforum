
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
  name: { type: String, required: true },
  iconPath: { type: String},
  genreTagline: { type: String },
  url: { type: String }
});

const Genre = mongoose.model('genre', genreSchema);

module.exports = Genre;
