const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

// Build the connection string from individual .env variables
const user = process.env.DB_USERNAME;
const pass = process.env.DB_PASSWORD;
const url = process.env.DB_URL;
const uri = `mongodb+srv://${user}:${pass}@${url}/`;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  // Now we use the 'uri' variable we just built above
  MongoClient.connect(uri)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};