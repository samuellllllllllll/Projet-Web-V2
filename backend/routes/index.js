const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const { generateAccessJWT, validateRefreshToken } = require('../tokenUltils/token.js'); 
const loginRouter = require('../microservice login/login.js'); 

dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:5173'
}));

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function authorizedRoles(...allowedRoles) {
  return (req, res, next) => {
    const { role } = req.user;
    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).send('Access denied');
    }
    next();
  };
}

app.use('/api', loginRouter); // Use login router with prefix /api

app.post('/api/token/auth', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  const storedToken = validateRefreshToken(refreshToken);
  if (!storedToken) return res.sendStatus(403);

  const user = storedToken.username;
  const role = storedToken.role;

  const newAccessToken = generateAccessJWT(user, role);
  res.json({ accessToken: newAccessToken });
});

app.get('/api/auth/customer', authenticateToken, authorizedRoles('superuser', 'customer'), (req, res) => {
  res.send(`Hello, ${req.user.username}. You are authenticated and have access as ${req.user.role}!`);
});

app.get('/api/auth/restaurant', authenticateToken, authorizedRoles('superuser', 'restaurant'), (req, res) => {
  res.send(`Hello, ${req.user.username}. You have restaurant access!`);
});

app.get('/api/auth/delivery', authenticateToken, authorizedRoles('superuser', 'livreur'), (req, res) => {
  res.send(`Hello, ${req.user.username}. You have delivery access!`);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;