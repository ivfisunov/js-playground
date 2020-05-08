const express = require('express');
const bodyParser = require('body-parser');
const { LocalStorage } = require('node-localstorage');
const cors = require('cors');

const PORT = 3002;

const db = new LocalStorage('./y-axis/database');
let cars = JSON.parse(db.getItem('cars.json') || false);
if (!cars) {
  db.setItem('cars.json', JSON.stringify({ "cars": [{ "car": "Testla", "model": "Model T" }]} ));
  cars = JSON.parse(db.getItem('cars.json'));
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/admin', (req, res) => {
  res.json(cars);
});

app.get('/admin/add', (req, res) => {
  const car = req.param('car');
  const model = req.param('model');
  const newCar = {
    car,
    model
  };
  cars.cars.push(newCar)
  db.setItem('cars.json', JSON.stringify(cars));
  res.send('New car added.');
});

app.listen(PORT, () => {
  console.log('Admin server is listening on port ', PORT);
});