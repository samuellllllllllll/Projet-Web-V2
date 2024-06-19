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

app.listen(4546, () => {
    console.log("Up and running restaurants");
});

// role : 1 => consommateur 2 => restaurant 3 => livreur 

// Get all restaurants with a specific type
app.get("/restaurants", (req, res) => {

    const query_sql = "SELECT * FROM users WHERE role = 2 and type = $1;";
    const values_sql = [req.query.type];

    database_postgres.query(query_sql, values_sql, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error executing query');
        } else {
            res.send(result.rows);
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

// Get the adress of a restaurant
app.get("/restaurants/address", (req, res) => {

    const query_sql = "SELECT * FROM users WHERE id = $1;";
    const values_sql = [req.query.restaurant_id];

    database_postgres.query(query_sql, values_sql, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error executing query');
        } else {
            console.log(result.rows);
            res.send(result.rows);
        }
    });
});