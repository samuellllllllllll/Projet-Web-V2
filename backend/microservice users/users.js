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
    res.send("Users default route")
})

app.get("/users", (req, res) => {
    database_postgres.query('SELECT * FROM users', (err, result)=>{
        if (err) {
            console.error('Error executing query', err);
        }
        else {
            console.log('Query result :', result.rows);
        }
        res.send(result.rows);
    });
})



app.post("/users", (req, res)=>{
    const insert_test = 'INSERT INTO users(email, password, role, is_deleted) VALUES($1,$2,$3,$4)';
    const values_test = [req.body.email, req.body.password, req.body.role, req.body.is_deleted];
    
    database_postgres.query(insert_test, values_test, (err, result) =>{
        if (err){
            console.error('Error inserting data', err);
        }
        else {
            res.send("Inserted User")
        }
        
    })
})

app.listen(4547, ()=>{
    console.log("Up and running users");
})