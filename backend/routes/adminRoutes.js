const express = require('express');
const { isAdmin, verifyToken } = require('../middleware/auth.middleware');
const Auction = require('../models/Auction');
const User = require('../models/User');
const router = express.Router();

router.get('/users', verifyToken, isAdmin, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

router.get('/auctions', verifyToken, isAdmin, async (req, res) => {
    try {
        const auctions = await Auction.find({});
        res.status(200).json(auctions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching auctions' });
    }
});

router.delete('/users/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user.', error: error.message });
    }
});

router.delete('/auctions/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const auctionId = req.params.id;
        const auction = await Auction.findByIdAndDelete(auctionId);

        if (!auction) {
            return res.status(404).json({ message: 'Auction not found.' });
        }

        res.status(200).json({ message: 'Auction deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete auction.', error: error.message });
    }
});

router.put('/auctions/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const auctionId = req.params.id;
        const updatedData = req.body;

        const auction = await Auction.findByIdAndUpdate(auctionId, updatedData, { new: true });

        if (!auction) {
            return res.status(404).json({ message: 'Auction not found.' });
        }

        res.status(200).json({ message: 'Auction updated successfully.', auction });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update auction.', error: error.message });
    }
});


module.exports = router;