class Car {
    constructor(id, color, coordinates, priceDetails) {
        this.id = id;
        this.priceDetails = priceDetails;
        this.color = color;
        this.currentX = coordinates.x;
        this.currentY = coordinates.y;
        this.allocated = false;
    }

    assign() {
        this.allocated = true;
    }

    deAllocate() {
        this.allocated = false;
    }

    getPerMinutePrice() {
        return this.priceDetails.perMinute;
    }

    getPerKilometerPrice() {
        return this.priceDetails.perKilometer;
    }

    getExtraCost() {
        return this.priceDetails.extraCost;
    }

    setCoordinates(coordX, coordY) {
        this.currentX = coordX;
        this.currentY = coordY;
    }

    getCoordinates() {
        return {coordX: this.currentX, coordY: this.currentY};
    }

    isAvailable(color) {
        return (this.color === color && !this.allocated);
    }
}

module.exports = Car;