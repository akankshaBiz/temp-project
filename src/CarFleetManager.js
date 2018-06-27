const NUMBER_OF_CARS = 20;
const COLORS = ['pink', 'black'];

const Car = require('./Car');
const Trip = require('./Trip');

const getColor = () => (COLORS[Math.floor(Math.random() * COLORS.length)]);

const generateInitialCoordinates = () => {
    const sign = [-1, 1];
    const coordX = sign[Math.floor(Math.random() * sign.length)] * (Math.random() * 100);
    const coordY = sign[Math.floor(Math.random() * sign.length)] * (Math.random() * 100);
    return {x: coordX, y: coordY};
};

const findDistance = (xIndex1, yIndex1, xIndex2, yIndex2) => {
    const xDiff = (xIndex1 - xIndex2) ** 2;
    const yDiff = (yIndex1 - yIndex2) ** 2;
    return ((xDiff + yDiff) ** 0.5);
};

const getPriceDetails = (color) => {
    const priceObj = { perMinute: 1, perKilometer: 2, extraCost: 0 };
    if (color === 'pink') {
        priceObj.extraCost = 5;
    }
    return priceObj;
};

class CarFleetManager {
    constructor() {
        this.pool = [];
        this.trips = [];
        this._initialisePool();
        this.tripNumber = 0;
    }

    _initialisePool() {
        for (let i = 0; i < NUMBER_OF_CARS; i++) {
            const color = getColor();
            const coordinates = generateInitialCoordinates();
            const priceDetails = getPriceDetails(color);

            this.pool.push(
                new Car(i, color, coordinates, priceDetails)
            );
        }
    }

    _getCar(id) {
        return this.pool[id];
    }

    _findNearestCar(userCoordX, userCoordY, colorPreference) {
        let minDistance = 201;
        let carId;
        for (let i = 0, len = this.pool.length; i < len; i++){
            const car = this.pool[i];

            const { coordX, coordY } = car.getCoordinates();
            const distance = findDistance(userCoordX, userCoordY, coordX, coordY);

            if (distance < minDistance && car.isAvailable(colorPreference)) {
                minDistance = distance;
                carId = this.pool[i].id;
            }
        }
        return this._getCar(carId);
    }

    _addTrip(userCoordX, userCoordY, car) {
        const trip = new Trip(this.tripNumber, car);
        trip.start(userCoordX, userCoordY);
        this.trips.push(trip);
        this.tripNumber++;
        return trip;
    }

    findTrip(tripId) {
        return this.trips[tripId];
    }

    bookCar(userCoordX, userCoordY, colorPreference) {
        if (userCoordX < -100 && userCoordX > 100) return null;
        if (userCoordY < -100 && userCoordY > 100) return null;

        const car = this._findNearestCar(userCoordX, userCoordY, colorPreference);
        return this._addTrip(userCoordX, userCoordY, car);
    }
}
module.exports = CarFleetManager;