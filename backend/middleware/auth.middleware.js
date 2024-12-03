const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ZXC1bnmap';  // Ensure this is the same secret as used for signing the token

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');  // Expect token in the Authorization header (Bearer token)

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided!' });
  }

  try {
    // Remove the "Bearer " prefix and verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data (payload) to the request object
    next(); // Pass control to the next middleware/route handler
  } catch (err) {
    return res.status(400).json({ message: 'Invalid or expired token!' });
  }
};

module.exports = verifyToken;
