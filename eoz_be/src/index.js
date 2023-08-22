const path = require('path');
const express = require('express');
var morgan = require('morgan');
const app = express();
const port = 3000;
const db = require('./config/db/index.js');
const route = require('./routes/index.js');
const jwt = require('jsonwebtoken');

db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
  next();
});

route(app);

app.listen(port, () => {
  console.log(`Host:  http://localhost:${port}`);
})