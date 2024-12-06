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


// GET /api/auctions/user/:userId - Fetch all auctions posted by a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    // Fetch auctions by userId
    const auctions = await Auction.find({ userId });

    if (!auctions.length) {
      return res.status(404).json({ message: 'No auctions found for this user.' });
    }

    res.status(200).json(auctions);
  } catch (err) {
    console.error('Error fetching auctions by user:', err.message || err);
    res.status(500).json({ message: 'Error fetching auctions.' });
  }
});


// DELETE route for auction deletion
router.delete('/auctions/:id', async (req, res) => {
  const auctionId = req.params.id;

  try {
    // Log the auctionId to ensure it's being passed correctly
    console.log('Deleting auction with ID:', auctionId);

    // Find and delete the auction by ID
    const auction = await Auction.findByIdAndDelete(auctionId);

    if (!auction) {
      // If the auction is not found, log this and send a 404 response
      console.error('Auction not found with ID:', auctionId);
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Successfully deleted the auction
    console.log('Auction deleted successfully:', auction);
    res.status(200).json({ message: 'Auction deleted successfully' });
  } catch (err) {
    // Log the error and send a 500 response
    console.error('Error deleting auction:', err);
    res.status(500).json({ message: 'Internal Server Error' });
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
