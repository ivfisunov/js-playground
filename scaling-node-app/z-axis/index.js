const db = require('./db');

db.addCity({name: 'Moscow', population: 12});
db.addCity({name: 'Rome', population: 5});
db.addCity({name: 'Berlin', population: 7});
db.addCity({name: 'New York', population: 20});
db.addCity({name: 'Seattle', population: 1});
db.addCity({name: 'Tokyo', population: 10});
db.addCity({name: 'Paris', population: 8});
db.addCity({name: 'Vatican', population: 0.1});

const city = db.findCityByName('Moscow');
const citiesPop = db.findCityByPopulationMoreThan(8);

console.log(city);
console.log(citiesPop);

