const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
process.env.TOKEN_SECRET;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

function generateAccessJWT(username) {
  return jwt.sign({username}, process.env.TOKEN_SECRET, {expiresIn: '1800s'})
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/token', (req, res) => { 
  const { username, password } = req.body;

  console.log(username, password)
  if (username && password) {
    const token = generateAccessJWT(username);
    res.json({token});
    res.status(200).send(`Username: ${username}, Password: ${password}`);
} else {
    res.status(400).send('Username and Password are required');
}
});

app.get('/protected', authenticateToken, (req, res) => {
  res.send(`Hello, ${req.user.username}. You are authenticated!`);
});


app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;;
  res.send(`Username: ${username}, Password: ${password}`);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
