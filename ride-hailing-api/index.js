const express = require('express');
const app = express();
const port = 3000;

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Ride Hailing API');
});

// Book ride
app.get('/book', (req, res) => {
  res.send('Your ride has been booked!');
});

// Cancel ride
app.get('/cancel', (req, res) => {
  res.send('Your ride has been cancelled.');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});