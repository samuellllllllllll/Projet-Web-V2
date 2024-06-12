const express = require("express");
const { Client } = require('pg');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const database_postgres = new Client({user: 'user',password: 'mysecretpassword',host: '0.0.0.0',port: '8001',database: 'CESIEats',});

database_postgres.connect()
.then(() => {
    console.log('Connected to PostgreSQL database');
});

app.get("/", (req,res)=>{
    res.send("Articles default route")
})

app.listen(3001, ()=>{
    console.log("Up and running articles");
})

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

app.post("/articles", (req, res)=>{
    console.log(req.body)
    res.send("Aladeen articles")

    const insert_test = 'INSERT INTO articles(category, name, description, price, availability, restaurants_id) VALUES($1,$2,$3,$4,$5,$6)';
    const values_test = [req.body.category, req.body.name, req.body.description, req.body.price, req.body.availability, req.body.restaurants_id];
    
    database_postgres.query(insert_test, values_test, (err, result) =>{
        if (err){
            console.error('Error inserting data', err);
        }
        else {
            console.log("Great success !");
        }
        
    })
})
