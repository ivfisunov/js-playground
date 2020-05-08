const express = require('express');
const axios = require('axios').default;
const fetch = require('node-fetch');
const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  fetch('localhost:3001')
    .then(response => {
      console.log(response.json())
    });

  // axios.get('localhost:3001')
  //   .then(response => {
  //     // res.json(response);
  //     console.log(response.json());
  //   });
  console.log('HI');
});

app.listen(3000, () => {
  console.log('Main Api server is listening on port', PORT);
});