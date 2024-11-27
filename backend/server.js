const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const auctionRoutes = require('./routes/auctionRoutes'); // Import auction routes
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(cors({
  origin: 'http://localhost:4200', // Frontend URL
  credentials: true // Allow cookies
})); // Enable CORS for cross-origin requests

// Middleware for JSON body parsing
app.use(express.json());

// Routes
app.use('/api/auctions', auctionRoutes); // Auction routes
app.use('/api/auth', authRoutes);

// MongoDB Connection
const DB_URI = process.env.DB_URI || 'mongodb+srv://ankushpatil2002:OlWvXYkbl4B7lk7u@cluster0.wr4w4.mongodb.net/AuctionDB?retryWrites=true&w=majority';
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
