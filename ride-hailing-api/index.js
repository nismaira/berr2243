const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON data
app.use(express.json());

// In-memory data storage for rides
let rides = [];

// --------------------
// ROOT ROUTE
// --------------------
app.get('/', (req, res) => {
  res.send('Welcome to Ride Hailing API');
});

// --------------------
// RIDE ENDPOINTS
// --------------------

// ✅ POST /rides – Create a New Ride
app.post('/rides', (req, res) => {
  const ride = {
    id: Date.now().toString(), // Unique ride ID
    driver: req.body.driver,
    passenger: req.body.passenger,
    pickup: req.body.pickup,
    destination: req.body.destination,
    status: 'pending' // Default ride status
  };
  rides.push(ride);
  res.status(201).json(ride);
});

// ✅ GET /rides – Fetch All Rides
app.get('/rides', (req, res) => {
  res.json(rides);
});

// ✅ PATCH /rides/:id – Update Ride Status
app.patch('/rides/:id', (req, res) => {
  const ride = rides.find(r => r.id === req.params.id);
  if (!ride) {
    return res.status(404).json({ message: 'Ride not found' });
  }

  // Only update the "status" field (e.g., "completed", "cancelled")
  if (req.body.status) {
    ride.status = req.body.status;
  }

  res.json({ updated: true, ride });
});

// ✅ DELETE /rides/:id – Cancel a Ride
app.delete('/rides/:id', (req, res) => {
  const index = rides.findIndex(r => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Ride not found' });
  }

  rides.splice(index, 1);
  res.json({ deleted: true });
});

// --------------------
// START THE SERVER
// --------------------
app.listen(port, () => {
  console.log(`🚗 Ride Hailing API is running at http://localhost:${port}`);
});


