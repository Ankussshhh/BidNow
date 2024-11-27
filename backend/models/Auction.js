const mongoose = require('mongoose');

// Define Auction Schema
const auctionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startingBid: {
    type: Number,
    required: true,
  },
  currentBid: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,  // Add imageUrl as a string to store the URL of the image
    required: false, // This can be optional if you want, or you can make it required
  },
});

// Create Auction model
const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;
