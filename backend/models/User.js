const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // If you're using bcryptjs for password hashing

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  // Other fields like resetPasswordToken, etc.
});

// Hash the password before saving it to the database
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    this.password = await bcrypt.hash(this.password, 10); // Hash the password
    next();
  } catch (err) {
    next(err);
  }
});

// Compare the given password with the hashed password stored in the database
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password); // Compare the plain password with the hash
  } catch (err) {
    throw new Error('Error comparing passwords');
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
