const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const crypto = require('crypto');


dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let refreshTokens = [];

function generateAccessJWT(username, role, data) {
  return jwt.sign(
    {
      username,
      role,
      data
    },
    process.env.TOKEN_SECRET,
    { expiresIn: '1800s' }
  );
}

function generateRefreshToken(username) {
  const refreshToken = crypto.randomBytes(64).toString('hex');
  refreshTokens.push({ refreshToken, username });
  return refreshToken;
}

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

app.post('/token', (req, res) => {
  const { username, password, role } = req.body;

  if (username && password && role) { 
    const accessToken = generateAccessJWT(username, role);
    const refreshToken = generateRefreshToken(username);
    res.json({ accessToken, refreshToken, role });
  } else {
    res.status(400).send('Username, password, and role are required');
  }
});

app.post('/token/auth', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.sendStatus(401);
  const storedToken = refreshTokens.find(token => token.refreshToken === refreshToken);

  if (!storedToken) return res.sendStatus(403);

  const user = storedToken.username;

  const newAccessToken = generateAccessJWT(user);
  res.json({ accessToken: newAccessToken });
});

app.get('/protected', authenticateToken, authorizedRoles('superuser', 'customer'), (req, res) => {
  res.send(`Hello, ${req.user.username}. You are authenticated and have access as ${req.user.role}!`);
});

app.get('/restaurant', authenticateToken, authorizedRoles('superuser', 'restaurant'), (req, res) => {
  res.send(`Hello, ${req.user.username}. You have restaurant access!`);
});

app.get('/delivery', authenticateToken, authorizedRoles('superuser', 'delivery'), (req, res) => {
  res.send(`Hello, ${req.user.username}. You have delivery access!`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
