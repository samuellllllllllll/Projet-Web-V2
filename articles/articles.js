const express = require("express");
const { Client } = require('pg');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
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

app.get("/", (req,res)=>{
    res.send("Articles default route")
})

app.listen(4548, ()=>{
    console.log("Up and running articles");
})

// Get all articles
app.get("/articles", (req, res) => {
    database_postgres.query('SELECT * FROM articles', (err, result)=>{
        if (err) {
            console.error('Error executing query', err);
        }
        else {
            console.log('Query result :', result.rows);
        }
        res.send(result.rows);
    });
})

// Add an article
app.post("/articles", (req, res)=>{

    const insert_test = 'INSERT INTO articles(category, name, price, availability, url_picture, user_id) VALUES($1,$2,$3,$4,$5,$6)';
    const values_test = [req.query.category, req.query.name, req.query.price, req.query.availability, req.query.url_picture, req.query.user_id];
    
    database_postgres.query(insert_test, values_test, (err, result) =>{
        if (err){
            console.error('Error inserting data', err);
        }
        else {
            console.log("Great success !");
        }
    })
})

// Get all articles from a specific restaurant
app.get("/articles/restaurant", (req, res) => {
    const query_sql = "SELECT * FROM articles WHERE user_id = $1;";
    const values_sql = [req.query.user_id];

    database_postgres.query(query_sql, values_sql, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error executing query');
        } else {
            res.send(result.rows);
        }
    });
});