const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const { role } = req.user;
    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).send('Access denied');
    }
    next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRoles
};
