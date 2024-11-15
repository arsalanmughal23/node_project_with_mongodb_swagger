const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json()); // To parse incoming JSON data

const BASE_URL = process.env.BASE_URL || 'http://localhost';
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

let db;

// Connect to MongoDB
MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db();
  })
  .catch(error => console.error('Failed to connect to MongoDB', error));

// Create a simple route
app.get('/', (req, res) => {
  res.send('Hello from Node.js and MongoDB!');
});

// Route to get data from a MongoDB collection
app.get('/data', (req, res) => {
  const collection = db.collection('myCollection');
  collection.find({}).toArray()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: 'Failed to fetch data' }));
});

// Route to add data to MongoDB
app.post('/data', (req, res) => {
  const newData = req.body;
  const collection = db.collection('myCollection');
  collection.insertOne(newData)
    .then(result => res.status(201).json(result.ops[0]))
    .catch(err => res.status(500).json({ error: 'Failed to insert data' }));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on ${BASE_URL}:${PORT}`);
});
