const { Client } = require('pg');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

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
    hashPasswords();
  })
  .catch(err => {
    console.error('Connection error', err.stack);
  });

async function hashPasswords() {
  try {
    const query = 'SELECT id, password FROM users';
    const result = await database_postgres.query(query);

    for (const user of result.rows) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const updateQuery = 'UPDATE users SET password = $1 WHERE id = $2';
      await database_postgres.query(updateQuery, [hashedPassword, user.id]);
    }

    console.log('Passwords hashed successfully');
  } catch (error) {
    console.error('Error hashing passwords', error);
  } finally {
    database_postgres.end();
  }
}
