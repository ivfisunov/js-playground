const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const getCars = () =>
  fetch('http://localhost:3001')
    .then(res => res.json());

const getCarsAdmin = () => {
  return fetch('http://localhost:3002/admin')
    .then(res => res.json());
};

const addNewCar = (car, model) => {
  const url = `http://localhost:3002/admin/add?car=${car}&model=${model}`;
  return fetch(url)
    .then(res => res.text());
}

app.get('/', async (req, res) => {
  console.log('client \turl: /');
  const cars = await getCars();
  res.json(cars);
});

app.get('/admin', async (req, res) => {
  console.log('admin \turl: /admin');
  const cars = await getCarsAdmin();
  res.json(cars);
});

app.get('/admin/add', async (req, res) => {
  const car = req.param('car');
  const model = req.param('model');
  const result = await addNewCar(car, model);
  console.log('admin \turl: /admin/add -', result);
  res.send(result);
})

app.listen(3000, () => {
  console.log('Main Api server is listening on port', PORT);
});