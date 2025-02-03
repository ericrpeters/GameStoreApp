const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  seller: { type: String, required: true },
  sold: { type: Boolean, default: false }, 
  image:{ type: String, required: true}
});

module.exports = mongoose.model('Game', gameSchema);
