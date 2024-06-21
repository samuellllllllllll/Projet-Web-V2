const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

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

app.get("/", (req, res) => {
  res.send("Users default route")
});

app.get("/users", (req, res) => {
  database_postgres.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
    } else {
    }
    res.send(result.rows);
  });
});

app.post("/users", async (req, res) => {
  try {

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const insertQuery = 'INSERT INTO users(email, password, role, is_deleted) VALUES($1,$2,$3,$4)';
    const values = [req.body.email, hashedPassword, req.body.role, req.body.is_deleted];

    database_postgres.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error('Error inserting data', err);
        res.status(500).json({ message: 'Error inserting data' });
      } else {
        res.send("Inserted User");
      }
    });
  } catch (error) {
    console.error('Error hashing password', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const port = process.env.PORT || 4547;
app.listen(port, () => {
  console.log(`Up and running users service on port ${port}`);
});

module.exports = app;
