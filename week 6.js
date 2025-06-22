const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://nismaira:Nisrina04@cluster0.nz80jgg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create one MongoClient instance globally
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function connectDB() {
  if (!client.isConnected) {
    await client.connect();
  }
  return client.db('ticket_booking');
}

// Registration Route
app.post('/register', async (req, res) => {
  try {
    const db = await connectDB();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      createdAt: new Date()
    };
    await db.collection('users').insertOne(user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  try {
    const db = await connectDB();
    const user = await db.collection('users').findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware for authentication
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Middleware for role-based authorization
const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};

// Admin route
app.get('/admin/users', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const db = await connectDB();
    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log(" Server running on port 3000"));