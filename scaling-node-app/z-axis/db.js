const { LocalStorage } = require('node-localstorage');

const db1 = new LocalStorage('data-a-m');
const db2 = new LocalStorage('data-n-z');

const whichDb = (name) => name.match(/^[A-M]|^[a-m]/) ? db1 : db2;

const loadCities = db => JSON.parse(db.getItem('cities') || '[]');

const hasCity = name => loadCities(whichDb(name)).map(city => city.name).includes(name);

module.exports = {
    addCity(city) {
        if (!hasCity(city.name)) {
            const db = whichDb(city.name);
            let cities = loadCities(db);
            cities.push(city);
            db.setItem('cities', JSON.stringify(cities));
        }
    },

    findCityByName(name) {
        const db = whichDb(name);
        let cities = loadCities(db);
        return cities.filter(city => city.name === name);
    },

    findCityByPopulationMoreThan(population) {
        let citiesDb1 = loadCities(db1).filter(city => city.population >= population);
        let citiesDb2 = loadCities(db2).filter(city => city.population >= population);

        return [...citiesDb1, ...citiesDb2];
    }
}
