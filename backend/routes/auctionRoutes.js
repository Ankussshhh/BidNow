const express = require('express');
const router = express.Router();
const Auction = require('../models/Auction'); // Import the Auction model
const verifyToken = require('../middleware/auth.middleware'); // Token verification middleware

// POST /api/auctions/create - Create a new auction
router.post('/create', async (req, res) => {
  console.log('Incoming request body:', req.body); // Debugging log

  try {
    const { title, description, startingBid, currentBid, imageUrl, userId } = req.body;

    // Validation for required fields
    if (!title || !description || startingBid === undefined || !imageUrl || !userId) {
      console.error('Validation failed:', { title, description, startingBid, imageUrl, userId });
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a new auction
    const newAuction = new Auction({
      title,
      description,
      startingBid,
      currentBid: currentBid || startingBid, // Set currentBid to startingBid if not provided
      imageUrl,
      userId,
    });

    // Save the auction to MongoDB
    await newAuction.save();

    // Respond with the created auction
    res.status(201).json(newAuction);
  } catch (error) {
    console.error('Error creating auction:', error.message || error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/auctions - Fetch all auctions
router.get('/', async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.status(200).json(auctions);
  } catch (err) {
    console.error('Error fetching auctions:', err.message || err);
    res.status(500).json({ message: 'Error fetching auctions' });
  }
});

// GET /api/auctions/:id - Fetch a single auction by ID
router.get('/:id', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found.' });
    }
    res.status(200).json(auction);
  } catch (err) {
    console.error('Error fetching auction:', err.message || err);
    res.status(500).json({ message: 'Error fetching auction.' });
  }
});

// DELETE /api/auctions/:id - Delete an auction by ID (with ownership check)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found.' });
    }

    // Check if the logged-in user is the owner
    if (auction.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this auction.' });
    }

    // Delete the auction
    await auction.remove();
    res.status(200).json({ message: 'Auction deleted successfully.' });
  } catch (err) {
    console.error('Error deleting auction:', err.message || err);
    res.status(500).json({ message: 'Error deleting auction.' });
  }
});

// PUT /api/auctions/:id - Update an auction by ID (with ownership check)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { title, description, startingBid, currentBid, imageUrl } = req.body;

    // Find the auction
    const auction = await Auction.findById(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found.' });
    }

    // Check if the logged-in user is the owner
    if (auction.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to update this auction.' });
    }

    // Update auction details
    auction.title = title || auction.title;
    auction.description = description || auction.description;
    auction.startingBid = startingBid || auction.startingBid;
    auction.currentBid = currentBid || auction.currentBid;
    auction.imageUrl = imageUrl || auction.imageUrl;

    // Save the updated auction
    await auction.save();

    res.status(200).json({ message: 'Auction updated successfully.', auction });
  } catch (err) {
    console.error('Error updating auction:', err.message || err);
    res.status(500).json({ message: 'Error updating auction.' });
  }
});

module.exports = router;
