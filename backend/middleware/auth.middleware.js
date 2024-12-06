const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'ZXC1bnmap';  // Ensure the secret is the same as in login

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header provided' });
  }

  const token = authHeader.replace('Bearer ', '');  // Extract token from the header
  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    console.log('Verifying token:', token);  // Log token for debugging
    const decoded = jwt.verify(token, JWT_SECRET);  // Verify the token with the secret
    req.user = decoded;  // Attach the decoded user info to the request
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);  // Log the error for debugging
    return res.status(403).json({ message: 'Invalid or malformed token' });
  }
};

module.exports = verifyToken;
