const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router;

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username && password) {
        res.status(200).send(`Username: ${username}, Password: ${password}`);
    } else {
        res.status(400).send('Username and Password are required');
    }
});

module.exports = router;
