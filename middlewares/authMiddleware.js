const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login');
  
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.redirect('/login');
    req.user = decoded;
    next();
  });
};

exports.checkEmployeeOrAdmin = (req, res, next) => {
  if (req.user && (req.user.accountType === 'Employee' || req.user.accountType === 'Admin')) {
    next();
  } else {
    res.redirect('/login');
  }
};
