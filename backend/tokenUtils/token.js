const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

let refreshTokens = [];

function generateAccessJWT(email, role) {
  return jwt.sign(
    { email, role },
    process.env.TOKEN_SECRET,
    { expiresIn: '1500s' }
  );
}

function generateRefreshToken(email) {
  const refreshToken = crypto.randomBytes(64).toString('hex');
  refreshTokens.push({ refreshToken, email });
  return refreshToken;
}

function validateRefreshToken(refreshToken) {
  return refreshTokens.find(token => token.refreshToken === refreshToken);
}

module.exports = {
  generateAccessJWT,
  generateRefreshToken,
  validateRefreshToken
};
