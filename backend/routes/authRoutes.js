const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../models/User'); // Assuming you have a User model
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/auth.controller');
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

// Setup email transporter using your email service
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to other email services like SendGrid, Mailgun, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Forgot password route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate a password reset token (you can store it in the database or JWT)
    const resetToken = crypto.randomBytes(20).toString('hex'); // or use JWT for token generation
    const resetLink = `http://localhost:4200/reset-password?token=${resetToken}`;

    // Save the token in the user record (you may also store expiry date)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
    await user.save();

    // Send email with the reset link
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Please click the link below to reset your password:\n\n${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(200).json({ message: 'Password reset email sent' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Correctly linked route
router.post('/login', authController.login);
router.post('/signup', authController.signUp);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Protected Route (Requires Token)
router.get('/protected', verifyToken, authController.protected);



module.exports = router;
