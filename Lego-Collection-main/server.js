const legoData = require("./modules/legoSets");
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public')); // set static folder

const HTTP_PORT = process.env.PORT || 8080; // set port

// get "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/home.html'));
});

// get "/about"
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});

// get "/lego/sets" to return all sets
app.get('/lego/sets', (req, res) => {
  const theme = req.query.theme;

  if (theme) {
    legoData.getSetsByTheme(theme).then((data) => {
      res.json(data);
    }).catch((err) => {
      res.status(404).send(`404 - ${err}`)
    });
  } else {
    legoData.getAllSets().then((data) => {
      res.json(data);
    }).catch((err) => {
      res.status(404).send(`404 - ${err}`)
    });
  }
});

// get "/lego/sets/:id" to return a set by setNum
app.get('/lego/sets/:id', (req, res) => {
  const setNum = req.params.id;

  legoData.getSetByNum(setNum).
