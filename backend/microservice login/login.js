const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { generateAccessJWT, generateRefreshToken } = require('../tokenUltils/token.js');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:5173'
}));

const database_postgres = new Client({
  host: process.env.POSTGRE_DB_HOST,
  port: process.env.POSTGRE_DB_PORT,
  user: process.env.POSTGRE_DB_USER,
  password: process.env.POSTGRE_DB_PASSWORD,
  database: process.env.POSTGRE_DB_DATABASE,
  ssl: false
});

database_postgres.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch(err => {
    console.error('Connection error', err.stack);
  });

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email & password are required' });
  }

  try {
    const query_sql = 'SELECT * FROM users WHERE email = $1';
    const values_sql = [email];

    database_postgres.query(query_sql, values_sql, async (err, result) => {
      if (err) {
        console.error('Error executing query', err);
        return res.status(500).json({ message: 'Error executing query' });
      }

      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = result.rows[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      try {
        const accessToken = generateAccessJWT(user.email, user.role);
        const refreshToken = generateRefreshToken(user.email);

        return res.json({ accessToken, refreshToken, role: user.role });
      } catch (error) {
        console.error('Error generating tokens', error);
        return res.status(500).json({ message: 'Server error' });
      }
    });
  } catch (error) {
    console.error('Error executing query', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Login service running at http://localhost:${port}/`);
});

module.exports = app;
