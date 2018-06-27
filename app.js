const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const CarFleetManager = require('./src/CarFleetManager');

const carFleetManager = new CarFleetManager();

app.post('/book', (req, res) => {
  const { latitude, longitude, color } = req.body;
  const trip = carFleetManager.bookCar(latitude, longitude, color);
  const data = { tripId: trip.id, carColor: trip.car.color };

  res.send(JSON.stringify(data));
});

app.post('/trips/:id/end', (req, res) => {
  const { id } = req.params;
  const { latitude, longitude } = req.body;
  const trip = carFleetManager.findTrip(id);
  trip.end(latitude, longitude);
  console.log("Total fare for the ride is: ", trip.fare);
  console.log("Total distance for the ride is: ", trip.distance);
  res.end();
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

module.exports = app;
