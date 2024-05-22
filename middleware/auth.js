// middleware/auth.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.cookies.jwt;
  if (token == null) return next(); // If no token, continue without setting user

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return next();
    res.locals.user = user; // Set the user in locals
    next();
  });
}

module.exports = authenticateToken;
