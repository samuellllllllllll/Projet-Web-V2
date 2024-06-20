const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const { generateAccessJWT, generateRefreshToken, validateRefreshToken } = require('../tokenUtils/token.js'); 
const loginRouter = require('../microservice login/login.js'); 

dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use('/api', loginRouter);

app.post('/api/token/auth', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  const storedToken = validateRefreshToken(refreshToken);
  if (!storedToken) return res.sendStatus(403);

  const email = storedToken.email;
  const role = storedToken.role;
  const id = storedToken.id;

  const newAccessToken = generateAccessJWT(email, role);
  const newRefreshToken = generateRefreshToken(email, id, role);

  // Remove the old refresh token and store the new one
  refreshTokens = refreshTokens.filter(token => token.refreshToken !== refreshToken);
  refreshTokens.push({ refreshToken: newRefreshToken, email, id, role });

  res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken, id, role });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
