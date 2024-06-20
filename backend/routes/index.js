const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const { generateAccessJWT, validateRefreshToken } = require('../tokenUtils/token.js'); 
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

  const user = storedToken.username;
  const role = storedToken.role;

  const newAccessToken = generateAccessJWT(user, role);
  res.json({ accessToken: newAccessToken });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
