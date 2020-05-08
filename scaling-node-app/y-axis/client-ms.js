const express = require('express');
const { LocalStorage } = require('node-localstorage');

const db = new LocalStorage('./y-axis/database');

const app = express();

const PORT = 3001;

app.get('/', (req, res) => {
  const cars = JSON.parse(db.getItem('cars.json'));
  res.json(cars);
});

app.listen(PORT, () => {
  console.log('Client server is listening on port ', PORT);
});

