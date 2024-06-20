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
    origin: process.env.CORS_ORIGIN
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
    res.send("Articles default route")
})

app.listen(4548, () => {
    console.log("Up and running articles");
})

// Get all articles
app.get("/articles", (req, res) => {
    database_postgres.query('SELECT * FROM articles', (err, result) => {
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
app.post("/articles", (req, res) => {

    const insert_test = 'INSERT INTO articles(category, name, price, availability, url_picture, user_id) VALUES($1,$2,$3,$4,$5,$6)';
    const values_test = [req.query.category, req.query.name, req.query.price, req.query.availability, req.query.url_picture, req.query.user_id];

    database_postgres.query(insert_test, values_test, (err, result) => {
        if (err) {
            console.error('Error inserting data', err);
            console.log("Careful this request is using query");
        }
        else {
            console.log("Great success !");
            res.send("success");
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


app.get("/articles/restaurants/menu/:category_food", (req, res) => {
    const query_sql = "SELECT * FROM articles WHERE category = $1";
    const values_sql = [req.params.category_food];
    database_postgres.query(query_sql, values_sql, (err, result) => {
        if (err) {
            console.error('Error executing the query');
            res.status(500).send('Error executing query');
        } else {
            res.json(result);
        }
    })
})

app.delete("/articles/restaurants/menu/:id", (req, res) => {
    const query_sql = "DELETE FROM articles WHERE id = $1";
    const values_sql = [req.params.id];
    database_postgres.query(query_sql, values_sql, (err, result) => {
        if (err) {
            console.error('Error executing the query ', err)
        } else {
            res.send("Succesfully deleted");

        }
    })
})

app.put("/articles/restaurants/menu/modify", (req, res) => {
    //const decodedUrl = encodeURIComponent(req.params.url);
    const query_sql = "UPDATE articles SET name = $1, price = $2,category = $3, url_picture = $4 WHERE id = $5";
    const values_sql = [req.body.params.name, req.body.params.price, req.body.params.category, req.body.params.url_picture, req.body.params.id];
    database_postgres.query(query_sql, values_sql, (err, result) => {
        if (err) {
            console.error('Error executing the query', err);
            console.log("Careful this route is using query instead of params");
        }
        else {
            res.send("Succesfully modified");
        }
    })
})