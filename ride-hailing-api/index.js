const express = require('express');
const app = express();
const port = 3000;

// Route for /
app.get('/', (req, res) => {
  res.send('Welcome to Ride Hailing API');
});

// Route for /book
app.get('/book', (req, res) => {
  res.send('Your ride has been booked!');
});

// Route for /cancel
app.get('/cancel', (req, res) => {
  res.send('Your ride has been cancelled.');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
