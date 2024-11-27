const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// User model
const User = mongoose.model('User', userSchema);

module.exports = User;