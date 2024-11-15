const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL; // MongoDB connection URL
const dbName = process.env.MONGO_DB_NAME; // Database name

let db;

const connectDB = async () => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

const getDb = () => db;

module.exports = { connectDB, getDb };
