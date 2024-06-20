const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

let refreshTokens = [];

function generateAccessJWT(email, role) {
  return jwt.sign(
    { email, role },
    process.env.TOKEN_SECRET,
    { expiresIn: '3000s' } // 30 minutes
  );
}

function generateRefreshToken(email, id, role) {
  const refreshToken = crypto.randomBytes(64).toString('hex');
  refreshTokens.push({ refreshToken, email, id, role });
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
