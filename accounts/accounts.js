const express = require("express");
const { Client } = require('pg');
const app = express();
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(bodyParser.json());

// Configure the PostgreSQL client
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
    res.send("Restaurants default route");
});

app.listen(4549, () => {
    console.log("Up and running restaurants");
});

// Get account informations for consumers
app.get("/account/consumer", (req, res) => {

    const query_sql = "SELECT * FROM users WHERE id = $1;";
    const values_sql = [req.query.id];

    database_postgres.query(query_sql, values_sql, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error executing query');
        } else {
            res.send(result.rows[0]);
        }
    });
});

// Update account informations for consumers
app.put("/account/consumer/update", (req, res) => {
    const query_sql = "UPDATE users SET phone = $1, email = $2, city = $3, postal_code = $4, street = $5, number = $6, country = $7 WHERE id = $8;";
    const values_sql = [req.body.params.phone, req.body.params.email, req.body.params.address_city, req.body.params.address_postal_code, req.body.params.address_street, req.body.params.address_number, req.body.params.adresse_country, req.body.params.id];

    database_postgres.query(query_sql, values_sql, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error executing query');
        } else {
            res.send("Account updated");
        }
    });
});

// Delete account for consumers
app.put("/account/consumer/delete", (req, res) => {
    const query_sql = "UPDATE users SET is_deleted = TRUE WHERE id = $1;";
    const values_sql = [req.body.params.id];

    database_postgres.query(query_sql, values_sql, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error executing query');
        } else {
            res.send("Account deleted");
        }
    });
});


// Get all the Menu of a restaurant
app.get("/restaurants/menus", (req, res) => {

    const query_sql = "SELECT * FROM menus WHERE id_user = $1;";
    const values_sql = [req.query.id_user];

    database_postgres.query(query_sql, values_sql, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error executing query');
        } else {
            res.send(result.rows);
        }
    });
});