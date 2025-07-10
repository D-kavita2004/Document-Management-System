// Middleware function to check if the user has the required role(s)
const checkAuthorisation = (requiredRoles) => (req, res, next) => {
  if (req.user && requiredRoles.includes(req.user.role)) {
    return next();
  } else {
    return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
  }
};
export default checkAuthorisation;