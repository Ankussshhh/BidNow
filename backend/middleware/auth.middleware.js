const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ZXC1bnmap';  // Ensure this is the same secret as used for signing the token

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
console.log('Authorization Header:', req.headers['authorization']);
console.log('Extracted Token:', token); // Get token from Authorization header.

  if (!token) {
    return res.status(403).json({ error: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);    // Verify the token.
    req.user = decoded; // Attach user info to the request object.
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = verifyToken;
