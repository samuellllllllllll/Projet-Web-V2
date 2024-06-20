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

//app post
app.post("/restaurants/menus/:name/:price/:starter/:main_dish/:dessert/:drink/:id_user", (req, res)=>{
    const insert_test = 'INSERT INTO menus(name, price, starter, main_dish, dessert, drink, id_user) VALUES($1,$2,$3,$4,$5,$6,$7)';
    const values_test = [req.params.name,req.params.price, req.params.starter, req.params.main_dish, req.params.dessert, req.params.drink, req.params.id_user];
    
    database_postgres.query(insert_test, values_test, (err, result) =>{
        if (err){
            console.error('Error inserting data', err);
            console.log("Careful this request is using parameters");
        }
        else {
            console.log("Great success !");
            res.send("success");
        }
    })
});

//app put
app.put("/restaurants/menus/modify/:name/:price/:starter/:main_dish/:dessert/:drink/:id", (req, res)=>{
    const query_sql = "UPDATE menus SET name = $1, price = $2, starter = $3, main_dish = $4, dessert = $5, drink = $6 WHERE id = $7";
    const values_sql = [req.params.name, req.params.price, req.params.starter, req.params.main_dish, req.params.dessert, req.params.drink, req.params.id];
    database_postgres.query(query_sql, values_sql, (err, result)=>{
        if (err) {
            console.error('Error executing the query', err);
            console.log("Careful this route is using params instead of query");
        }
        else {
            res.send("Succesfully modified");
        }
    })
});

app.delete("/restaurants/menus/:id", (req, res)=>{
    const query_sql = "DELETE FROM menus WHERE id = $1";
    const values_sql = [req.params.id];
    database_postgres.query(query_sql, values_sql, (err, result)=> {
        if (err) {
            console.error('Error executing the query ', err)
        } else {
            res.send("Succesfully deleted");

        }
    })
})