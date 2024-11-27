const express = require('express');
const router = express.Router();
const Auction = require('../models/Auction'); // Import the Auction model

// POST /api/auctions - Create a new auction
router.post('/', async (req, res) => {
  try {
    const { title, description, startingBid, currentBid, imageUrl } = req.body;

    // Validate required fields
    if (!title || !description || !startingBid) {
      return res.status(400).json({ message: 'Title, description, and starting bid are required.' });
    }    

    // Create a new Auction instance
    const newAuction = new Auction({
      title,
      description,
      startingBid,
      currentBid: currentBid || startingBid, // Default to starting bid if currentBid is not provided
      imageUrl,
    });

    // Save the auction to the database
    const auction = await newAuction.save();
    res.status(201).json({
      message: 'Auction created successfully',
      auction,
    });
  } catch (err) {
    console.error('Error creating auction:', err);
    res.status(500).json({
      message: 'Error creating auction',
      error: err.message || err,
    });
  }
});

// GET /api/auctions - Fetch all auctions
router.get('/', async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.status(200).json(auctions);
  } catch (err) {
    console.error('Error fetching auctions:', err);
    res.status(500).json({
      message: 'Error fetching auctions',
      error: err.message || err,
    });
  }
});

// GET /api/auctions/:id - Fetch a single auction by ID
router.get('/:id', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
    res.status(200).json(auction);
  } catch (err) {
    console.error('Error fetching auction:', err);
    res.status(500).json({
      message: 'Error fetching auction',
      error: err.message || err,
    });
  }
});

// DELETE /api/auctions/:id - Delete an auction by ID
router.delete('/:id', async (req, res) => {
  try {
    const auction = await Auction.findByIdAndDelete(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }
    res.status(200).json({ message: 'Auction deleted successfully', auction });
  } catch (err) {
    console.error('Error deleting auction:', err);
    res.status(500).json({
      message: 'Error deleting auction',
      error: err.message || err,
    });
  }
});

// PUT /api/auctions/:id - Update an auction by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, description, startingBid, currentBid, imageUrl } = req.body;

    // Find the auction and update it
    const auction = await Auction.findByIdAndUpdate(
      req.params.id,
      { title, description, startingBid, currentBid, imageUrl },
      { new: true, runValidators: true }
    );

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    res.status(200).json({ message: 'Auction updated successfully', auction });
  } catch (err) {
    console.error('Error updating auction:', err);
    res.status(500).json({
      message: 'Error updating auction',
      error: err.message || err,
    });
  }
});

module.exports = router;
