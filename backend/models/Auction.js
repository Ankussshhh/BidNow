const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  title: String,
  description: String,
  startingBid: Number,
  currentBid: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Auction', auctionSchema);
