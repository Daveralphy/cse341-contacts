const MongoClient = require('mongodb').MongoClient;
// Only require dotenv if we are NOT in production (Render)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const user = process.env.DB_USERNAME;
const pass = process.env.DB_PASSWORD;
const url = process.env.DB_URL;

const uri = `mongodb+srv://${user}:${pass}@${url}/`;

let _db;

const initDb = (callback) => {
  if (_db) return callback(null, _db);
  
  if (!user || !pass || !url) {
    return callback(new Error("Database credentials missing from process.env"));
  }

  MongoClient.connect(uri)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => callback(err));
};

const getDb = () => {
  if (!_db) throw Error('Db not initialized');
  return _db;
};

module.exports = { initDb, getDb };