const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
console.log("Server starting....")

const app = express();
app.use(express.json());
app.use(cors());

const MongoClient = mongodb.MongoClient;
const uri = process.env.MONGODB_URI;

let db;

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    db = client.db('ticket_booking');
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error(err));

app.listen(3000, () => console.log('Server running on port 3000'));
