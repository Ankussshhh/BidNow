const User = require('../models/User'); // Import the User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Auction = require('../models/Auction'); // Auction model

// Static JWT Token for demonstration
const STATIC_TOKEN = 'ZXC1bnmap';  // This is the static token you provided

// Sign Up Function
exports.signUp = async (req, res) => {
  const { name, email, password } = req.body; // Include name in request

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

// Create a new auction
exports.createAuction = async (req, res) => {
  try {
    const { title, description, startingBid } = req.body;

    // Ensure the required fields are provided
    if (!title || !description || !startingBid) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new auction
    const auction = new Auction({
      title,
      description,
      startingBid,
      userId: req.user.id, // Assuming you're attaching user info via JWT token
    });

    await auction.save();

    res.status(201).json({
      message: 'Auction created successfully',
      auction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login Function
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }

    // Send userId and other details in the response
    res.status(200).json({
      userId: user._id,
      message: 'Login successful',
      token: STATIC_TOKEN, // Replace with a dynamically generated JWT in production
      name: user.name, // Include the user's name
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

// Forgot Password Function
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No account found with this email!' });
    }

    // Generate a reset token (use JWT for simplicity)
    const resetToken = jwt.sign({ userId: user._id }, 'ZXC1bnmap', { expiresIn: '1h' });

    // Send reset password link via email (using nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password',
      },
    });

    const resetLink = `http://localhost:4200/reset-password?token=${resetToken}`;

    const mailOptions = {
      to: email,
      subject: 'Password Reset Request',
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error sending email!' });
      }
      res.status(200).json({ message: 'Password reset link sent successfully' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

// Reset Password Function
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, 'ZXC1bnmap'); // Verify the reset token
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Invalid user!' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

exports.protected = (req, res) => {
  res.status(200).json({ message: 'This is a protected route.' });
};
