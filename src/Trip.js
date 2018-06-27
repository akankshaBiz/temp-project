class Trip {
    constructor(id, car) {
        this.id = id;
        this.car = car;
        this.startTime = new Date();
        this.endTime = new Date();
        this.startCoordinates = {x: 0, y: 0};
        this.endCoordinates = {x: 0, y: 0};
        this.distance = 0;
        this.fare = 0;
    }

    _updateStartCoordinates(coordX, coordY) {
        this.startCoordinates.x = coordX;
        this.startCoordinates.y = coordY;
    }

    _updateEndCoordinates(coordX, coordY) {
        this.endCoordinates.x = coordX;
        this.endCoordinates.y = coordY;
    }

    _getTotalDistance() {
        const xDiff = (this.startCoordinates.x - this.endCoordinates.x) ** 2;
        const yDiff = (this.startCoordinates.y - this.endCoordinates.y) ** 2;
        return ((xDiff + yDiff) ** 0.5);
    }

    _getTotalFareForDistance() {
        const distance = this._getTotalDistance();
        return (this.car.getPerKilometerPrice() * distance);
    }

    _getTotalFareForDuration() {
        const duration = this.endTime.getMinutes() - this.startTime.getMinutes();
        return (this.car.getPerMinutePrice() * duration);
    }

    _getTotalFare() {
        return (this._getTotalFareForDistance() + this._getTotalFareForDuration() + this.car.getExtraCost());
    }

    _updateCarDetails(userCoordX, userCoordY) {
        this.car.setCoordinates(userCoordX, userCoordY);
        this.car.deAllocate();
    }

    _updateTripFareAndDistance(userCoordX, userCoordY) {
        this._updateEndCoordinates(userCoordX, userCoordY);
        this.fare = this._getTotalFare();
        this.distance = this._getTotalDistance();
    }

    start(userCoordX, userCoordY) {
        this.startTime = new Date();
        this._updateStartCoordinates(userCoordX, userCoordY);
        this.car.assign();
    }

    end(userCoordX, userCoordY) {
        this.endTime = new Date();
        this._updateCarDetails(userCoordX, userCoordY);
        this._updateTripFareAndDistance(userCoordX, userCoordY);
    }
}

module.exports = Trip;