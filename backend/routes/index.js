
const express = require('express')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.post('/login', (req, res) => { 
  const { username, password } = req.body;

  console.log(username, password)
  if (username && password) {
    res.status(200).send(`Username: ${username}, Password: ${password}`);
} else {
    res.status(400).send('Username and Password are required');
}
});


const port = 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
