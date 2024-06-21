const express = require("express");
const { Client } = require('pg');
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
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

    if (req.body.params.role === 'consumer') {
        var role = 1;
    } else if (req.body.params.role === 'deliveryman') {
        var role = 2;
    } else if (req.body.params.role === 'restaurant') {
        var role = 3;
    }

    const password = bcrypt.hashSync(req.body.params.password, 10);
    const insert_test = 'INSERT INTO users(email, password, role, is_deleted) VALUES($1,$2,$3,$4)';
    const values_test = [req.body.params.email, password, role, req.body.params.is_deleted];
    
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