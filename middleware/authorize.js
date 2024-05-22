// middleware/authorize.js
function authorizeRoles(...roles) {
    return (req, res, next) => {
      if (!res.locals.user || !roles.includes(res.locals.user.role)) {
        return res.status(403).render('login', { message: 'Access denied' });
      }
      next();
    };
  }
  
  module.exports = authorizeRoles;
  