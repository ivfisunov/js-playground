const express = require('express');
const bodyParser = require('body-parser');
const { LocalStorage } = require('node-localstorage');
const cors = require('cors');

const db = new LocalStorage('./y-axis/database');

const PORT = 3001;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('Client has came...');
  const cars = JSON.parse(db.getItem('cars.json'));
  res.json(cars);
});

app.listen(PORT, () => {
  console.log('Client server is listening on port ', PORT);
});

